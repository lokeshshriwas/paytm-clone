import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import z from "zod";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config/config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const isFormFilled = Object.values(formData).every(
    (val) => val.trim() !== ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    const safeData = result.data;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/signin`,
        safeData
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
      <div className="mx-4 w-full h-fit sm:mx-0 sm:w-1/2 md:w-1/4 flex flex-col items-center justify-center bg-white p-4 rounded-lg">
        <div className="mb-6 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-center text-md text-gray-600 mt-2 mx-4">
            Enter your information to Sign in
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-2"
        >
          <InputField
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange("email")}
            label="Email"
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange("password")}
            label="Password"
            required
          />

          <Button
            type="submit"
            label="Sign In"
            disabled={!isFormFilled}
            className={
              !isFormFilled ? "bg-gray-400 opacity-50 cursor-not-allowed" : ""
            }
          />
        </form>
        <div className="mt-2 text-gray-700">
          Don't have an account{" "}
          <Link to="/signup" className="text-black underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;

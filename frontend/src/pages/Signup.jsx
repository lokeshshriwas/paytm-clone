import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import z from "zod";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.js";
import axios from "axios";

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-zA-Z\s'-]+$/, "First name must contain only letters"),
  lastName: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-zA-Z\s'-]+$/, "Last name must contain only letters"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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
        `${BASE_URL}/api/v1/user/signup`,
        safeData
      );
      if (response.status === 200) {
        toast.success(response.data.message)
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
      <div className="mx-4 w-full h-fit sm:mx-0 sm:w-1/2  md:w-1/4 flex flex-col items-center justify-center bg-white p-4 rounded-lg">
        <div className="mb-6 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-center text-md text-gray-600 mt-2 mx-4">
            Enter your information to create an account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-2"
        >
          <InputField
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange("firstName")}
            label="First Name"
            required
          />
          <InputField
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange("lastName")}
            label="Last Name"
            required
          />
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
            label="Sign Up"
            disabled={!isFormFilled}
            className={
              !isFormFilled ? "bg-gray-400 opacity-50 cursor-not-allowed" : ""
            }
          />
        </form>
        <div className="mt-2 text-gray-700">
          Already have an account{" "}
          <Link to="/signin" className="text-black underline">
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import User from "../Schemas/user.schema.js";
import bcrypt from "bcrypt";

// signup controller
export const signupController = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// signin controller
export const signinController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ message: "Signin successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

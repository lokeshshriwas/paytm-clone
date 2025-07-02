import User from "../Schemas/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import zod from "zod";
import Account from "../Schemas/account.schema.js";

// signup controller
const signupBody = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const udpateDetailsBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

export const signupController = async (req, res) => {
  const result = signupBody.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Incorrect inputs" });
  }

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
    if (user) {
      const account = await Account.create({ userId: user._id, balance: Math.floor(Math.random() * 100000) + 1});
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
      return res
        .status(201)
        .json({ message: "User created successfully", token, amount : (account.balance/100).toFixed(2) });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// signin controller
export const signinController = async (req, res) => {
  const result = signinBody.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Incorrect inputs" });
  }
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    return res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDetailsController = async (req, res) => {
  const { firstName, lastName, password } = req.body;
  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.password = (await bcrypt.hash(password, 10)) || user.password;

    await user.save();
    return res.status(200).json({ message: "Details updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSearchedUser = async (req, res) => {
  const filter = req.query.filter || "";
  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });
    const filteredUsers = users.filter(
      (user) => user._id.toString() !== req.userId.toString()
    );
    const formattedUsers = filteredUsers.map((user) => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }));
    return res
      .status(200)
      .json({ message: "Search successful", users: formattedUsers });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkToken = (req, res) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeaders.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(decodedToken.userId){
        req.userId = decodedToken.userId;
        return res.status(200).json({message : "Token validated"})
    }else {
        return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};


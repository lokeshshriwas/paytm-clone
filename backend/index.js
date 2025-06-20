import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.router.js";
configDotenv();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.listen(parseInt(process.env.DEV_PORT), async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(err));

  console.log("Server Started");
});

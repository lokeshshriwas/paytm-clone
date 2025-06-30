import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.router.js";
import accountRouter from "./routes/account.router.js";
import cors from "cors"
import { authMiddleware } from "./middlewares/authmiddleware.js";

configDotenv();

const app = express();
app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use(authMiddleware);
app.use("/api/v1/account", accountRouter);

app.listen(parseInt(process.env.DEV_PORT), async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(err));

  console.log("Server Started");
});

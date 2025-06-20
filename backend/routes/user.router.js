// Creating signup route
import express from "express";
import { Router } from "express";
import { signinController, signupController } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signupController);
router.post("/signin", signinController);

export default router;
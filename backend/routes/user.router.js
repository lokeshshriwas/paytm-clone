// Creating signup route
import express from "express";
import { Router } from "express";
import { getSearchedUser, signinController, signupController, updateDetailsController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = Router();

router.post("/signup", signupController);
router.post("/signin", signinController);
router.put('/update', authMiddleware, updateDetailsController);
router.get('/searchUsers', authMiddleware, getSearchedUser)

export default router;
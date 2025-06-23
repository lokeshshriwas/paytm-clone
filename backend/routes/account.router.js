// Creating signup route
import { Router } from "express";
import { balanceController, transferController } from "../controllers/account.controller.js";

const router = Router();

router.get("/balance", balanceController);
router.post("/transfer",  transferController);

export default router;
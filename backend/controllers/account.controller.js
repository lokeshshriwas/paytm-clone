import mongoose from "mongoose";
import Account from "../Schemas/account.schema.js";

export const transferController = async (req, res) => {
  const { to, amount } = req.body;

  const {_id : fromAccountId} = await Account.findOne({ userId: req.userId });

  if (!fromAccountId || !to || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const verifySender = await Account.findById(fromAccountId);
  if (!verifySender) {
    return res.status(404).json({ message: "Sender account not found" });
  }

  if (verifySender.userId.toString() !== req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const verifyReceiver = await Account.findOne({userId : to});
  if (!verifyReceiver) {
    return res.status(404).json({ message: "Receiver account not found" });
  }

  const amountInCents = Math.round(amount * 100);
  
  if (verifySender.balance < amountInCents) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await Account.findByIdAndUpdate(
      fromAccountId,
      { $inc: { balance: -amountInCents } },
      { session }
    );

    await Account.findByIdAndUpdate(
      verifyReceiver._id,
      { $inc: { balance: amountInCents } },
      { session }
    );

    await session.commitTransaction();
    return res.status(200).json({ message: "Transaction successful" });
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction error:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
};

export const balanceController = async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    return res.status(200).json({ message: "Balance retrieved successfully", balance : (account.balance/100).toFixed(2) });
  } catch (error) {
    console.error("Error retrieving balance:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
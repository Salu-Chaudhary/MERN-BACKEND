import mongoose from "mongoose";
import {
  ONLINE_PAYMENT,
  CARD_PAYMENT,
  CASH_PAYMENT,
} from "../constants/paymentStatus.js";

const paymentSchema = new mongoose.Schema({
  transactionId: String,
  amount: {
    type: Number,
    required: [true, "Payment amount is required"],
  },
  method: {
    type: String,
    required: [true, "Payment method is required"],
    enum: [ONLINE_PAYMENT, CARD_PAYMENT, CASH_PAYMENT],
  },
  status: {
    type: String,
    default: "Pending",
  },
  createAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const Payement = mongoose.model("Payment", paymentSchema);

export default Payement;

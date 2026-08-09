import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    default: () => Date.now() + 900000, // for 15 mins
  },
});

const ResetPassword = mongoose.model("ResetPassword", resetPasswordSchema);

export default ResetPassword;

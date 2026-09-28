import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required!!"],
    minLength: [3, "Username must be at least 3 character long"],
  },
  email: {
    type: String,
    unique: [true, "email already exists!!"],
    required: [true, "email is required!!"],
  },
  mobile: {
    type: String,
    required: [true, "mobile number is required"],
  },
  password: {
    type: String,
    required: [true, "password is required!!"],
    minLength: [8, "Password should be 8 character long"],
  },
  address: {
    country: {
      type: String,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  role: {
    type: [String],
    enum: ["MERCHANT", "USER", "ADMIN"],
  },
  profileImage: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;

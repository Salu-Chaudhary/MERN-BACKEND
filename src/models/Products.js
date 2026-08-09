import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  name: {
    type: String,
    required: [true, "Name is compulsory!!"],
  },
  type: String,
  color: String,
  size: [String],
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    default: 1,
  },
  price: {
    type: Number,
    min: [1, "Price must be greater than 1"],
    max: [10000, "Price must be lower than 10000"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const model = mongoose.model("Product", productSchema);

export default model;

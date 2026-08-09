import mongoose, { mongo } from "mongoose";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "../constants/orderStatuses.js";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    enum: [
      ORDER_STATUS_PENDING,
      ORDER_STATUS_CONFIRMED,
      ORDER_STATUS_SHIPPED,
      ORDER_STATUS_DELIVERED,
      ORDER_STATUS_CANCELLED,
    ],
    default: "PENDING",
  },
  shippingAddress: {
    country: {
      type: String,
      default: "Nepal",
    },
    province: {
      type: String,
      required: [true, "Province is Required"],
    },
    city: {
      type: String,
      required: [true, "City is Required"],
    },
    street: {
      type: String,
      required: [true, "Street is required"],
    },
  },
  totalPrice: {
    type: Number,
    required: [true, "Totalprice is Required"],
  },
  orderNumber: {
    type: String,
    required: [true, "Ordernumber is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  payment: {
    type: mongoose.Schema.ObjectId,
    ref: "Payment",
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

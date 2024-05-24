import mongoose from "mongoose";
import { Order } from "./Order.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      // unique: true, // Ensure unique usernames
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // Add more validation for password complexity if needed
    },
    address: {
      type: String,
      required: true,
    },
    phoneno: {
      type: String,
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;

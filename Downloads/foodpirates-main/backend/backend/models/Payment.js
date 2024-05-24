import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentmethod: { type: String, required: true }, // Assuming payment method is a string
    paid: { type: Number, default: 0 }, // Assuming paid amount is a number, defaulting to 0
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    orderid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    }, // Enum for status with default "pending"
  },
  { timestamps: true },
);

export const Payment = mongoose.model("Payment", paymentSchema);

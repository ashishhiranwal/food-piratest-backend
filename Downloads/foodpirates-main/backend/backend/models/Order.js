import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  id: String,
  //add price
  pic: String,
});

const orderSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    restaurantId: { type: mongoose.Types.ObjectId, ref: "Restaurant" },
    restaurantName: {
      type: String,
    },
    items: [orderItemSchema], // Define items as an array of orderItemSchema
    totalPrice: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);

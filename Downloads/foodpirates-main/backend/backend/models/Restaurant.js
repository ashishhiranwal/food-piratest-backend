import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneno: {
      type: String,
      required: true,
      //unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      //unique: true,
    },
    pic: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    menu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true },
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;

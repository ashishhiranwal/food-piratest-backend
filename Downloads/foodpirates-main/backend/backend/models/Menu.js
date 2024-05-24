import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
  {
    name: { type: String, required: true }, // Assuming foodName is a string and required
    restaurantId: { type: mongoose.Types.ObjectId, ref: "Restaurant" },

    pic: { type: String }, // Assuming pic is a URL string
    description: { type: String }, // Assuming descriptionn is a string
    price: { type: Number, required: true }, // Assuming price is a number and required
    category: {
      type: String,
      enum: ["Veg", "Non-Veg"],
      default: "Veg", // Default value if not specified
    },
  },
  { timestamps: true },
);

export const Menu = mongoose.model("Menu", menuSchema);

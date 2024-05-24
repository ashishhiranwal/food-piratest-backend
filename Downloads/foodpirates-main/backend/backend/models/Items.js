import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // rating: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Rating",
    // },
    id: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const Item = mongoose.model("Item", itemSchema);

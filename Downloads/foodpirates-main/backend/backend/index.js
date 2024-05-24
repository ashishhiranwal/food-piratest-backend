import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/Authrouter.js";
import restaurantRoutes from "./routes/Restaurant.js";
import orderRoutes from "./routes/Orderrouter.js";
import userRoutes from "./routes/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
dotenv.config();
import cors from "cors";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/users", userRoutes);

// app.use("/api/user", userRoutes);
app.listen(3000, () => {
  console.log("server running on port 3000!!");
});

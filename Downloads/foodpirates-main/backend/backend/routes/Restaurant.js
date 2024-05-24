import express from "express";
import {
  createMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getAllRestaurants,
  getMenuByRestaurantId,
  getRestaurantById,
  // getMenuItems,
} from "../controllers/restaurant.js";

const router = express.Router();

// Route to create a new menu item
router.post("/createMenuItem", createMenuItem);
router.get("/getAllRestaurants", getAllRestaurants);
router.post("/updateMenuItem", updateMenuItem);
router.post("/getMenu", getMenuByRestaurantId);
router.post("/deletemenu", deleteMenuItem);
router.post("/getRestaurant", getRestaurantById);
// router.post("/getMenuItems", getMenuItems);

// Other routes for restaurant management can be added here

export default router;

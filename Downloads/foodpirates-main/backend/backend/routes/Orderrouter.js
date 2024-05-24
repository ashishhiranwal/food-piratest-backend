import express from "express";
import { getOrdersByRestaurantId } from "../controllers/orders.js";
import { placeOrder } from "../controllers/orders.js";
// import { getMenuItemsByRestaurant } from "../controllers/orders.js";
// import getOrdersByRestaurantId from "../controllers/orders.js";
import { getOrdersByUserId } from "../controllers/orders.js";
import { getUserDetailsFromOrder } from "../controllers/orders.js";
const router = express.Router();

// Route for placing an order
router.post("/place-order", placeOrder);
router.post("/user", getOrdersByUserId);
router.post("/ordersByRestaurantId", getOrdersByRestaurantId);
router.post("/userDetailsFromOrder", getUserDetailsFromOrder);
export default router;

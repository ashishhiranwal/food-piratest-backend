import { Order } from "../models/Order.js";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import { Menu } from "../models/Menu.js";
//getorderbyrestaurantid
export const placeOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items, totalPrice } = req.body;

    // Validate input
    if (!userId || !restaurantId || !items || items.size === 0 || !totalPrice) {
      return res.status(400).json({
        message: "User ID, restaurant ID, items, and total price are required.",
      });
    }

    const restau = await Restaurant.findById(restaurantId);
    const restaurantName = restau.name;
    const userD = await User.findById(userId);
    console.log(userD);

    // Create a new order
    const newOrder = new Order({
      userId,
      restaurantName,
      items,
      totalPrice,
      restaurantId,
    });

    // Save the order
    const savedOrder = await newOrder.save();

    // Update the user's order reference
    await User.findByIdAndUpdate(userId, { $push: { orders: savedOrder._id } });

    // Update the restaurant's order reference
    await Restaurant.findByIdAndUpdate(restaurantId, {
      $push: { orders: savedOrder._id },
    });

    res.status(201).json({
      message: "Order placed successfully.",
      order: savedOrder,
      userDetials: userD,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    // Find orders for the given user ID and populate the userId field with user details
    //
    const orders = await Order.find({ userId }).populate(
      "userId",
      "name email",
    ); // Adjust fields as needed
    const userD = await User.findById(userId);
    res.status(200).json({
      orders,
      userD,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Unable to fetch orders" });
  }
};

export const getOrdersByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.body; // Assuming restaurantId is passed in the request body
    console.log(restaurantId);

    // Validate restaurant ID
    if (!restaurantId) {
      return res.status(400).json({ message: "Restaurant ID is required." });
    }

    // Query orders by restaurant ID and populate the restaurantId field with restaurant details
    const orders = await Order.find({ restaurantId }).populate(
      "restaurantId",
      "name address phone",
    ); // Adjust fields as needed

    // const userD = await User.findById(userId);
    // res.status(200).json({
    //   orders,
    //   userD,
    // });

    // Send the orders as response
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const getUserDetailsFromOrder = async (req, res) => {
  try {
    const { orderId } = req.body; // Assuming orderId is passed in the request body

    // Validate order ID
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required." });
    }

    // Retrieve order details by order ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Access user ID from order details
    const userId = order.userId; // Assuming userId is the field in the order object

    // Retrieve user details by user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log("user reached");
    // Send user details as response
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// export const getMenuItemsByRestaurant = async (req, res) => {
//   const { restaurantId } = req.body;

//   if (!restaurantId) {
//     return res.status(400).json({ message: "Restaurant ID is required" });
//   }

//   try {
//     const menuItems = await Menu.find({ restaurantId });
//     if (menuItems.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No menu items found for this restaurant" });
//     }
//     res.status(200).json(menuItems);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getMenuItemsByRestaurant = async (req, res) => {
//   const { restaurantId } = req.body; // or req.query if using query params

//   if (!restaurantId) {
//     return res.status(400).json({ message: "Restaurant ID is required" });
//   }

//   try {
//     const menu = await Menu.find({ restaurantId });

//     if (menu.size === 0) {
//       return res
//         .status(404)
//         .json({ message: "No menu items found for this restaurant" });
//     }
//     res.status(200).json(menu);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

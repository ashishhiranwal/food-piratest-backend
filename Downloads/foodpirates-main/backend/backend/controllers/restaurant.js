import { Menu } from "../models/Menu.js";
import Restaurant from "../models/Restaurant.js";

// import { validationResult } from "express-validator";

const createMenuItem = async (req, res) => {
  console.log(req.body);
  const { name, pic, description, price, resId, category } = req.body;
  console.log(resId[0]._id);

  // Get the restaurant ID from req.user (assuming it's available in req.user.restaurantId)
  // const restaurantId = req.restaurantId;

  // if (!restaurantId) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Restaurant ID not found in user data",
  //   });
  // }

  // Create a new menu item
  const newMenu = new Menu({
    name,
    pic,
    description,
    price,
    category,
  });

  try {
    // Save the menu item to the Menu collection
    await newMenu.save();

    // Find the restaurant by ID and push the new menu item to its menu array
    await Restaurant.findByIdAndUpdate(
      resId[0]._id,
      { $push: { menu: newMenu._id } },
      { new: true },
    );

    console.log("vjvj");

    return res.status(201).json({
      success: true,
      message: "Menu item created and added to restaurant menu successfully",
    });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create menu item",
      error: error.message,
    });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    // Extract item ID from request body
    const { itemId } = req.body;

    // Check if the item ID is valid
    if (!itemId) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Find the item in the database and delete it
    await Menu.findByIdAndDelete(itemId);

    // Send success response
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    // Extract item ID from request parameters
    const { itemId } = req.params;

    // Check if the item ID is valid
    if (!itemId) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Validate the request body (if needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract updated item data from the request body
    const { foodId, pic, description, foodName, price } = req.body;

    // Update the item in the database
    await Menu.findByIdAndUpdate(itemId, {
      foodId,
      pic,
      description,
      foodName,
      price,
    });

    // Send success response
    res.status(200).json({ message: "Menu item updated successfully" });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// const getMenuItems = async (req, res) => {
//   const { resId } = req.body; // Assuming the restaurant ID is passed as a URL parameter

//   console.log(resId);

//   try {
//     // Find the restaurant by ID and populate the menu array with menu item data
//     const restaurant = await Restaurant.findById(resId).populate("menu");

//     if (!restaurant) {
//       return res.status(404).json({
//         success: false,
//         message: "Restaurant not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Menu items retrieved successfully",
//       menu: restaurant.menu, // Assuming restaurant.menu contains populated menu items
//     });
//   } catch (error) {
//     console.error("Error retrieving menu items:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Unable to retrieve menu items",
//       error: error.message,
//     });
//   }
// };

// const getRestaurantsWithMenu = async (req, res) => {
//   try {
//     const restaurants = await Restaurant.find().populate("menu");
//     res.status(200).json(restaurants);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//
//

const getMenuByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    console.log(restaurantId);

    // Find the restaurant by ID and populate the 'menu' field
    const restaurant = await Restaurant.findById(restaurantId).populate("menu");

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Extract and send only the populated menu data
    const populatedMenu = restaurant.menu.map((item) => ({
      id: item._id,
      pic: item.pic,
      description: item.description,
      foodName: item.name,
      price: item.price,
      category: item.category,
    }));

    res.status(200).json(populatedMenu);
  } catch (error) {
    console.error("Error getting menu by restaurant ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    // Extract restaurant ID from request body
    console.log("hello");
    const { restaurantId } = req.body;

    // Check if the restaurant ID is valid
    if (!restaurantId) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    // Find the restaurant in the database by ID
    const restaurant = await Restaurant.findById(restaurantId);

    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Send the restaurant data as response
    res.status(200).json({ restaurant });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getAllRestaurants,
  // getMenuItems,
  getMenuByRestaurantId,
  getRestaurantById,
};

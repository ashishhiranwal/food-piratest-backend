import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";

export const signup = async (req, res) => {
  const { name, username, email, password, address, phoneno } = req.body;
  console.log(req.body);
  if (!username) {
    return res.status(400).json({
      msg: "Username is required",
    });
  }

  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      msg: "Username already exists",
    });
  }

  const newUser = new User({
    name,
    username, // Ensure that username is set here
    email,
    password,
    address,
    phoneno,
  });

  try {
    await newUser.save();
    return res.status(201).json({
      msg: "User created successfully",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      msg: "Unable to create new user",
    });
  }
};

export const ressignup = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    address,
    phoneno,
    pic,
    description,
  } = req.body;
  console.log(req.body);
  // Hash the password before saving
  // const hashedPassword = bcryptjs.hashSync(password, 10); // Adjust the salt rounds as needed

  const newRestaurant = new Restaurant({
    name,
    username,
    email,
    password,
    address,
    phoneno,
    pic,
    description,
  });

  try {
    await newRestaurant.save();
    return res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create restaurant",
      error: error.message, // Include the error message for debugging
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const validUser = await User.findOne({ email });
    if (!validUser)
      return res.status(500).json({
        msg: "User not found",
      });

    // const validPassword = bcryptjs.compareSync(password, validUser.password);
    //
    if (password != validUser.password) {
      return res.status(401).json({
        msg: "Wrong credentials",
      });
    }

    console.log(validUser);

    const token = jwt.sign({ id: validUser._id }, "asdfghj");

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(validUser);
  } catch (e) {
    return res.status(500).json({
      msg: "unable to signin",
    });
  }
};

export const ressignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await Restaurant.findOne({ email });
    if (!validUser)
      return res.status(500).json({
        msg: "Restaurant not found",
      });

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return res.status(401).json({
        msg: "Wrong credentials",
      });

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (e) {
    return res.status(500).json({
      msg: "unable to signin",
    });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("acces_token");
    res.status(200).json("user has been logged out");
  } catch (e) {
    return res.status(200).json({
      msg: "not able to log out",
    });
  }
};

export const ressignout = async (req, res) => {
  try {
    res.clearCookie("acces_token");
    res.status(200).json("user has been logged out");
  } catch (e) {
    return res.status(200).json({
      msg: "not able to log out",
    });
  }
};

// export const updateUser = async (req, res) => {
//   const userId = req.user;
//   const { name, username, email, password, address, phoneno } = req.body;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           name,
//           username,
//           email,
//           password, // You might want to hash the password before updating
//           address,
//           phoneno,
//         },
//       },
//       { new: true }, // Return the updated document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

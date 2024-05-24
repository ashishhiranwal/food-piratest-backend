import express from "express";
import {
  // deleteUser,
  // test,
  // updateuser,
  // getuserListings,
  // getUser,
  changePassword,
} from "../controllers/user.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// router.get("/test", test);
// router.post("/update/:id", updateuser);
// router.delete("/delete/:id", deleteUser);
// router.get("/listings/:id", getuserListings);
// router.get("/:id", getUser);
router.post("/change-password", changePassword);

export default router;

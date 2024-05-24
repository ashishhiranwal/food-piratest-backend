import express from "express";
import {
  signin,
  signup,
  signout,
  ressignup,
  ressignin,
  ressignout,
  // updateUser,
} from "../controllers/auth.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

//user auth
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
// router.post("/updateUser", verifyToken, updateUser);

//restaurant auth
router.post("/signup/res", ressignup);
router.post("/signin/res", ressignin);
router.get("/signout/res", ressignout);

//driver auth
// router.post("/signup/driver", dsignup);
// router.post("/signin/driver", dsignin);
// router.get("/signout/driver", dsignout);

export default router;

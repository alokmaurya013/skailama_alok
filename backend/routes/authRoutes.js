import express from "express";
import { register, login, userDetails } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/user/me",protect,userDetails);

export default router;

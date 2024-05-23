import express from "express";
import { register, login, deleteUser } from "../controllers/authController";
import { verifyAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/user/:id", verifyAdmin, deleteUser);

export default router;

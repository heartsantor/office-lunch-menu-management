import express from "express";
import {
  addMenuOption,
  viewEmployeeChoices,
} from "../controllers/adminController";
import { verifyAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

// Admin route to add daily menu options
router.post("/menu", verifyAdmin, addMenuOption);

// Admin route to view employee choices
router.get("/choices", verifyAdmin, viewEmployeeChoices);

export default router;

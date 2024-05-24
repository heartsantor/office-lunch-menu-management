import express from "express";
import {
  viewDailyMenu,
  selectLunchChoice,
  viewTodayMenuByUserId,
} from "../controllers/employeeController";
import { verifyUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/menu", verifyUser, viewDailyMenu);
router.post("/choice", verifyUser, selectLunchChoice);
router.get("/menu/today/:userId", verifyUser, viewTodayMenuByUserId);

export default router;

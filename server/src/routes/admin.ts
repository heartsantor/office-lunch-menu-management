import express from "express";
import {
  addMenuOption,
  deleteMenuOptionById,
  viewEmployeeChoices,
  getAllEmployees,
  updateMenuDateById,
} from "../controllers/adminController";
import { verifyAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/menu", verifyAdmin, addMenuOption);
router.delete("/menu/:menuId", verifyAdmin, deleteMenuOptionById);
router.get("/choices", verifyAdmin, viewEmployeeChoices);
router.get("/allEmployeeList", verifyAdmin, getAllEmployees);
router.put("/menu/:menuId/date", verifyAdmin, updateMenuDateById);

export default router;

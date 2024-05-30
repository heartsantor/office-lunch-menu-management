import express from "express";
import {
  getMenuOptionById,
  addMenuOption,
  deleteMenuOptionById,
  editMenuOptionById,
  viewEmployeeChoices,
  getAllEmployees,
  updateMenuDateById,
} from "../controllers/adminController";
import { verifyAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/menu", verifyAdmin, addMenuOption);
router.get("/menu/:menuId", verifyAdmin, getMenuOptionById);
router.delete("/menu/:menuId", verifyAdmin, deleteMenuOptionById);
router.put("/menu/:menuId", verifyAdmin, editMenuOptionById);
router.put("/menu/:menuId/date", verifyAdmin, updateMenuDateById);
router.get("/choices", verifyAdmin, viewEmployeeChoices);
router.get("/allEmployeeList", verifyAdmin, getAllEmployees);

export default router;

import express from 'express';
import { viewDailyMenu, selectLunchChoice } from '../controllers/employeeController';
import { verifyUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Employee route to view daily menu
router.get('/menu', verifyUser, viewDailyMenu);

// Employee route to select lunch choice
router.post('/choice', verifyUser, selectLunchChoice);

export default router;
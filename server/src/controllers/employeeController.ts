import { Request, Response } from "express";
import { query } from "../utils/db";

export const viewDailyMenu = async (req: Request, res: Response) => {
  const { date } = req.query;

  try {
    const result = await query("SELECT * FROM menus WHERE date = $1", [date]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching daily menu" });
  }
};

export const selectLunchChoice = async (req: Request, res: Response) => {
  const { userId, menuId, chosenOption } = req.body;

  try {
    await query(
      `INSERT INTO choices (userId, menuId, chosenOption)
      VALUES ($1, $2, $3)`,
      [userId, menuId, chosenOption]
    );
    res.status(201).json({ message: "Lunch choice selected successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error selecting lunch choice" });
  }
};

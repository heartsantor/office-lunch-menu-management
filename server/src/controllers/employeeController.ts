import { Request, Response } from "express";
import { query } from "../utils/db";

export const viewDailyMenu = async (req: Request, res: Response) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  try {
    const result = await query("SELECT * FROM menus WHERE date = $1", [date]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No menu found for the given date" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching daily menu:", error);
    res.status(500).json({ error: "Error fetching daily menu" });
  }
};

export const selectLunchChoice = async (req: Request, res: Response) => {
  const { userId, menuId } = req.body;

  try {
    // Retrieve the menu item
    const menuResult = await query(
      `SELECT menu_id, date, title, description, rating, rating_amount, price, category, img_url
       FROM menus
       WHERE menu_id = $1`,
      [menuId]
    );

    if (menuResult.rows.length === 0) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    const menu = menuResult.rows[0];

    // Check if the user has already made a choice for this date
    const existingChoiceResult = await query(
      `SELECT * FROM user_choices
       WHERE userId = $1 AND date = $2`,
      [userId, menu.date]
    );

    if (existingChoiceResult.rows.length > 0) {
      return res
        .status(403)
        .json({ error: "You have already selected a lunch choice for today" });
    }

    // Insert the new choice
    await query(
      `INSERT INTO user_choices (userId, menuId, date, title, description, category, img_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        userId,
        menu.menu_id,
        menu.date,
        menu.title,
        menu.description,
        menu.category,
        menu.img_url,
      ]
    );

    res.status(201).json({ message: "Lunch choice selected successfully" });
  } catch (error) {
    console.error("Error selecting lunch choice:", error);
    res.status(500).json({ error: "Error selecting lunch choice" });
  }
};

import { Request, Response } from "express";
import { query } from "../utils/db";

export const viewDailyMenu = async (req: Request, res: Response) => {
  const { date } = req.query;

  try {
    let result;
    if (date) {
      result = await query("SELECT * FROM menus WHERE date = $1", [date]);
      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "No menu found for the given date" });
      }
    } else {
      result = await query("SELECT * FROM menus");
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Error fetching menu" });
  }
};

export const selectLunchChoice = async (req: Request, res: Response) => {
  const { userId, userName, menuId } = req.body;

  try {
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

    await query(
      `INSERT INTO user_choices (userId, userName, menuId, date, title, description, category, img_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        userId,
        userName,
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

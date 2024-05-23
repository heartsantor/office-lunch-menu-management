import { Request, Response } from "express";
import { query } from "../utils/db";

export const addMenuOption = async (req: Request, res: Response) => {
  const {
    date,
    title,
    description,
    rating,
    rating_amount,
    price,
    category,
    imgUrl,
  } = req.body;

  try {
    await query(
      "INSERT INTO menus (date, title, description, rating, rating_amount, price, category, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [date, title, description, rating, rating_amount, price, category, imgUrl]
    );
    res.status(201).json({ message: "Menu option added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding menu option" });
  }
};

export const viewEmployeeChoices = async (req: Request, res: Response) => {
  try {
    const result = await query(`
    SELECT id,userid,menuid, date, title, description, category, img_url
    FROM user_choices
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee choices" });
  }
};

import { Request, Response } from "express";
import { query } from "../utils/db";
import { getTodayInBangladesh } from "../utils/getTodayInBangladesh";

export const getMenuOptionById = async (req: Request, res: Response) => {
  const menuId = req.params.menuId;

  try {
    const result = await query("SELECT * FROM menus WHERE menu_id = $1", [menuId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Menu option not found" });
    }

    res.status(200).json({
      message: "Menu option retrieved successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving menu option" });
  }
};

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
  console.log("🚀 ~ addMenuOption ~ date:", date);

  try {
    const result = await query(
      "INSERT INTO menus (date, title, description, rating, rating_amount, price, category, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [date, title, description, rating, rating_amount, price, category, imgUrl]
    );
    res.status(201).json({
      message: "Menu option added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding menu option" });
  }
};

export const editMenuOptionById = async (req: Request, res: Response) => {
  const menuId = req.params.menuId;
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
    const result = await query(
      `UPDATE menus
       SET date = $1, title = $2, description = $3, rating = $4, rating_amount = $5, price = $6, category = $7, img_url = $8
       WHERE menu_id = $9
       RETURNING *`,
      [
        date,
        title,
        description,
        rating,
        rating_amount,
        price,
        category,
        imgUrl,
        menuId,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Menu option not found" });
    }

    res.status(200).json({
      message: "Menu option updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating menu option" });
  }
};

export const deleteMenuOptionById = async (req: Request, res: Response) => {
  const menuId = req.params.menuId;

  try {
    await query("DELETE FROM menus WHERE menu_id = $1", [menuId]);
    res.status(200).json({ message: "Menu option deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting menu option" });
  }
};

export const viewEmployeeChoices = async (req: Request, res: Response) => {
  try {
    const result = await query(`
    SELECT id, userid, userName, menuid, date, title, description, category, img_url
    FROM user_choices
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee choices" });
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT email, name, id FROM users WHERE role = $1",
      ["employee"]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching employee list" });
  }
};

export const updateMenuDateById = async (req: Request, res: Response) => {
  const menuId = req.params.menuId;
  const date = getTodayInBangladesh();

  try {
    const result = await query(
      "UPDATE menus SET date = $1 WHERE menu_id = $2 RETURNING *",
      [date, menuId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Menu option not found" });
    }

    res.status(200).json({
      message: "Menu date updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating menu date" });
  }
};

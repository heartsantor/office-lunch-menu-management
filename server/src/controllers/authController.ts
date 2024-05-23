import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../utils/db";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const register = async (req: Request, res: Response) => {
  const { email, password, role, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      "INSERT INTO users (email, password, role, name) VALUES ($1, $2, $3, $4) RETURNING id, email, role, name",
      [email, hashedPassword, role, name]
    );
    const user: User = result.rows[0];
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    if (error.code === "23505" && error.constraint === "users_email_key") {
      return res.status(400).json({
        error: "Email already exists. Please choose a different email address.",
      });
    } else {
      return res.status(500).json({ error: "Error registering user" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    const user: User = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );

    res.status(200).json({
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../utils/db";
import { User } from "../models/User";

const SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (userData: User) => {
  const { email, password, role, name } = userData;

  const existingUser = await query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await query(
    "INSERT INTO users (email, password, role, name) VALUES ($1, $2, $3, $4) RETURNING id, email, role, name",
    [email, hashedPassword, role, name]
  );

  const user = result.rows[0];

  return {
    message: "User registered successfully",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  };
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const { email, password } = userData;
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { email: user.email, id: user.id, role: user.role, name: user.name },
    SECRET,
    { expiresIn: "1h" }
  );

  return {
    message: "Login successful",
    accessToken: token,
    user: {
      email: user.email,
      role: user.role,
      name: user.name,
      id: user.id,
    },
  };
};

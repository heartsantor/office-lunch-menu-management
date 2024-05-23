import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});

export const query = (text: string, params?: any) =>
  pool.query(text, params).catch((err) => {
    console.error("Database query error", err);
    throw err;
  });

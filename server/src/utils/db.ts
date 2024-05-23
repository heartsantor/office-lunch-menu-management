import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const query = (text: string, params?: any) => pool.query(text, params).catch(err => {
  console.error('Database query error', err);
  throw err;
});
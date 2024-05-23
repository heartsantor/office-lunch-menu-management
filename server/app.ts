import express, { Application } from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import authRoutes from './src/routes/auth';

dotenv.config();

const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/auth', authRoutes);

export default app;
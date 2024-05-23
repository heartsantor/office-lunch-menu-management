import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./src/routes/admin";
import employeeRoutes from "./src/routes/employee";
import authRoutes from "./src/routes/auth";

const app = express();

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/employee", employeeRoutes);

export default app;

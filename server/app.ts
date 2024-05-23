import express from "express";
const compression = require("compression");
import bodyParser from "body-parser";
const cors = require("cors");
const helmet = require("helmet");
const methodOverride = require("method-override");

import adminRoutes from "./src/routes/admin";
import employeeRoutes from "./src/routes/employee";
import authRoutes from "./src/routes/auth";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(methodOverride());

app.get("/", (req, res) => res.json({ message: "server start!" }));
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/employee", employeeRoutes);

export default app;

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    (req as any).user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyUser(req, res, () => {
    const user = (req as any).user;
    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });
    next();
  });
};

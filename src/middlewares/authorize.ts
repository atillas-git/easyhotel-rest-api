import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  user: string | JwtPayload;
}

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["x-access-token"] || req.query.token;
    if (!token) {
      return res.status(403).json("Token is required for authentication");
    }
    const decoded = verifyToken(token);
    (req as CustomRequest).user = decoded;
    return next();
  } catch (error) {
    return next(error);
  }
};

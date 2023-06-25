import { Request, Response, NextFunction } from "express";
import SessionModel from "../models/Session";
import { generateToken, verifyToken } from "../utils/jwt";

export const session = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
      return res.status(401).json("Unauthorized !");
    }
    const session = await SessionModel.findById(sessionId);
    if (!session) {
      return res.status(404).json("Session Not Found !");
    }
    let token;
    try {
      token = verifyToken(session.jwt);
    } catch (error) {
      await SessionModel.findByIdAndDelete(sessionId);
      return res.status(401).json("Session Expired !");
    }
    const newToken = generateToken(token);
    await SessionModel.findByIdAndUpdate(sessionId, { jwt: newToken });
    return next();
  } catch (error) {
    return next(error);
  }
};

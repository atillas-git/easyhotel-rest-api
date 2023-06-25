import jwt from "jsonwebtoken";
const secretKey = process.env.ACCESS_TOKEN_SECRET || "SECRET_KEY_12344321";
export const generateToken = (payload: any) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1hr" });
};
export const verifyToken = (token: any) => {
  return jwt.verify(token, secretKey);
};

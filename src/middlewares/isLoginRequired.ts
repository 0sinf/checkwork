import { Request, Response, NextFunction } from "express";
import { verifyJsonWebToken } from "../utils/jwt";

export default async function isLoginRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new Error("로그인이 필요합니다."));
  }
  try {
    const payload = verifyJsonWebToken(token);
    req.user = payload.user;
  } catch (error) {
    return next(error);
  }
  next();
}

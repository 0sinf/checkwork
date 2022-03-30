import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import config from "../config";

export default function loginRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers?.authorization?.split("Bearer ")[1];
  if (!token || !jwt.verify(token, config.jwt.secret)) {
    next(new Error("로그인이 필요합니다."));
  }
  next();
}

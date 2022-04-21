import { NextFunction, Request, Response } from "express";
import authService from "../services/auths.service";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

import { Request, Response, NextFunction } from "express";
import userRepository from "../models/users.model";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = await userRepository.save(req.body);
    res.status(201).json(userId);
  } catch (error) {
    next(error);
  }
}

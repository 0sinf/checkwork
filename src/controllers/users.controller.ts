import { Request, Response, NextFunction } from "express";
import userRepository from "../models/users.model";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = await userRepository.save(req.body);
    res.status(201).json({ userId });
  } catch (error) {
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const user = await userRepository.findById(+userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    const user = await userRepository.findByIdAndUpdate(+userId, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

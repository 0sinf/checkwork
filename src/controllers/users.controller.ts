import { Request, Response, NextFunction } from "express";
import userRepository from "../models/users.model";
import userService from "../services/users.service";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = await userService.createUser(req.body);
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

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    await userRepository.findByIdAndDelete(+userId);
    res.json();
  } catch (error) {
    next(error);
  }
}

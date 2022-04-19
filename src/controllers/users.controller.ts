import { Request, Response, NextFunction } from "express";
import * as userRepository from "../models/users.model";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = await userRepository.create(req.body);
}

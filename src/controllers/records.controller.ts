import { Request, Response, NextFunction } from "express";
import recordService from "../services/records.service";

export async function createRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await recordService.createRecord(req.body);
    res.status(201).json();
  } catch (error) {
    next(error);
  }
}

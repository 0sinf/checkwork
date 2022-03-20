import { Request, Response, NextFunction } from "express";

interface AsyncFunction {
  (req: Request, res: Response): Promise<void>;
}

const asyncHandler =
  (asyncFunction: AsyncFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFunction(req, res);
    } catch (e) {
      next(e);
    }
  };

export default asyncHandler;

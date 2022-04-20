import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string().required(),
  wage: Joi.number().required(),
});

const updateUserSchema = Joi.object({
  company: Joi.string(),
  wage: Joi.number(),
});

const Validators = {
  createUser: createUserSchema,
  updateUser: updateUserSchema,
};

export default function validator(validator: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      next(error);
    }
  };
}

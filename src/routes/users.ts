import { Router } from "express";
import * as userController from "../controllers/users.controller";

const userRouter = Router();

userRouter.get("/", userController.createUser);

export default userRouter;

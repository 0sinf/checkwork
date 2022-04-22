import { Router } from "express";
import validator from "../middlewares/validator";
import * as userController from "../controllers/users.controller";
import * as authController from "../controllers/auths.controller";
import isLoginRequired from "../middlewares/isLoginRequired";

const userRouter = Router();

userRouter.get("/:userId", isLoginRequired, userController.getUser);

userRouter.post("/", validator("createUser"), userController.createUser);

userRouter.patch(
  "/:userId",
  validator("updateUser"),
  isLoginRequired,
  userController.updateUser
);

userRouter.delete("/:userId", isLoginRequired, userController.deleteUser);

userRouter.post("/login", validator("loginUser"), authController.login);

export default userRouter;

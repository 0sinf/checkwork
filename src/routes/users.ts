import { Router } from "express";
import validator from "../middlewares/validator";
import * as userController from "../controllers/users.controller";
import * as authController from "../controllers/auths.controller";

const userRouter = Router();

userRouter.get("/:userId", userController.getUser);

userRouter.post("/", validator("createUser"), userController.createUser);

userRouter.patch(
  "/:userId",
  validator("updateUser"),
  userController.updateUser
);

userRouter.delete("/:userId", userController.deleteUser);

userRouter.post("/login", authController.login);

export default userRouter;

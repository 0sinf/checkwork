import { Router } from "express";

import { UserService } from "../services/users.service";
import loginRequired from "../middlewares/loginRequired";
import checkUser from "../utils/checkUser";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.get(
  "/:id",
  loginRequired,
  asyncHandler(async (req, res) => {
    const userId = Number(req.params.id);
    const token = req.headers.authorization.split("Bearer ")[1];
    const { id } = checkUser(token, userId);

    const userService = new UserService();
    const user = await userService.getUserInfo(id);
    res.json({ user });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, password, passwordConfirm } = req.body;
    const userService = new UserService();
    const userId = await userService.createUser(
      email,
      password,
      passwordConfirm
    );
    res.status(201).json({ userId });
  })
);

router.post(
  "/verify",
  asyncHandler(async (req, res) => {
    const validationKey = String(req.query.validationKey);
    const userService = new UserService();
    const token = await userService.verifyEmail(validationKey);
    res.status(201).json({ token });
  })
);

router.patch(
  "/:id",
  loginRequired,
  asyncHandler(async (req, res) => {
    const userId = Number(req.params.id);
    const token = req.headers.authorization.split("Bearer ")[1];
    const { id } = checkUser(token, userId);

    const { wage } = req.body;
    const userService = new UserService();
    await userService.updateWage(id, Number(wage));

    res.json();
  })
);

export default router;

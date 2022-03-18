import { Router } from "express";

import { UserService } from "../services/users.service";
import { AuthService } from "../services/auths.service";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;
  const userService = new UserService();
  const userId = await userService.createUser(email, password, passwordConfirm);
  res.status(201).json({ userId });
});

router.post("/verify", async (req, res) => {
  const validationKey = String(req.query.validationKey);
  const userService = new UserService();
  const token = await userService.verifyEmail(validationKey);
  res.status(201).json({ token });
});

router.patch("/:id", loginRequired, async (req, res) => {
  const userId = Number(req.params.id);
  const token = req.headers.authorization.split("Bearer ")[1];
  const authService = new AuthService();
  const { id } = authService.checkUser(token, userId);

  const { wage } = req.body;
  const userService = new UserService();
  await userService.updateWage(id, Number(wage));

  res.json();
});

export default router;

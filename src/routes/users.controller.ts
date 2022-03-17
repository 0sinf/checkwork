import { Router } from "express";

import { UserService } from "../services/users.service";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;
  const userService = new UserService();
  const userId = await userService.createUser(email, password, passwordConfirm);
  res.status(201).json({ userId });
});

router.get("/verify", async (req, res) => {
  const validationKey = String(req.query.validationKey);
  const userService = new UserService();
  await userService.verifyEmail(validationKey);
  res.status(200).json();
});

export default router;

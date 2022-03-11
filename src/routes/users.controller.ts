import { Router } from "express";

import { UserService } from "../services/users.service";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;
  const userService = new UserService();
  const userId = await userService.createUser(email, password, passwordConfirm);
  res.status(201).json({ userId });
});

export default router;

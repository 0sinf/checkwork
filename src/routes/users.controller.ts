import { Router } from "express";

import { createUser } from "../services/users.service";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;
  const userId = createUser(email, password, passwordConfirm);
  res.status(201).json({ userId });
});

export default router;

import { Router } from "express";
import { UserService } from "../services/users.service";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // email, password 로 유저 불러오고, 그 유저로 로그인하고
  const userService = new UserService();
  const token = userService.loginUser(email, password);
  res.status(201).json({ token });
});

export default router;

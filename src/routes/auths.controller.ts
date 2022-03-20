import { Router } from "express";
import { UserService } from "../services/users.service";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // email, password 로 유저 불러오고, 그 유저로 로그인하고
    const userService = new UserService();
    const token = await userService.loginUser(email, password);
    res.status(201).json({ token });
  })
);

export default router;

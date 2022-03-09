import { Router } from "express";

import user from "./users.controller";

const router = Router();

router.use("/users", user);

export default router;

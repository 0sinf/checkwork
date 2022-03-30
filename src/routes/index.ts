import { Router } from "express";

import user from "./users.controller";
import auth from "./auths.controller";

const router = Router();

router.use("/auth", auth);
router.use("/users", user);

export default router;

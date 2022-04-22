import { Router } from "express";

const recordRouter = Router();

recordRouter.post("/", (req, res) => {
  console.log(req.body);
  res.status(201).json({ isOk: true });
});

export default recordRouter;

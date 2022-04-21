import express, { NextFunction, Request, Response } from "express";

import config from "./config";
import userRouter from "./routes/users";

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error.message);
  res.status(400).json({ message: error.message });
});

app.listen(config.port, () => {
  console.log("Start App");
});

export default app;

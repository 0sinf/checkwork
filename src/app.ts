import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import config from "./config";
import recordRouter from "./routes/records";
import userRouter from "./routes/users";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);
app.use("/api/records", recordRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json(error);
});

app.listen(config.port, () => {
  console.log("Start App");
});

export default app;

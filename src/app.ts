import express from "express";
import dotenv from "dotenv";

import config from "./config";
import userRouter from "./routes/users";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(config.port, () => {
  console.log("Start App");
});

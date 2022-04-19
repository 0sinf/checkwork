import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";

import config from "./config";

dotenv.config();

const app = express();

app.listen(config.port, () => {
  console.log("Start App");
});

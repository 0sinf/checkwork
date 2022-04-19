import express from "express";
import dotenv from "dotenv";

import config from "./config";
import routes from "./routes";

dotenv.config();

const app = express();

app.use("/api", routes);

app.listen(config.port, () => {
  console.log("Start App");
});

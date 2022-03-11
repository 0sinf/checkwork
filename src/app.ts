import express from "express";
import { createConnection } from "typeorm";

import config from "./config";
import route from "./routes";

const app = express();
const port = config.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);

createConnection()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Start app at ${port}`);
  });
}

export default app;

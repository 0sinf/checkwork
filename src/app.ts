import express from "express";

import config from "./config";
import route from "./routes";

const app = express();
const port = config.port || 3000;

app.use("/api", route);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Start app at ${port}`);
  });
}

export default app;

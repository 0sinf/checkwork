import express from "express";

import config from "./config";
import route from "./routes";

const app = express();
const port = config.port || 3000;

app.use("/api", route);

app.listen(port, () => {
  console.log(`Start app at ${port}`);
});

export default app;

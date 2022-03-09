import express from "express";
import { Pool } from "pg";

import config from "./config";

const app = express();
const port = config.port || 3000;

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port || 5432,
});

app.listen(port, () => {
  console.log(`Start app at ${port}`);
});

export default app;

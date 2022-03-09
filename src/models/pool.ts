import { Pool } from "pg";

import config from "../config";

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port || 5432,
});

export default pool;

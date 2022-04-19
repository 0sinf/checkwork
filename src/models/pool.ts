import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
});

export default pool;

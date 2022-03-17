import dotenv from "dotenv";

dotenv.config();

export default {
  port: Number(process.env.PORT),
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
  },
  bcrypt: {
    salt: process.env.SALT,
  },
};

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
    salt: Number(process.env.SALT),
  },
  email: {
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
  },
};

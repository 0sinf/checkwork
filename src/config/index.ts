import dotenv from "dotenv";

dotenv.config();

export default {
  port: +process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT || 5432,
  },
  saltRounds: +process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    payload: process.env.JWT_PAYLOAD,
  },
};

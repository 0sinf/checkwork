import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "users";
import config from "../config";

const jwtOptions = { expiresIn: "1d" };

export function generateJsonWebToken(user: Omit<User, "id" | "password">) {
  const token = jwt.sign({ user }, config.jwt.payload, jwtOptions);
  return token;
}

export function verifyJsonWebToken(token: string) {
  const result = jwt.verify(token, config.jwt.payload) as JwtPayload;
  return result;
}

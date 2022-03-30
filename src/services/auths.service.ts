import * as jwt from "jsonwebtoken";
import { Service } from "typedi";
import { User } from "user";

import config from "../config";

@Service()
export class AuthService {
  login(user: User) {
    const payload = { ...user };
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: "1d",
      audience: "example.com",
      issuer: "example.com",
    });
  }
}

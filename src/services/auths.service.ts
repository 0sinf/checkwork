import * as jwt from "jsonwebtoken";

import config from "../config";

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

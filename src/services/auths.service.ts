import * as jwt from "jsonwebtoken";

import config from "../config";

interface User {
  id: number;
  email: string;
}

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

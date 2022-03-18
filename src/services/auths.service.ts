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

  checkUser(token: string, userId: number) {
    const { id, email } = jwt.decode(token) as User;
    if (userId !== id) {
      throw new Error("사용자가 아닙니다.");
    }
    return { id, email };
  }
}

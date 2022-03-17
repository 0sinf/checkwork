import { hashSync } from "bcrypt";

import { Users } from "../entities/Users";
import config from "../config";

export class UserService {
  private checkPasswordConfirm(password: string, passwordConfirm: string) {
    return password === passwordConfirm;
  }

  async createUser(
    email: string,
    password: string,
    passwordConfirm: string
  ): Promise<number> {
    if (!this.checkPasswordConfirm(password, passwordConfirm)) {
      throw new Error("비밀번호를 확인해주세요!");
    }

    const user = new Users();
    user.email = email;
    user.password = hashSync(password, config.bcrypt.salt);
    await user.save();

    return user.id;
  }
}

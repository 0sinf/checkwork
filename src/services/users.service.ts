import { hashSync } from "bcrypt";
import * as uuid from "uuid";

import { Users } from "../entities/Users";
import config from "../config";

export class UserService {
  private checkPasswordConfirm(password: string, passwordConfirm: string) {
    return password === passwordConfirm;
  }

  private async isExistEmail(email: string) {
    const user = await Users.findOne({ email });
    if (!user) {
      return false;
    }
    return true;
  }

  async createUser(
    email: string,
    password: string,
    passwordConfirm: string
  ): Promise<number> {
    if (!this.checkPasswordConfirm(password, passwordConfirm)) {
      throw new Error("비밀번호를 확인해주세요!");
    }
    if (await this.isExistEmail(email)) {
      throw new Error("이미 존재하는 이메일입니다!");
    }

    const user = new Users();
    user.email = email;
    user.password = hashSync(password, config.bcrypt.salt);
    user.validationKey = uuid.v1();
    await user.save();

    return user.id;
  }
}

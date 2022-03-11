import { Users } from "../entities/Users";

export class UserService {
  private User: Users;

  constructor() {}

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
    user.password = password;
    await user.save();

    return user.id;
  }
}

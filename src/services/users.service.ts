import * as bcrypt from "bcrypt";
import { UserRepository, UserCreateRequest } from "users";
import userRepository from "../models/users.model";
import config from "../config";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = userRepository;
  }

  async createUser(userCreateRequest: UserCreateRequest) {
    const { password, passwordConfirm, email, ...rest } = userCreateRequest;

    if (await this.hasEmail(email)) {
      throw new Error("이미 존재하는 이메일입니다.");
    }

    this.checkPassword(password, passwordConfirm);
    const hashedPassword = this.getHashedPassword(password);

    const userId = await this.userRepository.save({
      ...rest,
      email,
      password: hashedPassword,
    });

    return userId;
  }

  private checkPassword(password: string, passwordConfirm: string) {
    if (password === passwordConfirm) {
      return;
    }
    throw new Error("비밀번호를 확인해주세요.");
  }

  private async hasEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  }

  private getHashedPassword(password: string) {
    const salt = bcrypt.genSaltSync(config.saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}

const userService = new UserService();

export default userService;

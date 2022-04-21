import * as bcrypt from "bcrypt";
import { UserRepository } from "users";
import userRepository from "../models/users.model";

class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user.email) {
      throw new Error("존재하지 않는 이메일입니다.");
    }

    const { password: hashedPassword, ...userExceptPassword } = user;
    if (!bcrypt.compareSync(password, hashedPassword)) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    return userExceptPassword;
  }
}

const authService = new AuthService();

export default authService;

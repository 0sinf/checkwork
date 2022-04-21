import * as bcrypt from "bcrypt";
import authService from "../../src/services/auths.service";
import userRepository from "../../src/models/users.model";
import config from "../../src/config";

jest.mock("../../src/models/users.model", () => ({
  findByEmail: jest.fn(),
}));

const user = {
  email: "email@email.com",
  password: "password",
  name: "name",
  company: "company",
  wage: 10000,
};

describe("auth service login", () => {
  beforeEach(() => {
    const salt = bcrypt.genSaltSync(config.saltRounds);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    (userRepository.findByEmail as jest.Mock).mockReturnValue({
      ...user,
      password: hashedPassword,
    });
  });

  it("should exist authService.login", () => {
    expect(typeof authService.login).toEqual("function");
  });

  it("should call findByEmail", async () => {
    await authService.login(user.email, user.password);
    expect(userRepository.findByEmail).toBeCalledWith(user.email);
  });

  it("should return user infomation", async () => {
    const result = await authService.login(user.email, user.password);
    expect(result).toEqual({
      email: user.email,
      name: user.name,
      company: user.company,
      wage: user.wage,
    });
  });

  it("should throw error when doesn't match user password", async () => {
    const t = authService.login(user.email, "not equal password");

    await expect(t).rejects.toThrow(new Error("비밀번호가 일치하지 않습니다."));
  });

  it("should throw error when doesn't match user email", async () => {
    (userRepository.findByEmail as jest.Mock).mockReturnValue({});

    const t = authService.login(user.email, user.password);
    await expect(t).rejects.toThrow("존재하지 않는 이메일입니다.");
  });
});

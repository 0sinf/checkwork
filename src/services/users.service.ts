import { create } from "../models/users.model";

function checkPasswordConfirm(password: string, passwordConfirm: string) {
  return password === passwordConfirm;
}

export async function createUser(
  email: string,
  password: string,
  passwordConfirm: string
): Promise<number> {
  if (!checkPasswordConfirm(password, passwordConfirm)) {
    throw new Error("비밀번호를 확인해주세요!");
  }
  const userId = await create(email, password);
  return userId;
}

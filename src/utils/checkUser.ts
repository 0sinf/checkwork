import * as jwt from "jsonwebtoken";

export default function checkUser(token: string, userId: number) {
  const { id, email } = jwt.decode(token) as User;
  if (userId !== id) {
    throw new Error("사용자가 아닙니다.");
  }
  return { id, email };
}

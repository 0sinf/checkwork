import request from "supertest";
import "regenerator-runtime";

import server from "../src/app";

describe("유저 기능 테스트", () => {
  // TODO: mocking

  beforeAll(() => {
    // TODO: create Test table
  });

  afterAll(() => {
    // TODO: remove Test table
  });

  it("유저 생성 테스트", async () => {
    const email = "email@email.com";
    const password = "password";
    const passwordConfirm = "password";

    const res = await request(server)
      .post("/api/users")
      .send({ email, password, passwordConfirm });

    expect(res.statusCode).toEqual(201);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(["userId"]));
  });
});

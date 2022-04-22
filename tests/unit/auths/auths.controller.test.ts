import { NextFunction, Request, Response } from "express";
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from "node-mocks-http";
import * as authConroller from "../../../src/controllers/auths.controller";
import authService from "../../../src/services/auths.service";

let req: MockRequest<Request>, res: MockResponse<Response>, next: NextFunction;

beforeEach(() => {
  req = createRequest();
  res = createResponse();
  next = jest.fn();
});

jest.mock("../../../src/services/auths.service", () => ({
  login: jest.fn(),
}));

const user = {
  email: "email@email.com",
  password: "password",
  name: "name",
  company: "company",
  wage: 10000,
};

describe("auth controller login", () => {
  beforeEach(() => {
    req.body = {
      email: user.email,
      password: user.password,
    };
  });

  it("should have login", () => {
    expect(typeof authConroller.login).toEqual("function");
  });

  it("should call authService.login", async () => {
    await authConroller.login(req, res, null);

    expect(authService.login).toBeCalledWith(user.email, user.password);
  });

  it("should return 200 and json", async () => {
    const { password, ...userExceptPassword } = user;
    (authService.login as jest.Mock).mockReturnValue(userExceptPassword);

    await authConroller.login(req, res, null);

    expect(res.statusCode).toEqual(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const error = { message: "error" };
    const rejectedPromise = Promise.reject(error);
    (authService.login as jest.Mock).mockReturnValue(rejectedPromise);

    await authConroller.login(req, res, next);

    expect(next).toBeCalledWith(error);
  });
});

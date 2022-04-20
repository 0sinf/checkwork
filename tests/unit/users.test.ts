import { Request, Response, NextFunction } from "express";
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from "node-mocks-http";

import * as userController from "../../src/controllers/users.controller";
import userRepository from "../../src/models/users.model";

let req: MockRequest<Request>, res: MockResponse<Response>, next: NextFunction;

jest.mock("../../src/models/users.model", () => ({
  save: jest.fn(),
}));

const newUser = {
  name: "name",
  email: "email@email.com",
  company: "company",
  wage: 10000,
};

beforeEach(() => {
  req = createRequest();
  res = createResponse();
  next = jest.fn();
});

describe("user controller createUser", () => {
  beforeEach(() => {
    req.body = newUser;
  });

  it("should exist createUser", () => {
    expect(typeof userController.createUser).toEqual("function");
  });

  it("should call save", async () => {
    await userController.createUser(req, res, null);
    expect(userRepository.save).toBeCalledWith(newUser);
  });

  it("should return 201", async () => {
    await userController.createUser(req, res, null);
    expect(res.statusCode).toEqual(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "error" };
    const rejectedPromise = Promise.reject(errorMessage);
    (userRepository.save as jest.Mock).mockReturnValue(rejectedPromise);
    await userController.createUser(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

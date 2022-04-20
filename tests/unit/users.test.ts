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
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

const newUser = {
  name: "name",
  email: "email@email.com",
  company: "company",
  wage: 10000,
};
const userId = "1";

beforeEach(() => {
  req = createRequest();
  res = createResponse();
  next = jest.fn();
});

describe("user controller updateUser", () => {
  const updateUser = {
    company: "updated company",
    wage: 15000,
  };

  beforeEach(() => {
    req.body = updateUser;
    req.params.userId = userId;
  });

  it("should exist updateUser", () => {
    expect(typeof userController.updateUser).toEqual("function");
  });

  it("should call findByIdAndUpdate", async () => {
    await userController.updateUser(req, res, null);
    expect(userRepository.findByIdAndUpdate).toBeCalledWith(
      +userId,
      updateUser
    );
  });

  it("should return 200 and json", async () => {
    (userRepository.findByIdAndUpdate as jest.Mock).mockReturnValue(updateUser);
    await userController.updateUser(req, res, null);
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toEqual(updateUser);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const error = { message: "error" };
    const rejectedPromise = Promise.reject(error);
    (userRepository.findByIdAndUpdate as jest.Mock).mockReturnValue(
      rejectedPromise
    );
    await userController.updateUser(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});

describe("user controller getUser", () => {
  beforeEach(() => {
    req.params.userId = userId;
  });

  it("should exist getUser", () => {
    expect(typeof userController.getUser).toEqual("function");
  });

  it("should call findById", async () => {
    await userController.getUser(req, res, null);
    expect(userRepository.findById).toBeCalledWith(+userId);
  });

  it("should return 200 and user", async () => {
    (userRepository.findById as jest.Mock).mockReturnValue(newUser);
    await userController.getUser(req, res, null);
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toEqual(newUser);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "error" };
    const rejectedPromise = Promise.reject(errorMessage);
    (userRepository.findById as jest.Mock).mockReturnValue(rejectedPromise);
    await userController.getUser(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
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

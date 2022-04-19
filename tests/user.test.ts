import { Request, Response } from "express";
import { createRequest, createResponse } from "node-mocks-http";
import * as userController from "../src/controllers/users.controller";
import * as userRepository from "../src/models/users.model";

jest.mock("../src/models/users.model");

let req: Request, res: Response;

const user = {
  name: "test user",
  email: "test email",
  company: "test company",
  wage: 10000,
};

beforeEach(() => {
  req = createRequest();
  res = createResponse();
});

describe("User controller create", () => {
  beforeEach(() => {
    req.body = user;
  });

  it("should exist createUser", () => {
    expect(typeof userController.createUser).toEqual("function");
  });

  it("should call create", async () => {
    await userController.createUser(req, res, null);
    expect(userRepository.create).toBeCalledWith(user);
  });

  it("should return 201 and json data", async () => {
    await userController.createUser(req, res, null);
  });
});

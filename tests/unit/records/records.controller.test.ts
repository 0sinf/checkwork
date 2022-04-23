import { Request, Response, NextFunction } from "express";
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from "node-mocks-http";

import * as recordController from "../../../src/controllers/records.controller";
import recordService from "../../../src/services/records.service";
import recordRepository from "../../../src/models/records.model";

let req: MockRequest<Request>, res: MockResponse<Response>, next: NextFunction;
const now = new Date();
const record = {
  day: now,
  startTime: now,
  endTime: now,
};

jest.mock("../../../src/services/records.service", () => ({
  createRecord: jest.fn(),
}));

beforeEach(() => {
  req = createRequest();
  res = createResponse();
  next = jest.fn();
});

describe("record controller createRecord", () => {
  beforeEach(() => {
    req.body = record;
  });

  it("should exist createRecord", () => {
    expect(typeof recordController.createRecord).toEqual("function");
  });

  it("should call recordService.createRecord", async () => {
    await recordController.createRecord(req, res, null);
    expect(recordService.createRecord).toBeCalledWith(req.body);
  });

  it("should return 201", async () => {
    await recordController.createRecord(req, res, null);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const error = { message: "error" };
    const rejectedPromise = Promise.reject(error);
    (recordService.createRecord as jest.Mock).mockReturnValue(rejectedPromise);
    await recordController.createRecord(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});

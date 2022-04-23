import recordRepository from "../../../src/models/records.model";
import recordService from "../../../src/services/records.service";

jest.mock("../../../src/models/records.model", () => ({
  save: jest.fn(),
}));

const now = new Date();

const record = {
  day: now,
  startTime: now,
  endTime: now,
};

describe("record service save", () => {
  it("should exist createRecord", () => {
    expect(typeof recordService.createRecord).toEqual("function");
  });

  it("should call save", async () => {
    await recordService.createRecord(record);

    expect(recordRepository.save).toBeCalledWith(record);
  });
});

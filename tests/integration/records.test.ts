import request from "supertest";
import app from "../../src/app";

describe("record integration test", () => {
  const now = new Date();
  const record = {
    day: now,
    startTime: now,
    endTime: now,
  };

  beforeAll(() => {});

  it("POST /api/records", async () => {
    const res = await request(app).post("/api/records").send(record);
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
  });
});

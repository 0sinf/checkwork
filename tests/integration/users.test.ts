import request from "supertest";
import app from "../../src/app";

it("POST /api/users", async () => {
  const res = await request(app).post("/api/users").send({
    name: "name",
    email: "email@email.com",
    company: "company",
    wage: 10000,
  });

  expect(res.statusCode).toEqual(201);
  expect(typeof res.body.userId).toEqual("number");
});

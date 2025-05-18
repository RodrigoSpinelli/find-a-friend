import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Register controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    });

    expect(response.statusCode).toBe(201);
  });
});

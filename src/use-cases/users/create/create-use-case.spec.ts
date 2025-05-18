import { it, expect, describe, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/users-repository";
import { CreateUseCase } from "@/use-cases/users/create/create-use-case";

let usersRepository: InMemoryUsersRepository;
let sut: CreateUseCase;

describe("Create user use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUseCase(usersRepository);
  });

  it("should be able to create user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});

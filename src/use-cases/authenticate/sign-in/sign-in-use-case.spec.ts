import { it, expect, describe, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/users-repository";
import { hash } from "bcryptjs";
import { SignInUseCase } from "@/use-cases/authenticate/sign-in/sign-in-use-case";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: SignInUseCase;

describe("Sign in use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new SignInUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "john.doe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(
      sut.execute({
        email: "john.doe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: await hash("123456", 6),
    });

    await expect(
      sut.execute({
        email: "john.doe@example.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});

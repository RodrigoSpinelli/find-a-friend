import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { SignInUseCase } from "@/use-cases/authenticate/sign-in/sign-in-use-case";

export const makeSignIn = () => {
  const usersRepository = new PrismaUsersRepository();
  return new SignInUseCase(usersRepository);
};

import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { CreateUseCase } from "@/use-cases/users/create/create-use-case";

export const makeRegisterUseCase = () => {
  const usersRepository = new PrismaUsersRepository();
  return new CreateUseCase(usersRepository);
};
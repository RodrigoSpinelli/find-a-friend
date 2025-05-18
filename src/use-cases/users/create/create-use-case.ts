import type { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma";
import { hash } from "bcryptjs";

interface CreateRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateResponse {
  user: User;
}

export class CreateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateRequest): Promise<CreateResponse> {
    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return {
      user,
    };
  }
}

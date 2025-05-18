import { User } from "@prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

interface SignInUseCaseRequest {
  email: string;
  password: string;
}

interface SignInUseCaseResponse {
  user: User 
}
export class SignInUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const doesPasswordMatches = await compare(password, user.password);

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return {
      user,
    };
  }
}

import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeSignIn } from "@/use-cases/factories/authenticate/make-sign-in";

export const SignInController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  const authenticateUseCase = makeSignIn();

  try {
    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id } }
    );
    const refreshToken = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id, expiresIn: "7d" } }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return reply.status(400).send({ message: error.message });
    throw error;
  }
};

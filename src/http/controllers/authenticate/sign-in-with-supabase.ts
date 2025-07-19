import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { SupabaseAuthService } from '@/lib/supabase-auth';

export const SignInWithSupabaseController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const { authData, userData } = await SupabaseAuthService.signIn(
      email,
      password
    );

    if (!authData.session) {
      return reply.status(401).send({
        message: 'Invalid credentials',
      });
    }

    return reply.status(200).send({
      message: 'User authenticated successfully',
      user: userData,
      auth: {
        accessToken: authData.session.access_token,
        refreshToken: authData.session.refresh_token,
        expiresAt: authData.session.expires_at,
      },
    });
  } catch (error) {
    console.error('Error during authentication:', error);
    
    if (error instanceof Error) {
      return reply.status(401).send({ 
        message: error.message 
      });
    }
    
    return reply.status(500).send({ 
      message: 'Internal server error' 
    });
  }
}; 
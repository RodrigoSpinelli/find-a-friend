import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { SupabaseAuthService } from '@/lib/supabase-auth';

export const CreateControllerWithSupabase = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string().optional(),
    address: z.string().optional(),
    zipcode: z.string().optional(),
    city: z.string().optional(),
  });

  const userData = createUserBodySchema.parse(request.body);

  try {
    // Usar o serviço de autenticação integrado
    const { user, authData } = await SupabaseAuthService.registerUser(
      userData.email,
      userData.password,
      {
        name: userData.name,
        whatsapp: userData.whatsapp,
        address: userData.address,
        zipcode: userData.zipcode,
        city: userData.city,
      }
    );

    return reply.status(201).send({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        whatsapp: user.whatsapp,
        address: user.address,
        zipcode: user.zipcode,
        city: user.city,
      },
      auth: {
        session: authData.session,
        user: authData.user,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    
    if (error instanceof Error) {
      return reply.status(400).send({ 
        message: error.message 
      });
    }
    
    return reply.status(500).send({ 
      message: 'Internal server error' 
    });
  }
}; 
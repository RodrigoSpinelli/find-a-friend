import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/lib/prisma';

export const ProfileController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    // O middleware de auth já verificou o token e adicionou o usuário ao request
    const supabaseUser = request.supabaseUser;
    
    if (!supabaseUser) {
      return reply.status(401).send({
        message: 'User not authenticated',
      });
    }

    // Buscar dados adicionais do usuário no Prisma
    const userData = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
      select: {
        id: true,
        name: true,
        email: true,
        whatsapp: true,
        address: true,
        zipcode: true,
        city: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userData) {
      return reply.status(404).send({
        message: 'User data not found',
      });
    }

    return reply.status(200).send({
      message: 'User profile retrieved successfully',
      user: {
        ...userData,
        // Dados do Supabase Auth
        emailVerified: supabaseUser.email_confirmed_at !== null,
        lastSignIn: supabaseUser.last_sign_in_at,
      },
    });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    
    return reply.status(500).send({
      message: 'Internal server error',
    });
  }
}; 
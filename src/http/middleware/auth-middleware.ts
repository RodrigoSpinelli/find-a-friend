import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Obter o token do header Authorization
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({
        message: 'Missing or invalid authorization header',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verificar o token com o Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return reply.status(401).send({
        message: 'Invalid or expired token',
      });
    }

    // Adicionar o usuário ao request para uso posterior
    request.supabaseUser = user;

    return;
  } catch (error) {
    console.error('Auth middleware error:', error);
    return reply.status(500).send({
      message: 'Internal server error',
    });
  }
}

// Extensão do tipo FastifyRequest para incluir o usuário do Supabase
declare module 'fastify' {
  interface FastifyRequest {
    supabaseUser?: User;
  }
} 
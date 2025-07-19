import { FastifyInstance } from 'fastify';
import { CreateControllerWithSupabase } from './create/create-controller-with-supabase';
import { SignInWithSupabaseController } from '../authenticate/sign-in-with-supabase';
import { ProfileController } from './profile/profile-controller';
import { authMiddleware } from '../../middleware/auth-middleware';

export async function usersRoutesWithSupabase(app: FastifyInstance) {
  // Rota pública - Registro de usuário
  app.post('/users/register', CreateControllerWithSupabase);

  // Rota pública - Login
  app.post('/users/signin', SignInWithSupabaseController);

  // Rotas protegidas - Requerem autenticação
  app.addHook('preHandler', authMiddleware);

  // Rota protegida - Perfil do usuário
  app.get('/users/profile', ProfileController);

  // Exemplo de outras rotas protegidas
  app.put('/users/profile', async (request, reply) => {
    // Implementar atualização de perfil
    return reply.status(200).send({ message: 'Profile updated' });
  });

  app.delete('/users/profile', async (request, reply) => {
    // Implementar exclusão de conta
    return reply.status(200).send({ message: 'Account deleted' });
  });
} 
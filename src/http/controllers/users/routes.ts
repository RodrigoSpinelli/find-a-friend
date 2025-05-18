import { CreateController } from './create/create-controller';
import { FastifyInstance } from 'fastify';

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/', CreateController);
};

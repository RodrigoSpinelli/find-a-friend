import { SignInController } from './sign-in/sign-in-controller';

import { FastifyInstance } from 'fastify';

export const authenticateRoutes = async (app: FastifyInstance) => {
  app.post('/sign-in', SignInController);
};

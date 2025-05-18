import { ZodError } from 'zod';
import { _env } from './env';

import { fastifyJwt } from '@fastify/jwt';
import { fastifyCookie } from '@fastify/cookie';
import { usersRoutes } from './http/controllers/users/routes';
import { fastify } from 'fastify';
import { authenticateRoutes } from './http/controllers/authenticate/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: _env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);

// Routes
app.register(usersRoutes, {
  prefix: 'users',
});

app.register(authenticateRoutes, {
  prefix: 'auth',
});

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (_env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});

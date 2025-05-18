import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';

describe('Sign in controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    });

    const response = await request(app.server).post('/auth/sign-in').send({
      email: 'john.doe@example.com',
      password: 'password',
    });

    expect(response.statusCode).toBe(200);
  });
});

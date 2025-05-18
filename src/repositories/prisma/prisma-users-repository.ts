import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async create(data: { name: string; email: string; password: string }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
} 
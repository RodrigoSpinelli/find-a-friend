import { supabase } from './supabase';
import { prisma } from './prisma';

// Exemplo de como integrar autenticação do Supabase com o Prisma
export class SupabaseAuthService {
  // Registro de usuário usando Supabase Auth + Prisma para dados adicionais
  static async registerUser(email: string, password: string, userData: {
    name: string;
    whatsapp?: string;
    address?: string;
    zipcode?: string;
    city?: string;
  }) {
    try {
      // 1. Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw new Error(`Erro na autenticação: ${authError.message}`);
      }

      if (!authData.user) {
        throw new Error('Usuário não foi criado');
      }

      // 2. Criar registro no banco usando Prisma
      const user = await prisma.user.create({
        data: {
          id: authData.user.id, // Usar o mesmo ID do Supabase
          email: authData.user.email!,
          name: userData.name,
          password: '', // Não armazenar senha no Prisma, apenas no Supabase Auth
          whatsapp: userData.whatsapp,
          address: userData.address,
          zipcode: userData.zipcode,
          city: userData.city,
        },
      });

      return { user, authData };
    } catch (error) {
      throw error;
    }
  }

  // Login usando Supabase Auth
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(`Erro no login: ${error.message}`);
      }

      // Buscar dados adicionais do usuário no Prisma
      if (data.user) {
        const userData = await prisma.user.findUnique({
          where: { id: data.user.id },
        });

        return { authData: data, userData };
      }

      return { authData: data };
    } catch (error) {
      throw error;
    }
  }

  // Logout
  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(`Erro no logout: ${error.message}`);
    }
  }

  // Verificar sessão atual
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error(`Erro ao obter usuário: ${error.message}`);
    }

    if (user) {
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
      });

      return { authUser: user, userData };
    }

    return { authUser: null, userData: null };
  }
} 
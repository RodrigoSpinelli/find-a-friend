import { createClient } from '@supabase/supabase-js';
import { _env } from '../env';

// Cliente Supabase para operações que não são cobertas pelo Prisma
// como autenticação, storage, realtime, etc.
export const supabase = createClient(
  _env.SUPABASE_URL,
  _env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
);

// Cliente Supabase com service role para operações administrativas
// Use apenas quando necessário para operações que requerem privilégios elevados
export const supabaseAdmin = _env.SUPABASE_SERVICE_ROLE_KEY 
  ? createClient(
      _env.SUPABASE_URL,
      _env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: false,
          detectSessionInUrl: false
        }
      }
    )
  : null; 
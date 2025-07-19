# Configuração do Supabase com Prisma

Este guia explica como configurar o Supabase para trabalhar em conjunto com o Prisma Client.

## 1. Configuração do Supabase

### 1.1 Criar projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto
4. Aguarde a criação do projeto

### 1.2 Obter credenciais
No dashboard do seu projeto Supabase:

1. **URL do projeto**: Vá em Settings > API
2. **Anon Key**: Copie a "anon public" key
3. **Service Role Key**: Copie a "service_role" key (mantenha segura)
4. **Database URLs**: Vá em Settings > Database > Connection string

## 2. Configuração das Variáveis de Ambiente

Crie ou atualize seu arquivo `.env`:

```env
# Configurações existentes
NODE_ENV=dev
PORT=3333
JWT_SECRET=sua-chave-jwt-secreta

# Supabase Configuration
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# Database URLs do Supabase (para o Prisma)
# URL via pooler (para queries normais)
DATABASE_URL=postgresql://postgres:[password]@[host]:6543/postgres?pgbouncer=true
# URL direta (para migrations e operações administrativas)
DIRECT_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

### 2.1 Como obter as Database URLs

No Supabase Dashboard > Settings > Database > Connection string:

1. **DATABASE_URL**: Use a URI com `?pgbouncer=true` (porta 6543)
2. **DIRECT_URL**: Use a URI sem `?pgbouncer=true` (porta 5432)

**Exemplo:**
```
DATABASE_URL=postgresql://postgres.abcdefghijklmnop:[password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.abcdefghijklmnop:[password]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

## 3. Estrutura da Integração

### 3.1 Prisma Client
- **Responsável por**: Operações CRUD no banco de dados
- **Uso**: Queries complexas, relacionamentos, migrations
- **Arquivo**: `src/lib/prisma.ts`

### 3.2 Supabase Client
- **Responsável por**: Autenticação, Storage, Realtime, Edge Functions
- **Uso**: Auth, file uploads, real-time subscriptions
- **Arquivo**: `src/lib/supabase.ts`

## 4. Como Usar

### 4.1 Autenticação com Supabase + Dados com Prisma

```typescript
import { SupabaseAuthService } from './lib/supabase-auth';

// Registro de usuário
const { user, authData } = await SupabaseAuthService.registerUser(
  'user@example.com',
  'password123',
  {
    name: 'João Silva',
    whatsapp: '+5511999999999',
    address: 'Rua das Flores, 123',
    city: 'São Paulo'
  }
);

// Login
const { authData, userData } = await SupabaseAuthService.signIn(
  'user@example.com',
  'password123'
);
```

### 4.2 Operações CRUD com Prisma

```typescript
import { prisma } from './lib/prisma';

// Criar usuário (após autenticação)
const user = await prisma.user.create({
  data: {
    id: supabaseUserId, // ID do Supabase Auth
    email: 'user@example.com',
    name: 'João Silva',
    // ... outros campos
  }
});

// Buscar usuário
const user = await prisma.user.findUnique({
  where: { id: userId }
});

// Atualizar usuário
const updatedUser = await prisma.user.update({
  where: { id: userId },
  data: { name: 'João Silva Santos' }
});
```

### 4.3 Storage com Supabase

```typescript
import { supabase } from './lib/supabase';

// Upload de arquivo
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('user-avatar.jpg', file);

// Download de arquivo
const { data, error } = await supabase.storage
  .from('avatars')
  .download('user-avatar.jpg');
```

## 5. Migrations

Para aplicar as migrations do Prisma no Supabase:

```bash
# Gerar migration
npx prisma migrate dev --name add_new_table

# Aplicar migrations em produção
npx prisma migrate deploy
```

## 6. Vantagens desta Abordagem

1. **Prisma**: Type safety, migrations, queries complexas
2. **Supabase**: Auth pronto, storage, realtime, edge functions
3. **Flexibilidade**: Use o melhor de cada ferramenta
4. **Escalabilidade**: Supabase para infraestrutura, Prisma para ORM

## 7. Considerações de Segurança

1. **Service Role Key**: Use apenas em operações administrativas
2. **Row Level Security**: Configure RLS no Supabase para proteção adicional
3. **Environment Variables**: Nunca commite chaves em repositórios
4. **Auth Tokens**: Valide sempre os tokens do Supabase

## 8. Troubleshooting

### Erro de conexão com banco
- Verifique se a DATABASE_URL e DIRECT_URL estão corretas
- Confirme se o IP está liberado no Supabase

### Erro de autenticação
- Verifique as chaves do Supabase
- Confirme se o projeto está ativo

### Erro de migration
- Verifique se o schema do Prisma está compatível
- Confirme se tem permissões no banco
- Use o DIRECT_URL para migrations 
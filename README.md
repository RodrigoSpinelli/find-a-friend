# Find a Friend

Uma aplicação para conectar pessoas e facilitar a busca por amigos.

## 🚀 Tecnologias

- **Backend**: Node.js com Fastify
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma Client
- **Auth**: Supabase Auth
- **Language**: TypeScript
- **Testing**: Vitest

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm
- Conta no Supabase

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/find-a-friend.git
cd find-a-friend
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Configure o Supabase:
   - Crie um projeto no [Supabase](https://supabase.com)
   - Siga o guia em [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

5. Execute as migrations:
```bash
pnpm generate
npx prisma migrate dev
```

## 🏃‍♂️ Como executar

### Desenvolvimento
```bash
pnpm start:dev
```

### Produção
```bash
pnpm build
pnpm start
```

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Executar testes e2e
pnpm test:e2e
```

## 📚 Documentação

- [Configuração do Supabase](./SUPABASE_SETUP.md) - Guia completo de integração
- [API Documentation](./docs/api.md) - Documentação da API (em breve)

## 🏗️ Arquitetura

```
src/
├── @types/           # Definições de tipos TypeScript
├── env/              # Configuração de variáveis de ambiente
├── http/             # Camada HTTP (controllers, routes)
├── lib/              # Bibliotecas e configurações
│   ├── prisma.ts     # Cliente Prisma
│   ├── supabase.ts   # Cliente Supabase
│   └── supabase-auth.ts # Serviços de autenticação
├── repositories/     # Camada de acesso a dados
├── use-cases/        # Casos de uso da aplicação
└── server.ts         # Ponto de entrada da aplicação
```

## 🔧 Integração Supabase + Prisma

Este projeto utiliza uma abordagem híbrida:

- **Supabase**: Autenticação, Storage, Realtime
- **Prisma**: ORM para operações CRUD e migrations

### Vantagens:
- ✅ Type safety com Prisma
- ✅ Auth pronto com Supabase
- ✅ Storage e Realtime incluídos
- ✅ Migrations automáticas
- ✅ Flexibilidade total

## 📝 Licença

Este projeto está sob a licença ISC.
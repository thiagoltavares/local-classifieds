# Project Architecture

## Overview

Local Classifieds is a monorepo that uses a modern architecture with clear separation of responsibilities between frontend, backend, and data layer.

## Technology Stack

### Backend (apps/api)

- **Framework**: NestJS
- **Linguagem**: TypeScript
- **ORM**: Prisma
- **Validation**: Zod
- **Testes**: Jest

### Frontend (apps/frontend)

- **Framework**: Next.js 14
- **Linguagem**: TypeScript
- **Styling**: TailwindCSS
- **Validation**: Zod (internal library)

### Database

- **SGBD**: PostgreSQL 15
- **ORM**: Prisma
- **Cache**: Redis 7

## Data Models

### Category Model

The Category model represents service categories with hierarchical support and soft delete functionality.

#### Schema Structure

```typescript
model Category {
  id            String     @id @default(uuid()) @db.Uuid
  name          String     @db.VarChar(120)
  slug          String     @unique @db.VarChar(140)
  description   String?    @db.Text
  parentId      String?    @db.Uuid
  parent        Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id], onUpdate: Cascade, onDelete: SetNull)
  children      Category[] @relation("CategoryHierarchy")
  active        Boolean    @default(true)
  displayOrder  Int        @default(0)
  createdAt     DateTime   @default(now()) @db.Timestamptz(6)
  updatedAt     DateTime   @default(now()) @updatedAt @db.Timestamptz(6)

  @@map("categories")
}
```

#### Key Features

- **Hierarchical Structure**: Self-referencing relationship for parent-child categories
- **Soft Delete**: Uses `active` boolean field instead of physical deletion
- **Unique Slugs**: URL-friendly identifiers for categories
- **Display Ordering**: Configurable ordering for UI presentation
- **Cycle Prevention**: Business logic prevents circular references

#### Database Constraints

- Primary Key: `id` (UUID)
- Unique Index: `slug` for fast lookups
- Foreign Key: `parentId` references `categories(id)`
- Indexes: `parentId`, `active` for performance

#### Business Rules

1. **Slug Uniqueness**: Each category must have a unique slug
2. **Hierarchy Validation**: Categories cannot be their own parent or create cycles
3. **Soft Delete**: Categories with active children cannot be deleted
4. **Slug Generation**: Automatic generation from name (lowercase, no accents, hyphens for spaces)

### Infraestrutura

- **Containerização**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Gerenciamento de Pacotes**: npm workspaces

## Project Structure

```
/
├── apps/                          # Applications
│   ├── api/                      # NestJS Backend
│   │   ├── src/
│   │   │   ├── modules/          # NestJS feature modules
│   │   │   │   └── categories/   # Categories module
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.ts
│   │   │   └── main.ts
│   │   └── libs/                 # Internal libraries (npm packages)
│   │       ├── database/         # @services/database
│   │       │   ├── src/          # Database services & Prisma
│   │       │   ├── prisma/       # Schema & migrations
│   │       │   ├── package.json  # @services/database
│   │       │   └── tsconfig.json
│   │       └── shared/           # @services/shared
│   │           ├── src/          # DTOs, types, utils
│   │           ├── package.json  # @services/shared
│   │           └── tsconfig.json
│   └── frontend/                 # Next.js Frontend
│       ├── src/
│       │   └── app/              # Next.js App Router
│       └── libs/                 # Internal libraries
│           └── shared/           # @frontend/shared
│               ├── src/          # Frontend utilities
│               ├── package.json  # @frontend/shared
│               └── tsconfig.json
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md
│   ├── QUICK_REFERENCE.md
│   ├── RUNNING.md
│   ├── VSCODE_SETUP.md
│   └── postman/                  # API Testing collections
├── docker/                       # Docker configurations
├── scripts/                      # Utility scripts
├── docker-compose.yml            # Development services
├── tsconfig.base.json            # Shared TypeScript config
├── eslint.config.mjs             # Unified ESLint config
└── package.json                  # Monorepo with workspaces
```

## Data Flow

```mermaid
graph TB
    A[Frontend Next.js] --> B[API NestJS]
    B --> C[Prisma ORM]
    C --> D[PostgreSQL]
    B --> E[Redis Cache]

    F[@frontend/shared] --> A
    G[@services/shared] --> B
    H[@services/database] --> B
```

### Import System

The project uses clean import aliases for better maintainability:

```typescript
// Backend imports
import { PrismaService } from '@services/database';
import { CreateCategoryDto } from '@services/shared';

// Frontend imports
import { formatDate } from '@frontend/shared';
```

## Development Patterns

### 1. Monorepo with NPM Workspaces

- Each application and library has its own `package.json`
- Shared dependencies are managed at the root level
- Centralized scripts for easier development
- Automatic linking between workspace packages

### 2. Internal Libraries as NPM Packages

- Each library is a proper npm package with `@services/*` and `@frontend/*` naming
- TypeScript types defined in `apps/*/libs/shared/src`
- DTOs with Zod validation reused within each application
- Consistent interfaces within each application
- Each project maintains its own libraries without cross-dependencies

### 3. Data Layer

- Prisma as main ORM
- Schema centralized in `apps/api/libs/database/prisma`
- Versioned migrations
- Prisma client generated automatically

### 4. Data Validation

- Zod for runtime validation
- Typed and validated DTOs
- Consistent error messages

## Development Configuration

### Environment Variables

- `.env` para cada aplicação
- `env.example` como template
- Secrets gerenciados via GitHub

### Docker for Development

- PostgreSQL e Redis via Docker Compose
- Volumes persistentes para dados
- Health checks configurados

### Hot Reload

- Backend: NestJS com `--watch`
- Frontend: Next.js com Fast Refresh
- Internal libraries: TypeScript com `--watch`

## Deploy and Production

### CI/CD Pipeline

1. **CI**: Testes, lint e build em PRs
2. **Deploy**: Deploy automático em push para main
3. **Migrations**: Executadas automaticamente no deploy

### Deploy Strategy

- Backend: Container ou serverless
- Frontend: CDN (Vercel, Netlify)
- Database: PostgreSQL gerenciado
- Cache: Redis gerenciado

## Security

### Authentication (Futuro)

- JWT tokens
- Refresh tokens
- Middleware de autenticação

### Validation

- Input validation com Zod
- Sanitização de dados
- Rate limiting

### CORS

- Configuração específica por ambiente
- Headers de segurança

## Monitoring

### Logs

- Estruturados com contexto
- Diferentes níveis (debug, info, warn, error)
- Correlação de requests

### Métricas

- Health checks
- Performance monitoring
- Error tracking

## Scalability

### Backend

- Stateless design
- Connection pooling
- Caching strategies

### Frontend

- Static generation onde possível
- Image optimization
- Code splitting

### Database

- Índices otimizados
- Query optimization
- Read replicas (futuro)

# Local Classifieds

Monorepo for the Local Classifieds project - a local classifieds platform.

## 🏗️ Architecture

This project uses a monorepo architecture with the following technologies:

- **Backend**: NestJS + Prisma + PostgreSQL
- **Frontend**: Next.js + TailwindCSS + TypeScript
- **Database**: PostgreSQL (via Docker)
- **Cache**: Redis (via Docker)
- **ORM**: Prisma
- **Validation**: Zod
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
/
├── apps/
│   ├── api/           # Backend NestJS
│   └── frontend/      # Frontend Next.js
├── libs/
│   ├── database/      # Prisma ORM and database configurations
│   └── shared/        # Shared types, DTOs and utilities
├── docs/              # Project documentation
├── docker/            # Docker configurations
├── .github/           # GitHub Actions (CI/CD)
├── docker-compose.yml # Development services
└── package.json       # Monorepo configuration
```

## 🚀 Local Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Docker and Docker Compose

### 1. Clone the repository

```bash
git clone <repository-url>
cd local-classifieds
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup VS Code (Recommended)

Open the project in VS Code and install recommended extensions for the best development experience:

> 💡 **VS Code Setup**: See [VS Code Setup Guide](docs/VSCODE_SETUP.md) for detailed configuration including auto-open markdown preview.

### 4. Configure environment

```bash
# Copy database example file
cp libs/database/env.example libs/database/.env

# Edit variables if necessary
# DATABASE_URL="postgresql://local_user:local_pass@localhost:5432/local_db?schema=public"
```

### 5. Start database services

```bash
# Start PostgreSQL and Redis via Docker
npm run docker:up

# Check if services are running
npm run docker:logs
```

### 6. Configure database

```bash
# Generate Prisma client
npm run db:generate

# Execute migrations
npm run db:migrate

# (Optional) Open Prisma Studio to view data
npm run db:studio
```

### 7. Start development

```bash
# Start everything (Docker + Backend + Frontend)
npm run start:dev

# Or start backend and frontend only (if Docker is already running)
npm run dev

# Or start individually:
npm run dev:api      # Backend on port 3000
npm run dev:frontend # Frontend on port 3001
```

> 📚 \*\*For detailed running instructions, see [docs/RUNNING.md](docs/RUNNING.md)

## 📋 Available Scripts

### Monorepo Scripts

```bash
npm run dev              # Start backend and frontend in parallel
npm run start:dev        # Start everything (Docker + backend + frontend)
npm run build            # Build all applications
npm run lint             # Lint all workspaces
npm run lint:fix         # Lint with automatic fixes
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes
npm run type-check       # TypeScript type checking
npm run test             # Run tests for all workspaces
npm run docker:up        # Start Docker services
npm run docker:down      # Stop Docker services
npm run docker:logs      # View Docker service logs
npm run stop             # Stop all development processes
npm run stop:all         # Stop all development processes (detailed)
npm run stop:api         # Stop backend only
npm run stop:frontend    # Stop frontend only
npm run stop:docker      # Stop Docker services only
```

### Backend Scripts (apps/api)

```bash
npm run dev:api          # Development with hot reload
npm run build:api        # Build for production
npm run start:api        # Start in production
```

### Frontend Scripts (apps/frontend)

```bash
npm run dev:frontend     # Development with hot reload
npm run build:frontend   # Build for production
npm run start:frontend   # Start in production
```

### Database Scripts (libs/database)

```bash
npm run db:generate      # Gera cliente Prisma
npm run db:migrate       # Executa migrações
npm run db:studio        # Abre Prisma Studio
npm run db:deploy        # Deploy de migrações (produção)
npm run db:reset         # Reset database (desenvolvimento)
```

## 🗄️ Banco de Dados

### Available Models

- **User**: System users
- **Post**: Posts/classifieds (exemplo)

### Useful Commands

```bash
# Create new migration
cd libs/database
npx prisma migrate dev --name nome_da_migracao

# Reset database (desenvolvimento)
npm run db:reset

# View data
npm run db:studio
```

## 🔧 Development Configuration

### Environment Variables

#### Backend (apps/api)

```env
DATABASE_URL="postgresql://local_user:local_pass@localhost:5432/local_db?schema=public"
NODE_ENV="development"
PORT=3000
```

#### Frontend (apps/frontend)

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```

### Ports

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:3001
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **Prisma Studio**: http://localhost:5555

## 🧪 Tests and Code Quality

### Lint and Formatting

```bash
# Run lint on entire project
npm run lint

# Fix problems automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without changing
npm run format:check

# Check TypeScript types
npm run type-check

# Run all quality checks (lint + format + types + tests + build)
npm run quality

# Fix quality issues automatically
npm run quality:fix

# Run CI pipeline locally
npm run ci
```

### Tests

```bash
# Run all tests
npm run test

# Tests com coverage
npm run test:cov

# Tests em modo watch
npm run test:watch
```

### Pre-commit Hooks

The project uses Husky to automatically execute comprehensive quality checks:

#### Pre-commit (on every commit):

- **Lint-staged**: ESLint with auto-fix + Prettier formatting
- **TypeScript type check**: Ensures no type errors
- **Build check**: Quick build verification for API and Frontend

#### Pre-push (before pushing):

- **Full lint check**: Complete project linting
- **Format check**: Code formatting verification
- **Type check**: TypeScript type validation
- **All tests**: Complete test suite execution
- **Full build**: Complete application build

#### Commit message validation:

- **Conventional Commits**: Enforces standard commit message format
- **Types**: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert

This ensures that **every commit** passes all quality checks and maintains code standards.

## 🚀 Deploy

### CI/CD

The project uses GitHub Actions for CI/CD:

- **CI**: Executes on push/PR to main/develop
- **Deploy**: Executes on push to main

### Environment Variables (Produção)

Configure the following secrets in GitHub:

- `DATABASE_URL`: Production database URL
- `API_URL`: Production API URL
- `FRONTEND_URL`: Production frontend URL

## 📚 Additional Documentation

### Project Documentation

- [Quick Reference](docs/QUICK_REFERENCE.md) - Most common commands at a glance
- [Running the Project](docs/RUNNING.md) - Comprehensive guide for running the project
- [VS Code Setup](docs/VSCODE_SETUP.md) - Configure VS Code for optimal development experience
- [Architecture Overview](docs/ARCHITECTURE.md) - Project structure and design decisions

### External Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contribution

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the file [LICENSE](LICENSE) for more details.

## 🆘 Support

If you encounter any problems or have questions:

1. Check if all prerequisites are installed
2. Make sure Docker is running
3. Check logs with `npm run docker:logs`
4. Open an issue in the repository

---

**Developed with ❤️ for the local community**

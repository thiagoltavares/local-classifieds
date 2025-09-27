# Local Classifieds API

A NestJS-based API for the Local Classifieds platform, built with TypeScript, Prisma ORM, and PostgreSQL.

## 🏗️ Architecture

This API follows a modular architecture with clear separation of concerns:

```
src/
├── modules/                    # Feature modules
│   └── categories/            # Categories module
│       ├── categories.controller.ts
│       ├── categories.service.ts
│       ├── categories.module.ts
│       ├── dto/               # Data Transfer Objects
│       ├── entities/          # Domain entities
│       └── __tests__/         # Unit tests
├── database/                  # Database layer
│   └── repositories/          # Repository pattern
├── common/                    # Backend-only utilities
│   ├── guards/               # Authentication & authorization
│   ├── filters/              # Exception filters
│   ├── interceptors/         # Request/response interceptors
│   ├── decorators/           # Custom decorators
│   └── pipes/                # Validation pipes
├── config/                   # Configuration
│   ├── app.config.ts
│   ├── database.config.ts
│   └── validation.config.ts
└── libs/                     # Internal libraries
    ├── database/             # Database infrastructure
    └── shared/               # Cross-layer utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate
```

### Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/local_classifieds
API_PREFIX=api
CORS_ORIGIN=http://localhost:3001
CORS_CREDENTIALS=true
```

## 🛠️ Development

```bash
# Start development server with hot reload
npm run start:dev

# Build the application
npm run build

# Start production server
npm run start:prod
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## 🗄️ Database

### Prisma Commands

```bash
# Generate Prisma client
npm run db:generate

# Create and apply migrations
npm run db:migrate

# Reset database
npm run db:reset

# Open Prisma Studio
npm run db:studio

# Deploy migrations to production
npm run db:deploy
```

### Database Schema

The API uses PostgreSQL with Prisma ORM. Key models include:

- **Category**: Hierarchical categories with translations
- **CategoryTranslation**: Multi-language support for categories

## 📚 API Documentation

### Categories API

#### Endpoints

- `GET /categories` - List all categories
- `GET /categories/hierarchy` - Get category hierarchy tree
- `GET /categories/stats` - Get category statistics
- `GET /categories/:id` - Get category by ID
- `GET /categories/slug/:slug` - Get category by slug
- `POST /categories` - Create new category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Soft delete category
- `PUT /categories/:id/restore` - Restore deleted category

#### Example Requests

**Create Category:**
```json
POST /categories
{
  "slug": "electronics",
  "displayOrder": 0,
  "translations": [
    {
      "language": "pt",
      "name": "Eletrônicos",
      "description": "Produtos eletrônicos e tecnologia"
    },
    {
      "language": "en", 
      "name": "Electronics",
      "description": "Electronic products and technology"
    }
  ]
}
```

**Get Categories with Hierarchy:**
```
GET /categories?includeChildren=true&includeInactive=false
```

## 🏛️ Architecture Patterns

### Repository Pattern

The API uses the Repository pattern to abstract database operations:

```typescript
// Service layer
constructor(private categoryRepository: CategoryRepository) {}

// Repository layer
async findById(id: string): Promise<Category | null> {
  return this.prisma.category.findUnique({ where: { id } });
}
```

### DTO Validation

All endpoints use Zod schemas for request validation:

```typescript
export const CreateCategorySchema = z.object({
  slug: z.string().min(1).max(140),
  translations: z.array(CategoryTranslationSchema).min(1),
});
```

### Error Handling

Global exception filters handle errors consistently:

- Validation errors return 400 with detailed messages
- Not found errors return 404
- Server errors return 500 with sanitized messages

## 🔧 Configuration

### App Configuration

```typescript
export const appConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || 'api',
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3001'],
    credentials: process.env.CORS_CREDENTIALS === 'true',
  },
};
```

### Database Configuration

```typescript
export const databaseConfig = {
  url: process.env.DATABASE_URL,
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS || '10', 10),
  connectionTimeout: parseInt(process.env.DATABASE_CONNECTION_TIMEOUT || '10000', 10),
  queryTimeout: parseInt(process.env.DATABASE_QUERY_TIMEOUT || '30000', 10),
};
```

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Docker

```bash
# Build Docker image
docker build -t local-classifieds-api .

# Run container
docker run -p 3000:3000 local-classifieds-api
```

## 📝 Code Style

The project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks
- **lint-staged** for pre-commit checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the [NestJS documentation](https://docs.nestjs.com)
- Join our Discord community
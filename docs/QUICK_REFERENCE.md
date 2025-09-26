# 🚀 Quick Reference

## Most Common Commands

### 🎯 Start Everything

```bash
npm run start:dev    # Start Docker + Backend + Frontend
```

### 🛑 Stop Everything

```bash
npm run stop         # Stop all processes
npm run stop:studio  # Stop Prisma Studio instances
```

### 🔧 Development

```bash
npm run dev          # Backend + Frontend (Docker must be running)
npm run dev:api      # Backend only (port 3000)
npm run dev:frontend # Frontend only (port 3001)
```

### 🐳 Docker

```bash
npm run docker:up    # Start Docker services
npm run docker:down  # Stop Docker services
npm run docker:logs  # View Docker logs
```

### 🗄️ Database

```bash
npm run db:studio    # Open Prisma Studio
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
```

### 🧹 Cleanup

```bash
npm run clean        # Clean all build artifacts
npm run stop:all     # Stop with detailed status
```

## 🌐 URLs

- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:3000
- **Prisma Studio**: http://localhost:5556 (when running)

## 🆘 Troubleshooting

### Port Issues

```bash
npm run stop         # Stop everything
npm run start:dev    # Restart everything
```

### Docker Issues

```bash
npm run docker:down  # Stop Docker
npm run docker:up    # Restart Docker
```

### Database Issues

```bash
npm run db:generate  # Regenerate Prisma client
npm run docker:restart # Restart database
```

---

**For detailed instructions, see [RUNNING.md](RUNNING.md)**

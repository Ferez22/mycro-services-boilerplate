# 🚀 Ze-Mycroservices Boilerplate

A production-ready microservices boilerplate with Next.js frontend, FastAPI backend, and PostgreSQL database.

## ✨ Features

- 🎨 **Next.js 15** with App Router, TypeScript, and Turbopack
- ⚡ **FastAPI** backend with SQLAlchemy ORM
- 🐘 **PostgreSQL** database with Docker
- 🐳 **Multi-stage Docker** builds for optimal image sizes
- 🔄 **Hot-reload** in development mode
- 🔒 **CORS** configured and ready
- 📦 **Package manager agnostic** (npm, yarn, pnpm)
- 🏥 **Health checks** built-in
- 🔐 **Non-root containers** for security

## 🏁 Quick Start

### Prerequisites

- Docker 20.10+ and Docker Compose v2.0+
- Git

### Development Mode (Recommended)

```bash
# Clone and make it your own
rm -rf .git && git init

# Start all services with hot-reload
docker compose up --build

# Services will be available at:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5005
# - Database: localhost:5433
```

### Production Mode

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

## 📁 Project Structure

```
mycro-services-boilerplate/
├── frontend/              # Next.js application
│   ├── src/              # Source code
│   ├── Dockerfile        # Multi-stage build
│   └── DOCKER.md         # Frontend Docker documentation
├── backend/              # FastAPI application
│   ├── app/              # Python application code
│   └── Dockerfile        # Multi-stage build
├── docker-compose.yml            # Base configuration
├── docker-compose.override.yml   # Development overrides
├── docker-compose.prod.yml       # Production overrides
└── TROUBLESHOOTING.md           # Debugging guide
```

## 🛠️ What's Included

### Frontend

- Next.js 15 with standalone output
- TypeScript strict mode
- TailwindCSS v4
- Radix UI components
- Automatic API rewrites to backend
- Development hot-reload

### Backend

- FastAPI with async support
- SQLAlchemy ORM
- PostgreSQL integration
- CORS middleware configured
- Automatic table creation
- Poetry for dependency management

### Database

- PostgreSQL 15
- Persistent volumes
- Easy access for queries

## 🔧 Configuration

### Environment Variables

**Frontend** (`docker-compose.override.yml`):

- `API_URL`: Backend URL for server-side rewrites
- `NEXT_PUBLIC_API_URL`: Backend URL for client-side requests

**Backend** (`docker-compose.override.yml`):

- `DB_HOST`: Database hostname
- `DB_PORT`: Database port
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name

## 🗃️ Database Access

### Via Docker CLI

```bash
docker compose exec postgres-db psql -U postgresadmin -d postgres

# List tables
\dt

# Exit
\q
```

### Via Connection String

```
postgresql://postgresadmin:postgresadmin@localhost:5433/postgres
```

⚠️ **Security**: Use environment variables and strong passwords in production!

## 🐛 Troubleshooting

Having issues? Check the detailed [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) guide which covers:

- ✅ Environment variable issues
- ✅ CORS errors
- ✅ Database connection problems
- ✅ Port conflicts
- ✅ Build failures
- ✅ Health check scripts

### Quick Health Check

```bash
# Check services are running
docker compose ps

# Test backend
curl http://localhost:5005/api/ping

# Test frontend proxy
curl http://localhost:3000/api/ping

# View logs
docker compose logs -f
```

## 📚 Documentation

- [Frontend Docker Setup](./frontend/DOCKER.md) - Detailed Next.js Docker configuration
- [Troubleshooting Guide](./TROUBLESHOOTING.md) - Debug common issues

## 🧹 Cleanup

```bash
# Stop services
docker compose down

# Stop and remove volumes (⚠️ deletes data)
docker compose down -v

# Full cleanup
docker system prune -a --volumes
```

## 🚢 Deployment

### Using Cloudflare Tunnel

The project includes Cloudflare Tunnel configuration for easy public access:

```bash
# Set your tunnel token
export CF_TUNNEL_TOKEN=your-token-here

# Start with tunnel
docker compose up -d
```

### Traditional Deployment

1. Build production images
2. Set environment variables
3. Use `docker-compose.prod.yml` for production configuration
4. Set up reverse proxy (nginx, traefik, etc.)
5. Configure SSL/TLS certificates

## 🤝 Contributing

1. Make your changes
2. Test with `docker compose up --build`
3. Commit and push

## 📝 License

MIT (adjust as needed)

## 🔗 Additional Resources

- [Supabase Self-Hosting](https://supabase.com/docs/guides/self-hosting/docker#before-you-begin)
- [Next.js Docker Docs](https://nextjs.org/docs/deployment#docker-image)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

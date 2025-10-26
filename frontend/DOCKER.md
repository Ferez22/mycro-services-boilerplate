# Next.js Docker Configuration

This Dockerfile is optimized for Next.js applications with support for multiple package managers (npm, yarn, pnpm) and follows production best practices.

## 🏗️ Architecture

The Dockerfile uses a **4-stage multi-stage build**:

1. **deps** - Installs production dependencies only
2. **builder** - Builds the Next.js application
3. **production** - Minimal production image (recommended for deployment)
4. **dev** - Development image with hot-reload support

## 🚀 Usage

### Development Mode

```bash
# Using default docker-compose.yml (targets dev stage)
docker-compose up

# Or build directly
docker build --target dev -t myapp:dev .
docker run -p 3000:3000 -v $(pwd)/src:/app/src myapp:dev
```

### Production Mode

```bash
# Using production compose file
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# Or build directly
docker build --target production -t myapp:prod .
docker run -p 3000:3000 myapp:prod
```

## ✨ Features

### Security

- ✅ Non-root user (`nextjs:nodejs`)
- ✅ Minimal Alpine-based images
- ✅ No unnecessary dependencies in production
- ✅ Proper file permissions with `chown`

### Performance

- ✅ Multi-stage builds (smaller final image)
- ✅ Layer caching optimization
- ✅ Next.js standalone output mode
- ✅ Separate dependency installation stage

### Developer Experience

- ✅ Automatic package manager detection
- ✅ Support for npm, yarn, and pnpm
- ✅ Hot-reload in development mode
- ✅ Health checks included
- ✅ Telemetry disabled

### Reliability

- ✅ Health check endpoint
- ✅ Proper signal handling
- ✅ Graceful shutdown support

## 📦 Image Sizes

Approximate sizes after build:

- **Production**: ~150-200 MB (Alpine-based)
- **Development**: ~800 MB-1 GB (includes dev dependencies)

## 🔧 Configuration

### Environment Variables

The Dockerfile sets these by default:

```dockerfile
NODE_ENV=production          # or development
NEXT_TELEMETRY_DISABLED=1   # Disable Next.js telemetry
PORT=3000                    # Server port
HOSTNAME="0.0.0.0"          # Listen on all interfaces
```

Override them in docker-compose.yml or at runtime:

```yaml
services:
  frontend:
    environment:
      - NEXT_PUBLIC_API_URL=https://api.example.com
      - DATABASE_URL=postgresql://...
```

### Build Arguments

The Dockerfile automatically detects your package manager from lockfiles:

- `yarn.lock` → uses `yarn`
- `package-lock.json` → uses `npm`
- `pnpm-lock.yaml` → uses `pnpm`

### Health Checks

The production image includes a health check that:

- Runs every 30 seconds
- Times out after 3 seconds
- Waits 10 seconds after container start
- Retries 3 times before marking unhealthy

Check health status:

```bash
docker ps  # Shows health status
docker inspect <container-id> | grep Health
```

## 📝 Best Practices Implemented

1. **Standalone Output**: Uses Next.js standalone mode for minimal production bundles
2. **Layer Caching**: Dependencies installed before copying source code
3. **Security**: Runs as non-root user with minimal permissions
4. **Multi-stage**: Separates build and runtime environments
5. **Alpine Linux**: Uses lightweight Alpine images
6. **Package Manager Agnostic**: Works with npm, yarn, or pnpm
7. **.dockerignore**: Excludes unnecessary files from build context

## 🐛 Troubleshooting

### Build fails with "Lockfile not found"

Ensure you have at least one lockfile committed:

- `yarn.lock`
- `package-lock.json`
- `pnpm-lock.yaml`

### Permission errors in production

The production stage runs as user `nextjs` (UID 1001). If you need to write files, ensure proper permissions.

### Static assets not loading

The Dockerfile correctly copies:

- `.next/standalone` → Server files
- `.next/static` → Static assets (JS, CSS)
- `public/` → Public assets (images, fonts)

If assets don't load, verify your `next.config.ts` has:

```typescript
export default {
  output: "standalone",
};
```

### Development hot-reload not working

Ensure you're mounting volumes in development:

```yaml
volumes:
  - ./src:/app/src
  - ./public:/app/public
  - /app/node_modules # Don't override node_modules
```

## 🔄 Updating

When updating Node.js version:

1. Change `FROM node:XX-alpine` in all stages
2. Test builds for both production and dev
3. Update this documentation

Current version: **Node 20 LTS (Alpine)**

## 📚 References

- [Next.js Docker Docs](https://nextjs.org/docs/deployment#docker-image)
- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Next.js Standalone Output](https://nextjs.org/docs/advanced-features/output-file-tracing)

# Troubleshooting Guide

## Quick Fixes Applied

### 1. Environment Variable Mismatch ✅

**Problem**: Docker Compose was setting `API_URL` but Next.js was reading `NEXT_PUBLIC_API_URL`

**Solution**: Updated `next.config.ts` to check both variables:

```typescript
const backendUrl =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5005";
```

### 2. Missing CORS Configuration ✅

**Problem**: FastAPI backend wasn't configured to accept requests from the frontend

**Solution**: Added CORS middleware to `backend/app/main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. Docker Build Targets ✅

**Problem**: Services weren't explicitly targeting the correct build stages

**Solution**: Updated `docker-compose.yml` to use `dev` targets:

- Backend: `target: dev`
- Frontend: `target: dev`

## Testing the Setup

### 1. Rebuild and Start Services

```bash
# Clean rebuild
docker compose down -v
docker compose build --no-cache
docker compose up -d

# Watch logs
docker compose logs -f
```

### 2. Test Backend Connectivity

```bash
# Test ping endpoint
curl http://localhost:5005/api/ping
# Expected: {"status":"ok"}

# Test player endpoint
curl http://localhost:5005/player/players
# Expected: []

# Test root endpoint (shows DB connection)
curl http://localhost:5005/
```

### 3. Test Frontend Connectivity

```bash
# Frontend should be at
open http://localhost:3000

# Check if rewrites are working (via frontend)
curl http://localhost:3000/api/ping
# Should proxy to backend and return: {"status":"ok"}
```

### 4. Create a Player via API

```bash
curl -X POST http://localhost:5005/player/create \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Player","sport":"tennis"}'

# Expected: {"id":1,"name":"Test Player","sport":"tennis","player_id":1}
```

### 5. Create a Player via Frontend

1. Open http://localhost:3000
2. Enter player name and select sport
3. Click create button
4. Player should appear in the list

## Common Issues

### "Cannot connect to backend"

**Check 1: Services Running?**

```bash
docker compose ps
# All services should show "Up" status
```

**Check 2: Network Issues?**

```bash
# Test from frontend container
docker compose exec frontend sh
wget -O- http://backend:5005/api/ping
exit
```

**Check 3: Check logs**

```bash
docker compose logs backend
docker compose logs frontend
```

### "CORS Error in Browser Console"

**Solution**: CORS is now configured in backend. If you still see errors:

1. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)
2. Check backend logs: `docker compose logs backend | grep CORS`
3. Restart backend: `docker compose restart backend`

### "Database Connection Failed"

**Check 1: Postgres Running?**

```bash
docker compose ps postgres-db
```

**Check 2: Check environment variables**

```bash
docker compose exec backend env | grep DB_
# Should show:
# DB_HOST=postgres-db
# DB_PORT=5432
```

**Check 3: Connect to database manually**

```bash
docker compose exec postgres-db psql -U postgresadmin -d postgres
# Run: \dt
# Should show tables including 'players'
```

**Check 4: Recreate database**

```bash
docker compose down -v  # ⚠️ This deletes all data
docker compose up -d
```

### "Port Already in Use"

```bash
# Find what's using the port
lsof -i :3000  # Frontend
lsof -i :5005  # Backend
lsof -i :5433  # Database

# Kill the process or stop other containers
docker compose down
```

### "Module Not Found" in Frontend

```bash
# Rebuild with clean node_modules
docker compose down
docker compose build --no-cache frontend
docker compose up -d
```

### "Build Failed" Errors

**For Frontend**:

```bash
# Check if lockfile exists
ls frontend/yarn.lock

# If using npm, create package-lock.json
cd frontend
npm install
cd ..

# Rebuild
docker compose build frontend
```

**For Backend**:

```bash
# Check if poetry.lock exists
ls backend/poetry.lock

# If missing, create it
cd backend
poetry lock
cd ..

# Rebuild
docker compose build backend
```

## Environment Variables Reference

### Frontend

- `API_URL`: Backend URL for server-side rewrites (e.g., `http://backend:5005`)
- `NEXT_PUBLIC_API_URL`: Client-side backend URL (same as above for consistency)

### Backend

- `DB_HOST`: Database host (e.g., `postgres-db`)
- `DB_PORT`: Database port (e.g., `5432`)
- `DB_USER`: Database user (default: `postgresadmin`)
- `DB_PASSWORD`: Database password (default: `postgresadmin`)
- `DB_NAME`: Database name (default: `postgres`)

## Development vs Production

### Development (default)

```bash
docker compose up
```

- Uses `dev` build targets
- Hot-reload enabled for both frontend and backend
- Source code mounted as volumes
- Debug ports exposed

### Production

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

- Uses `production`/`prod` build targets
- Optimized builds
- No source code mounting
- Runs as non-root user

### "Frontend can't connect to backend with Cloudflare Tunnel"

**Problem**: App is accessible via Cloudflare (e.g., `app.ferez.cloud`) but API calls fail.

**Symptoms**:
- Browser console shows errors connecting to `/api/*` or `/player/*`
- Works locally but not via Cloudflare tunnel
- Backend shows "connection refused" in logs

**Root Cause**: Frontend was configured with `NEXT_PUBLIC_API_URL=http://backend:5005`, which the browser tries to access directly.

**Solution**: Use server-side rewrites (already configured):

1. **Remove client-side backend URL**:
   ```yaml
   # docker-compose.yml and docker-compose.prod.yml
   frontend:
     environment:
       - API_URL=http://backend:5005  # Server-side only
       # DO NOT set NEXT_PUBLIC_API_URL
   ```

2. **Frontend already uses relative URLs** (no changes needed):
   ```typescript
   // ✅ Good - uses server-side rewrites
   fetch('/api/ping')
   fetch('/player/create', { ... })
   
   // ❌ Bad - would try to connect from browser
   fetch('http://backend:5005/api/ping')
   ```

3. **Rebuild on server**:
   ```bash
   docker compose down
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
   ```

4. **Verify rewrites are working**:
   ```bash
   docker compose logs frontend | grep "Backend URL"
   # Should show: Backend URL for server-side rewrites: http://backend:5005
   ```

**How it works**: Browser → Cloudflare → Next.js → rewrites `/api/*` → `backend:5005` internally.

See [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) for complete guide.

## Still Having Issues?

1. **Check Docker version**: `docker --version` (needs 20.10+)
2. **Check Docker Compose version**: `docker compose version` (needs v2.0+)
3. **Clean everything**:
   ```bash
   docker compose down -v
   docker system prune -a --volumes
   docker compose up --build
   ```
4. **Check your firewall/antivirus**
5. **Look at complete logs**:
   ```bash
   docker compose logs > debug.log
   ```

## Quick Health Check Script

Save as `health-check.sh`:

```bash
#!/bin/bash

echo "=== Health Check ==="

echo "\n1. Services Status:"
docker compose ps

echo "\n2. Backend Ping:"
curl -s http://localhost:5005/api/ping

echo "\n3. Frontend via Backend:"
curl -s http://localhost:3000/api/ping

echo "\n4. Database Connection:"
docker compose exec -T postgres-db psql -U postgresadmin -d postgres -c "\dt" 2>/dev/null || echo "DB connection failed"

echo "\n5. Backend Logs (last 10 lines):"
docker compose logs --tail 10 backend

echo "\n=== Health Check Complete ==="
```

Run it:

```bash
chmod +x health-check.sh
./health-check.sh
```

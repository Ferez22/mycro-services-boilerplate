# 🚀 Deployment Cheat Sheet

Quick reference for deploying and managing your microservices.

## 📋 Pre-Deployment Checklist

```bash
# 1. Copy environment template
cp env.example .env

# 2. Edit with your values
nano .env  # or vim, code, etc.

# 3. Verify configuration
docker compose config

# 4. Check you have your tunnel token
grep CF_TUNNEL_TOKEN .env
```

## 🎯 Deployment Commands

### First Time Deployment

```bash
# On your server
cd /opt/mycro-services-boilerplate

# Build and start in production mode
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# Watch logs
docker compose logs -f

# Verify all services are up
docker compose ps
```

### Update Deployment

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# Check logs for errors
docker compose logs --tail 100
```

### Rollback

```bash
# Go back to previous version
git checkout HEAD~1

# Rebuild
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

## 🔍 Monitoring Commands

### Check Status

```bash
# See all running services
docker compose ps

# Check service health
docker inspect mycro-services-boilerplate-frontend-1 | grep -A 10 Health

# See resource usage
docker stats
```

### View Logs

```bash
# All services, follow mode
docker compose logs -f

# Specific service
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f cloudflared

# Last N lines
docker compose logs --tail 50 backend

# Since timestamp
docker compose logs --since 2024-01-01T12:00:00

# Save to file
docker compose logs > logs_$(date +%Y%m%d_%H%M%S).txt
```

## 🔧 Maintenance Commands

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart frontend
docker compose restart backend

# Restart with rebuild
docker compose up --build -d frontend
```

### Stop/Start

```bash
# Stop all
docker compose stop

# Start all
docker compose start

# Stop and remove (keeps volumes)
docker compose down

# Stop and remove everything including volumes (⚠️ deletes data!)
docker compose down -v
```

### Database Operations

```bash
# Connect to database
docker compose exec postgres-db psql -U postgresadmin -d postgres

# Inside psql:
\dt              # List tables
\d players       # Describe table
SELECT * FROM players;  # Query data
\q               # Exit

# Backup database
docker compose exec postgres-db pg_dump -U postgresadmin postgres > backup_$(date +%Y%m%d).sql

# Restore database
docker compose exec -T postgres-db psql -U postgresadmin postgres < backup_20240101.sql

# Reset database (⚠️ deletes all data!)
docker compose down -v
docker compose up -d postgres-db
```

## 🧹 Cleanup Commands

```bash
# Remove old images
docker image prune -a

# Remove unused volumes
docker volume prune

# Full system cleanup (⚠️ aggressive!)
docker system prune -a --volumes

# Remove only this project's resources
docker compose down -v
docker volume rm mycro-services-boilerplate_postgres_data
```

## 🐛 Quick Debugging

### Test Backend Connection

```bash
# From server
curl http://localhost:5005/api/ping

# From frontend container
docker compose exec frontend wget -O- http://backend:5005/api/ping

# From backend container
docker compose exec backend curl http://localhost:5005/api/ping
```

### Check Environment Variables

```bash
# Backend
docker compose exec backend env | grep DB_

# Frontend
docker compose exec frontend env | grep API_

# All
docker compose config
```

### Shell Access

```bash
# Frontend (Alpine)
docker compose exec frontend sh

# Backend (Debian)
docker compose exec backend bash

# Database
docker compose exec postgres-db bash
```

### Network Debugging

```bash
# Test DNS resolution
docker compose exec frontend nslookup backend
docker compose exec frontend ping -c 3 backend

# Check listening ports inside container
docker compose exec backend netstat -tulpn
```

## 📊 Health Check Script

Save as `health.sh`:

```bash
#!/bin/bash
echo "=== Service Status ==="
docker compose ps

echo -e "\n=== Backend Health ==="
curl -s http://localhost:5005/api/ping || echo "❌ Backend not responding"

echo -e "\n=== Database Connection ==="
docker compose exec -T postgres-db pg_isready -U postgresadmin || echo "❌ Database not ready"

echo -e "\n=== Cloudflare Tunnel ==="
docker compose logs --tail 5 cloudflared | grep -i "registered\|error" || echo "⚠️  Check cloudflared logs"

echo -e "\n=== Disk Usage ==="
df -h | grep -E "Filesystem|/$"

echo -e "\n=== Docker Disk Usage ==="
docker system df
```

Run it:
```bash
chmod +x health.sh
./health.sh
```

## 🔐 Security Commands

### Update Passwords

```bash
# 1. Stop services
docker compose down

# 2. Update .env file
nano .env
# Change DB_PASSWORD

# 3. Remove old database volume
docker volume rm mycro-services-boilerplate_postgres_data

# 4. Start fresh
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Check Exposed Ports

```bash
# On server
sudo netstat -tulpn | grep docker

# Should only see:
# - Port 5433 (database, for admin access)
# - Port 80/443 via Cloudflare (if configured)

# Backend port 5005 should NOT be exposed
```

## 📈 Performance Optimization

### View Resource Usage

```bash
# Real-time stats
docker stats

# Memory usage
docker compose ps -q | xargs docker stats --no-stream

# Disk usage per service
docker compose ps -q | xargs docker inspect -f '{{ .Name }}: {{ .SizeRootFs }}' 
```

### Optimize Images

```bash
# Rebuild without cache
docker compose build --no-cache

# Remove dangling images
docker image prune

# See largest images
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" | sort -k 3 -h
```

## 🔄 CI/CD Integration

### Simple Deploy Script

Save as `deploy.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Pull latest
git pull origin main

# Load environment
export $(cat .env | xargs)

# Build and deploy
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# Wait for services
echo "⏳ Waiting for services..."
sleep 10

# Health check
if curl -f http://localhost:5005/api/ping > /dev/null 2>&1; then
  echo "✅ Deployment successful!"
else
  echo "❌ Deployment failed - backend not responding"
  docker compose logs backend
  exit 1
fi
```

## 🆘 Emergency Commands

### Site Down - Quick Recovery

```bash
# 1. Check what's wrong
docker compose ps
docker compose logs --tail 50

# 2. Try restarting
docker compose restart

# 3. If that fails, rebuild
docker compose down
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# 4. Still failing? Check server resources
df -h
free -h
top
```

### Out of Disk Space

```bash
# Emergency cleanup
docker system prune -a --volumes
journalctl --vacuum-time=3d
sudo apt autoremove
```

## 📞 Quick Reference URLs

- **Production Site**: https://app.ferez.cloud
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **Cloudflare Tunnels**: https://one.dash.cloudflare.com/
- **This Server**: ssh user@your-server-ip

## 📚 Documentation Links

- [Full Cloudflare Guide](./CLOUDFLARE_DEPLOYMENT.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [Frontend Docker Docs](./frontend/DOCKER.md)
- [Main README](./README.md)

---

**Pro Tip**: Bookmark this page or save it to your notes for quick access during deployments!


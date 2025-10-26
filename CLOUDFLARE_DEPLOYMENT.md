# 🚀 Cloudflare Tunnel Deployment Guide

This guide explains how to deploy your microservices boilerplate using Cloudflare Tunnels for secure public access.

## 🌐 How It Works

```
User's Browser (app.ferez.cloud)
    ↓
Cloudflare Network
    ↓
Cloudflare Tunnel (cloudflared container)
    ↓
Frontend Container (Next.js) :3000
    ↓ (via server-side rewrites)
Backend Container (FastAPI) :5005
    ↓
PostgreSQL Container :5432
```

**Key Points:**
- ✅ Only the **frontend** is exposed via Cloudflare Tunnel
- ✅ The **backend** stays internal (only accessible via Docker network)
- ✅ Browser makes requests to `/api/*` and `/player/*` (relative URLs)
- ✅ Next.js server proxies these to `http://backend:5005` internally
- ✅ No CORS issues, no exposed backend ports

## 📋 Prerequisites

1. **Cloudflare Account** with Zero Trust access
2. **Domain** pointed to Cloudflare DNS
3. **Server** with Docker & Docker Compose installed
4. **SSH Access** to your server

## 🛠️ Setup Steps

### 1. Create Cloudflare Tunnel

#### Via Cloudflare Dashboard:

1. Go to [Cloudflare Zero Trust](https://one.dash.cloudflare.com/)
2. Navigate to **Access** → **Tunnels**
3. Click **Create a tunnel**
4. Choose **Cloudflared**
5. Name it (e.g., `mycro-services`)
6. Copy the **tunnel token** (you'll need this!)

#### Via CLI (Alternative):

```bash
# Install cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Login and create tunnel
cloudflared tunnel login
cloudflared tunnel create mycro-services

# Get the token
cloudflared tunnel token mycro-services
```

### 2. Configure Public Hostname

In Cloudflare Dashboard → **Tunnels** → Your tunnel:

1. Click **Configure**
2. Go to **Public Hostnames** tab
3. Click **Add a public hostname**
4. Configure:
   - **Subdomain**: `app` (or whatever you want)
   - **Domain**: `ferez.cloud` (your domain)
   - **Service**: 
     - Type: `HTTP`
     - URL: `frontend:3000`
5. Save

This creates `app.ferez.cloud` → `frontend:3000`

### 3. Deploy to Server

#### SSH into your server:

```bash
ssh user@your-server-ip
```

#### Clone your repository:

```bash
cd /opt  # or wherever you want
git clone https://github.com/yourusername/your-repo.git
cd your-repo/mycro-services-boilerplate
```

#### Set the tunnel token:

```bash
# Create .env file
cat > .env << EOF
CF_TUNNEL_TOKEN=your_tunnel_token_here
EOF
```

**Important:** Keep this token secure! Add `.env` to `.gitignore`.

#### Deploy with production configuration:

```bash
# Build and start all services
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# Check status
docker compose ps

# View logs
docker compose logs -f
```

### 4. Verify Deployment

#### Check all services are running:

```bash
docker compose ps
```

Expected output:
```
NAME                          STATUS
mycro-...-backend-1          Up
mycro-...-cloudflared-1      Up
mycro-...-frontend-1         Up
mycro-...-postgres-db-1      Up
```

#### Test backend internally:

```bash
# From server, test backend
docker compose exec frontend wget -O- http://backend:5005/api/ping

# Should return: {"status":"ok"}
```

#### Test from your browser:

1. Go to `https://app.ferez.cloud`
2. You should see the frontend
3. Try creating a player
4. Check browser dev tools (F12) → Network tab
5. You should see successful requests to `/api/*` and `/player/*`

## 🔧 Configuration Files

### docker-compose.yml (Base)

```yaml
services:
  frontend:
    environment:
      - API_URL=http://backend:5005  # Server-side only
    # No NEXT_PUBLIC_API_URL needed!
    
  cloudflared:
    environment:
      - TUNNEL_TOKEN=$CF_TUNNEL_TOKEN
    depends_on:
      - frontend
    networks:
      - app-net
```

### Why No NEXT_PUBLIC_API_URL?

- `NEXT_PUBLIC_*` vars are **embedded in browser JS** at build time
- Setting `NEXT_PUBLIC_API_URL=http://backend:5005` would make browsers try to reach `backend:5005` (impossible!)
- Instead, we use **relative URLs** (`/api/*`) that are **proxied server-side** by Next.js rewrites

### How Rewrites Work

In `next.config.ts`:

```typescript
async rewrites() {
  const backendUrl = process.env.API_URL || "http://localhost:5005";
  
  return [
    {
      source: "/api/:path*",
      destination: `${backendUrl}/api/:path*`,
    }
  ];
}
```

When browser requests `https://app.ferez.cloud/api/ping`:
1. Request goes to Next.js server (via Cloudflare tunnel)
2. Next.js sees the rewrite rule
3. Next.js makes internal request to `http://backend:5005/api/ping`
4. Returns response to browser
5. Browser never knows about the internal backend URL!

## 🔐 Security Best Practices

### 1. Use Environment Variables for Secrets

```bash
# On server, create .env file
cat > .env << EOF
CF_TUNNEL_TOKEN=your_token
DB_PASSWORD=strong_password_here
DB_USER=secure_user
EOF

# Set permissions
chmod 600 .env
```

### 2. Update docker-compose.prod.yml:

```yaml
services:
  postgres-db:
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
  
  backend:
    environment:
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
```

### 3. Configure CORS Properly

In production, update `backend/app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.ferez.cloud"],  # Specific domain only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4. Don't Expose Backend Port

In production, the backend should NOT expose port 5005 externally:

```yaml
# docker-compose.prod.yml
services:
  backend:
    # No ports section! Only accessible internally
    networks:
      - app-net
```

## 📊 Monitoring & Maintenance

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f cloudflared

# Last 100 lines
docker compose logs --tail 100
```

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart frontend
```

### Update Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# Clean old images
docker image prune -a
```

### Database Backup

```bash
# Backup
docker compose exec postgres-db pg_dump -U postgresadmin postgres > backup.sql

# Restore
docker compose exec -T postgres-db psql -U postgresadmin postgres < backup.sql
```

## 🐛 Troubleshooting

### "Cannot connect to backend" in browser

**Problem**: Browser shows errors connecting to API.

**Check**:
1. Are you using relative URLs? (`/api/*` not `http://backend:5005/api/*`)
2. Check browser Network tab - should show requests to `/api/*`
3. Check backend logs: `docker compose logs backend`

**Fix**: Ensure `NEXT_PUBLIC_API_URL` is NOT set, so frontend uses relative URLs.

### "Tunnel disconnected" or "502 Bad Gateway"

**Problem**: Cloudflare tunnel isn't connecting.

**Check**:
```bash
docker compose logs cloudflared
```

**Common causes**:
- Invalid tunnel token
- Frontend container not running
- Network issues

**Fix**:
```bash
# Verify token
docker compose config | grep CF_TUNNEL_TOKEN

# Restart tunnel
docker compose restart cloudflared
```

### Backend can't connect to database

**Problem**: Backend logs show database connection errors.

**Check**:
```bash
docker compose logs backend | grep -i error
docker compose ps postgres-db
```

**Fix**:
```bash
# Check environment variables
docker compose exec backend env | grep DB_

# Should show:
# DB_HOST=postgres-db
# DB_PORT=5432
```

### Changes not reflecting

**Problem**: Code changes don't appear on the site.

**Fix**:
```bash
# Full rebuild
docker compose down
docker compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🚀 Advanced: Multiple Environments

### Staging + Production

Create separate tunnel tokens and domains:

**Staging:**
- Domain: `staging.ferez.cloud`
- Token: `CF_TUNNEL_TOKEN_STAGING`

**Production:**
- Domain: `app.ferez.cloud`
- Token: `CF_TUNNEL_TOKEN_PROD`

Deploy both:

```bash
# Staging
CF_TUNNEL_TOKEN=$CF_TUNNEL_TOKEN_STAGING docker compose up -d

# Production
CF_TUNNEL_TOKEN=$CF_TUNNEL_TOKEN_PROD docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 📚 Additional Resources

- [Cloudflare Tunnel Documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Next.js Rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## ✅ Checklist

Before going to production:

- [ ] Cloudflare tunnel created and configured
- [ ] Domain DNS pointed to Cloudflare
- [ ] Tunnel token set securely
- [ ] Database credentials changed from defaults
- [ ] CORS configured for specific domain
- [ ] Backend port NOT exposed publicly
- [ ] SSL/TLS enabled (automatic with Cloudflare)
- [ ] Environment variables secured
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Tested player creation from public URL

---

**Your setup is now production-ready! 🎉**

For issues or questions, refer to [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).


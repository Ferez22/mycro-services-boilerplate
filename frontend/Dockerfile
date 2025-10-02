# Base image (Debian, safer for Next.js deps)
FROM node:18 as base
WORKDIR /app
COPY package*.json ./
EXPOSE 3000


# Builder (builds Next.js)
FROM base as builder
RUN npm install
COPY . .
RUN npm run build


# Production
FROM node:18-slim as production
WORKDIR /app
ENV NODE_ENV=production

# Install only prod deps
COPY package*.json ./
RUN npm ci --only=production

# Copy build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Create non-root user
RUN addgroup --system nodejs && adduser --system nextjs
USER nextjs

CMD ["npm", "start"]


# Development
FROM base as dev
ENV NODE_ENV=development

RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
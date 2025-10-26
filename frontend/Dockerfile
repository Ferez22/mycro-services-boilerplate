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

# Copy standalone output from builder
COPY --from=builder /app/.next/standalone ./

# Create non-root user
RUN addgroup --system nodejs && adduser --system nextjs
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]


# Development
FROM base as dev
ENV NODE_ENV=development

# Install dependencies
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
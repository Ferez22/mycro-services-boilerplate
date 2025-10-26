# Base image (Debian, safer for Next.js deps)
FROM node:18 as base
WORKDIR /app
COPY package*.json ./
EXPOSE 3000


# Builder (builds Next.js)
FROM base as builder
RUN npm install

# Copy source files and config files
COPY src ./src
COPY public ./public
COPY next.config.ts ./
COPY tsconfig.json ./
COPY components.json ./
COPY postcss.config.mjs ./
COPY eslint.config.mjs ./

# Clean up any existing build artifacts or problematic directories
RUN rm -rf .next next-env.d.ts

# Run the build - this will generate next-env.d.ts correctly
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
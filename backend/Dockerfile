# Use Debian slim (glibc + OpenSSL 3) so Prisma engines work out of the box
FROM node:20-bookworm-slim

WORKDIR /app

# Basic deps (openssl gives you libssl3; ca-certs for HTTPS; git often handy)
RUN apt-get update -y \
 && apt-get install -y --no-install-recommends \
      openssl ca-certificates git \
 && rm -rf /var/lib/apt/lists/*

# Install deps with lockfile for reproducibility
COPY package*.json ./
RUN npm ci

# If you use Prisma, generate the client (safe to run even if you don't)
COPY prisma ./prisma
RUN npx prisma generate || echo "No Prisma schema found; skipping generate."

# Bring in the rest
COPY . .

ENV NODE_ENV=development
# Your app logs that it listens on 3010
ENV PORT=3010
EXPOSE 3010

# nodemon + ts-node (from your package.json "dev" script)
CMD ["npm", "run", "dev"]

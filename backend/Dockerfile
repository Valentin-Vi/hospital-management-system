# Dev container with hot reload (nodemon + ts-node)
FROM node:20-alpine

WORKDIR /app

# Install deps first for better layer caching
COPY package*.json ./
RUN npm ci

# If you have Prisma schema, copy it before the rest so "generate" can cache
# (If you don't use Prisma, these two lines are harmless.)
COPY prisma ./prisma
RUN npx prisma generate || echo "No Prisma schema found; skipping generate."

# Bring the rest of the source
COPY . .

ENV NODE_ENV=development
EXPOSE 3000

# nodemon watches ./src from inside the container; we’ll mount a volume in compose
CMD ["npm", "run", "dev"]

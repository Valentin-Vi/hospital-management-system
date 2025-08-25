# Dev container running Vite on 0.0.0.0 so it’s reachable from host
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Ensure Vite binds to all interfaces
ENV HOST=0.0.0.0
EXPOSE 5173

# Pass --host so HMR works from host browser
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

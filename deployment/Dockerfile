# Use official Node image
FROM node:18-alpine

# Install OpenSSL
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app
# Copy .env file
COPY .env .

# Copy package files
COPY package*.json ./

# Copy Prisma schema
# Copy Prisma files จาก infrastructure
COPY src/infrastructure/prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Copy all source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "run", "start:prod"]
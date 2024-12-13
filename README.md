# Project Name

## Description
A brief description of your NestJS project. Explain what your project does and its main features.

## Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- NestJS CLI (`npm i -g @nestjs/cli`)
- Docker and Docker Compose
- Prisma CLI

## Database Setup

1. Start the database using Docker:
```bash
# Navigate to the infrastructure directory
cd src/infrastructure

# Start Docker containers in detached mode
docker compose up -d
```

2. Set up Prisma and run migrations:
```bash
# Navigate to infrastructure directory
cd infrastructure

# Run Prisma migrations
npx prisma migrate dev

# Return to root directory
cd ..
```

3. Seed the database:
```bash
# Run the database seeding script
npm run zeed
```

## Installation

```bash


# Install dependencies
npm install
``` 


## Deploy 

```bash
cd deployment/
cd terraform
```

## SET ENV in  terraform.tfvars 

```bash
example::
database_url   = 
vpc_id         = 
subnet_ids     = 
security_group_ids = 
environment = "dev" =
```

```bash
terraform init
terraform apply

```

[Rest of README remains the same...]

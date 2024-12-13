# Project Name

## Description
A brief description of your NestJS project. Explain what your project does and its main features.

## Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- NestJS CLI (`npm i -g @nestjs/cli`)
- Docker and Docker Compose
- Prisma CLI


## Example DIAGRAM detail
<a href="https://ibb.co/47TX2h3"><img src="https://i.ibb.co/FKwyXRC/Screenshot-2567-12-13-at-18-37-51.png" alt="Screenshot-2567-12-13-at-18-37-51" border="0"></a><br /><a target='_blank' href='https://nonprofitlight.com/tn/memphis/hutchison-school'>hutchison school</a><br />

## Database Setup

1. Start the database using Docker:
```bash
in directory
# Start Docker containers in detached mode
docker compose up -d
```

2. Set up Prisma and run migrations:
```bash
# Navigate to infrastructure directory
cd src/infrastructure

# Run Prisma migrations
npx prisma migrate dev

# Return to root directory
cd ..
```

3. Seed the database :
## set product 4 product
```bash
# Run the database seeding script
npm run zeed
```

## Installation

```bash

# Install dependencies
npm install
nest start 
``` 


##SWAGGER FOR NEST JS 
<a href="https://ibb.co/R4sdwBd"><img src="https://i.ibb.co/fGyLwnL/screencapture-localhost-6500-api-2024-12-13-19-35-33.png" alt="screencapture-localhost-6500-api-2024-12-13-19-35-33" border="0"></a>

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

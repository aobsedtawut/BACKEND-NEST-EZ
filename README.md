# Project Name

## Description
A brief description of your NestJS project. Explain what your project does and its main features.

## Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- NestJS CLI (`npm i -g @nestjs/cli`)
- Docker and Docker Compose
- AWS CLI configured
- Prisma CLI


## Example DIAGRAM detail
<a href="https://ibb.co/47TX2h3"><img src="https://i.ibb.co/FKwyXRC/Screenshot-2567-12-13-at-18-37-51.png" alt="Screenshot-2567-12-13-at-18-37-51" border="0"></a><br /><a target='_blank' href='https://nonprofitlight.com/tn/memphis/hutchison-school'>hutchison school</a><br />



0. Set up environment variables:

```bash
cp .env.example .env
```

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

## API Documentation
Swagger documentation is available at /api when running in development mode.

##SWAGGER FOR NEST JS 
<a href="https://ibb.co/R4sdwBd"><img src="https://i.ibb.co/fGyLwnL/screencapture-localhost-6500-api-2024-12-13-19-35-33.png" alt="screencapture-localhost-6500-api-2024-12-13-19-35-33" border="0"></a>


## GO TO DEPLOYMENT
```bash
cd deployment/
```


Production Deployment

Configure AWS credentials:

```bash
aws configure
```

Set up Terraform variables:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Initialize Terraform:

```bash
terraform init
```

Deploy infrastructure:

```bash
terraform apply
```

Infrastructure Configuration
AWS Resources

- ECS Fargate Cluster
- Application Load Balancer
- RDS PostgreSQL Instance
- VPC and Networking components
- IAM Roles and Policies

## Terraform Variables
Required variables in terraform.tfvars:

```bash
aws_region = "ap-southeast-1"
app_name = "nest-js-ez-backend"
environment = "dev"
vpc_id = "vpc-xxxxx"
subnet_ids = ["subnet-xxxx", "subnet-yyyy"]
security_group_ids = ["sg-xxxx"]
```

##Security

- JWT-based authentication
- HTTPS encryption
- VPC security groups
- IAM roles with least privilege
- Secrets management with AWS Secrets Manager


##Troubleshooting
Common Issues

1. Database Connection Issues

  - Check VPC security groups
  - Verify database credentials
  - Ensure proper network connectivity


2. Deployment Failures

  - Check ECS task logs in CloudWatch
  - Verify ECR image availability
  - Check IAM roles and permissions


3. Performance Issues

  - Monitor CloudWatch metrics
  - Check database query performance
  - Review application logs


License
MIT
Support
For support, please open an issue in the repository or contact the development team.


[Rest of README remains the same...]

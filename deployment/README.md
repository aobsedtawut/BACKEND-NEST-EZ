## Deployment

## Prerequisites

- Docker
- AWS CLI configured
- Terraform
- Node.js and npm

## AWS Deployment Steps

1. Build and push Docker image:

```bash
# Login to ECR
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 787959421214.dkr.ecr.ap-southeast-1.amazonaws.com

# Build ,Tag image and push Docker image
docker build -t nest-js-ez-backend -f deployment/Dockerfile .
docker tag nest-js-ez-backend:latest 787959421214.dkr.ecr.ap-southeast-1.amazonaws.com/nest-js-ez-backend:latest
docker push 787959421214.dkr.ecr.ap-southeast-1.amazonaws.com/nest-js-ez-backend:latest
```

2. Deploy with Terraform:

```bash
cd deployment/terraform
terraform init
terraform plan
terraform apply
```

## Environment Variables

Required environment variables:

- DATABASE_URL
- JWT_SECRET
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

## Resources

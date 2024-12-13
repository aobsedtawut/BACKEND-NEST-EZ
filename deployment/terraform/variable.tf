variable "aws_access_key" {
  description = "AWS access key"
  type        = string
  sensitive   = true
}

variable "aws_secret_key" {
  description = "AWS secret key"
  type        = string
  sensitive   = true
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "database_url" {
  description = "PostgreSQL database URL"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret key"
  type        = string
  sensitive   = true
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs"
  type        = list(string)
}

variable "security_group_ids" {
  description = "List of security group IDs"
  type        = list(string)
}

variable "app_name" {
  description = "Application name"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
}
variable "cpu" {
  description = "CPU units for the ECS task (1024 = 1 vCPU)"
  type        = number
  default     = 256  # Common value for small applications
}

variable "memory" {
  description = "Memory (in MiB) for the ECS task"
  type        = number
  default     = 512  # Common value for small applications
}


variable "allowed_cidr_blocks" {
  description = "List of CIDR blocks allowed to access the ECS tasks"
  type        = list(string)
  default     = ["0.0.0.0/0"]  # Warning: This allows access from anywhere. Restrict this in production
}

variable "instance_count" {
  description = "Number of instances of the task to run"
  type        = number
  default     = 1  # Default to 1 instance, adjust based on your needs
}

variable "desired_count" {
  description = "Desired number of tasks to run"
  type        = number
  default     = 1  # Default to 1 task, adjust based on your needs
}
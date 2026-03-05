terraform {
  required_version = ">= 1.0.0"

  backend "s3" {
    bucket = "trenecitos-terraform-state-211125610418"
    key    = "aws/terraform.tfstate"
    region = "us-east-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

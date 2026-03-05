# Justfile for Trenecitos deployments
# Install 'just' from https://github.com/casey/just to use these commands

# List all available commands
default:
    @just --list

# ===============
# AWS Environment
# ===============

# Initialize AWS Terraform backend
init-aws:
    cd terraform/aws && terraform init

# Plan AWS infrastructure
plan-aws:
    cd terraform/aws && terraform plan

# Deploy infrastructure to AWS
deploy-aws:
    cd terraform/aws && terraform apply

# Destroys AWS infrastructure (Caution!)
destroy-aws:
    cd terraform/aws && terraform destroy

# View the actual public IP for the AWS deployment
ip-aws:
    cd terraform/aws && terraform output vm_public_ip

# =================
# Local Environment (KVM)
# =================

# Initialize Local (KVM) Terraform
init-local:
    cd terraform/kvm && terraform init

# Plan Local infrastructure
plan-local:
    cd terraform/kvm && terraform plan

# Deploy infrastructure locally
deploy-local:
    cd terraform/kvm && terraform apply

# Destroys Local infrastructure
destroy-local:
    cd terraform/kvm && terraform destroy

# View the actual public IP for the Local deployment
ip-local:
    cd terraform/kvm && terraform output ip

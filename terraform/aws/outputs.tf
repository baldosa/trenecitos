output "vm_public_ip" {
  description = "La direccion IP publica de la Maquina Virtual"
  value       = aws_instance.app_vm.public_ip
}

output "ecr_repository_url" {
  description = "The URL of the ECR repository"
  value       = data.aws_ecr_repository.app_repo.repository_url
}

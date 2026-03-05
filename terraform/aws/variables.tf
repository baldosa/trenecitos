variable "region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Name of the application"
  type        = string
  default     = "trenecitos"
}

variable "container_port" {
  description = "Port the container listens on"
  type        = number
  default     = 80
}

variable "lightsail_power" {
  description = "Power specification for the Lightsail instance"
  type        = string
  default     = "nano"
}

variable "lightsail_scale" {
  description = "Number of instances"
  type        = number
  default     = 1
}

resource "libvirt_volume" "ubuntu_base" {
  name   = "ubuntu-base.qcow2"
  source = var.qcow2_image
  format = "qcow2"
}

resource "libvirt_volume" "os_image" {
  name           = "os_image.qcow2"
  pool           = "default"
  base_volume_id = libvirt_volume.ubuntu_base.id
  format         = "qcow2"
  size           = 10737418240 # 10 GB
}

resource "libvirt_cloudinit_disk" "commoninit" {
  name = "commoninit.iso"
  user_data = <<EOF
#cloud-config
hostname: ${var.hostname}
manage_etc_hosts: true
users:
  - name: ubuntu
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: users, admin
    home: /home/ubuntu
    shell: /bin/bash
    lock_passwd: false
    passwd: "ubuntu"
    ssh-authorized-keys:
      - "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH8GM1jWTnHcZPxv0/WtqLtPtFL7DvI3Qgui7MJxD/jc charlie@camba.coop"
package_update: true
packages:
  - docker.io
  - git
runcmd:
  - systemctl start docker
  - systemctl enable docker
  - git clone https://github.com/cuococarlos/trenecitos.git /opt/trenecitos
  - cd /opt/trenecitos && docker build -t trenecitos-app .
  - docker run -d -p 80:80 --name trenecitos trenecitos-app
EOF
}

resource "libvirt_network" "trenecitos_net" {
  name      = "trenecitos-net"
  mode      = "nat"
  domain    = "trenecitos.local"
  addresses = ["10.17.3.0/24"]
  dhcp {
    enabled = true
  }
  dns {
    enabled = true
  }
}

resource "libvirt_domain" "domain-ubuntu" {
  name   = var.hostname
  memory = var.memory
  vcpu   = var.vcpu

  cloudinit = libvirt_cloudinit_disk.commoninit.id

  network_interface {
    network_id     = libvirt_network.trenecitos_net.id
    wait_for_lease = true
  }

  console {
    type        = "pty"
    target_port = "0"
    target_type = "serial"
  }

  console {
    type        = "pty"
    target_type = "virtio"
    target_port = "1"
  }

  disk {
    volume_id = libvirt_volume.os_image.id
  }

  graphics {
    type        = "spice"
    listen_type = "address"
    autoport    = true
  }
}

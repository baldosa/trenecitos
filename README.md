# Trenecitos - Aplicación Web y CI/CD

Este repositorio contiene el código fuente para el frontend de "Trenecitos", desarrollado con **Vue 3** y **Vite**, junto con toda la infraestructura como código (IaC) y flujos de despliegue continuo (CI/CD).

---

## 🛠️ Dependencias Necesarias

Para poder operar el proyecto tanto a nivel de desarrollo web como a nivel de despliegue de infraestructura, necesitarás instalar las siguientes herramientas en tu sistema operativo:

### 1. Desarrollo Frontend

- **[Node.js](https://nodejs.org/)** (Recomendado: v23 o superior)
- **[npm](https://www.npmjs.com/)** (Gestor de paquetes, incluido con Node.js)

### 2. Infraestructura y Despliegue (DevOps)

- **[Terraform](https://developer.hashicorp.com/terraform/downloads)** (v1.0.0 o superior): Para el aprovisionamiento de infraestructura.
- **[AWS CLI](https://aws.amazon.com/cli/)**: Configurarlo con tus credenciales (`aws configure`) para poder desplegar a la nube de Amazon.
- **[Just](https://github.com/casey/just)**: Un ejecutor de comandos (_command runner_) diseñado para simplificar tareas. Es vital para operar los atajos descritos más abajo.
- **[Docker](https://www.docker.com/)**: Para construir y probar las imágenes empaquetadas de la aplicación web locálmente si fuese necesario.
- **KVM / Libvirt (Opcional):** Solo si deseas aprovisionar la infraestructura local (VMs) en entornos Linux.

---

## 🚀 Puesta en Marcha (Desarrollo Local)

Para correr únicamente el servidor de desarrollo de la web:

```sh
# 1. Instalar las dependencias de Vue/Node
npm install

# 2. Levantar servidor con Hot-Reloading
npm run dev
```

Las versiones compiladas para producción se generan localmente usando `npm run build`.

---

## ⚙️ Comandos de Despliegue (Justfile)

Dado que operar Terraform y manejar múltiples entornos (`aws` y `kvm`) suele implicar usar comandos largos para navegar por directorios, hemos implementado un **`justfile`** en la raíz. Solo hace falta tener `just` instalado y escribir el comando que desees en tu terminal:

### ☁️ Comandos para Amazon AWS

Estos comandos utilizan `terraform/aws` para aplicar cambios en la nube:

| Comando            | Descripción de lo que hace internamente                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `just init-aws`    | Navega al directorio AWS e inicializa Terraform configurando su estado en S3.                               |
| `just plan-aws`    | Te muestra una simulación de los recursos que **se crearán, modificarán o eliminarán** en tu cuenta de AWS. |
| `just deploy-aws`  | Efectúa el comando explícito de creación de infraestructurara en EC2 (`apply`).                             |
| `just destroy-aws` | **¡Precaución!** Destruye completamente tu máquina virtual y los elementos del Security Group/IAM en AWS.   |
| `just ip-aws`      | Devuelve rápidamente la **dirección IP pública** asignada a tu instancia EC2.                               |

### 💻 Comandos para Entorno Local (KVM)

Estos comandos utilizan `terraform/kvm` para modelar servidores virtualizados localmente (usualmente en Linux usando libvirt):

| Comando              | Descripción de lo que hace internamente                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `just init-local`    | Inicializa el directorio de trabajo local para el KVM _provider_.                                                                                                 |
| `just plan-local`    | Muestra el plan de ejecución de la máquina virtual que se creará localmente.                                                                                      |
| `just deploy-local`  | Aprovisiona localmente la VM (Ubuntu), instala dependencias, _clona este repositorio_ y construye la imagen Docker dentro de la propia VM aislando la aplicación. |
| `just destroy-local` | Borra la máquina virtual de tu entorno KVM y recupera tu disco local.                                                                                             |
| `just ip-local`      | Imprime la **dirección IP privada** asignada internamente a la máquina local donde el servidor web quedó operando en el puerto 80.                                |

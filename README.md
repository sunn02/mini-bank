
# Banking Admin Panel

## Índice

* [Descripción](#descripción)
* [Funcionalidades](#funcionalidades)
* [Tecnologías](#tecnologías)
* [Instalación y Ejecución Local](#instalación-y-ejecución-local)
  * [Backend (Mock)](#backend-mock)
  * [Frontend](#frontend)
* [Despliegue Público](#despliegue-público)
* [Endpoints Disponibles](#endpoints-disponibles-backend)
* [Preview](#preview)

---

## Descripción

Este proyecto es un **panel de administración para un sistema bancario**, desarrollado como trabajo final para un **bootcamp de Angular**.

Cuenta con **auth guards** que protegen rutas mediante un login, permitiendo solo a usuarios autenticados acceder al panel.

El backend es un **mock** que simula una API de cuentas, clientes, bancos, monedas y transferencias, ya que no se dispone de un backend real ni base de datos. Fue creado para replicar la API que el bootcamp proporcionaba.

Para acceder al panel de administración:

* **Usuario:** admin
* **Contraseña:** 1234


---

## Funcionalidades

* Login con protección de rutas mediante **Angular Auth Guards**.
* Gestión de **clientes**, **cuentas**, **bancos**, **monedas** y **transferencias**.
* Crear, editar y eliminar cuentas, clientes y bancos.
* Visualizar información detallada de cuentas y transferencias.
* Interfaz de administración con **tablas y formularios dinámicos**.
* Uso de **mock API** para simular el backend.

---

## Tecnologías

**Frontend:**

* Angular
* TypeScript
* SCSS
* PrimeNG / PrimeIcons

**Backend (Mock):**

* Node.js + Express
* JSON estático simulado como API

---

## Instalación y Ejecución Local

### Backend (Mock)

El backend se encuentra dentro de la carpeta `mini-bank-backend` (o similar) y sirve datos desde JSON:

```bash
cd mini-bank-backend
npm install
npm start
```

### Frontend

```bash
cd mini-bank-frontend
npm install
ng serve
```

---

## Despliegue Público

* **Frontend:** [Vercel](https://mini-bank-frontend-mcg42sw6y-sols-projects-7ccaabab.vercel.app/)
* **Backend:** [Render](https://mini-bank-3rgy.onrender.com)

---

## Endpoints Disponibles (Backend Mock)

| Método | Endpoint            | Descripción                      |
| ------ | ------------------- | -------------------------------- |
| GET    | `/accounts`     | Obtener todas las cuentas        |
| POST   | `/accounts`     | Crear una nueva cuenta           |
| PUT    | `/accounts/:id` | Editar una cuenta existente      |
| DELETE | `/accounts/:id` | Eliminar una cuenta por ID       |
| GET    | `/customers`    | Obtener todos los clientes       |
| POST   | `/customer`     | Crear una nuevo cliente           |
| PUT    | `/customer/:id` | Editar un cliente existente      |
| DELETE | `/customer/:id` | Eliminar un cliente por ID       |
| GET    | `/banks`        | Obtener todos los bancos         |
| POST   | `/bank`     | Crear un nuevo banco           |
| PUT    | `/bank/:id` | Editar un banco existente      |
| DELETE | `/bank/:id` | Eliminar un banco por ID       |
| GET    | `/currencies`   | Obtener todas las monedas        |
| GET    | `/transfers`    | Obtener todas las transferencias |

---
## Preview
[![image.png](https://i.postimg.cc/yNYHcwkv/image.png)](https://postimg.cc/Xrhm01KC)
[![image.png](https://i.postimg.cc/BQswj28C/image.png)](https://postimg.cc/hhy0wz1J)

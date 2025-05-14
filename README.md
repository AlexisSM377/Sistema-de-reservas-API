# 📦 Backend - Sistema de Reservas

Este es el backend del sistema de reservas desarrollado con **Node.js**, **Express.js** y **PostgreSQL**, el cual permite gestionar reservas de espacios por empleados y su aprobación por parte de administradores.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL
- JWT (autenticación)
- Zod (validación)
- Bcrypt (hash de contraseñas)
- CORS y cookies para sesión segura

---

## 📁 Estructura del proyecto

src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── schemas/
├── config.js
└── server.js


---

## ⚙️ Configuración inicial
1. Clona el repositorio:
   ```bash
   git clone https://github.com/AlexisSM377/Sistema-de-reservas-API.git
    cd Sistema-de-reservas-API
    ```
2. Instala las dependencias:
3. ```bash
   npm install
   ```
4. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:
   ```bash
    PORT=4000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_DATABASE=tu_base_de_datos
    JWT_SECRET=tu_secreto_jwt
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```
5. Asegúrate de tener PostgreSQL instalado y ejecutándose en tu máquina.
6. Crea la base de datos y las tablas necesarias. Puedes usar el archivo `schema.sql` proporcionado en el repositorio para crear la estructura inicial de la base de datos.

7. Inicia el servidor:
   ```bash
   npm run dev
   ```

## 🔐 Autenticación

Login (POST /api/auth/login)

Logout (GET /api/auth/logout)

Usuario actual (GET /api/auth/me)

Se usa JWT + cookies seguras

--- 🧾 Rutas principales

| Método   | Ruta                           | Descripción                             |
| -------- | ------------------------------ | --------------------------------------- |
| `POST`   | `/api/usuarios`                | Registrar usuario                       |
| `GET`    | `/api/reservas`                | Ver todas las reservas (admin)          |
| `POST`   | `/api/reservas`                | Crear una nueva reserva                 |
| `DELETE` | `/api/reservas/:id`            | Cancelar reserva                        |
| `PUT`    | `/api/reservas/:id/estado`     | Cambiar estado: Aprobada, Rechazada     |
| `GET`    | `/api/reservas/mis-reservas`   | Ver reservas propias                    |
| `GET`    | `/api/reservas/disponibilidad` | Ver disponibilidad por espacio y fecha  |
| `GET`    | `/api/historial/:id_reserva`   | Ver historial de cambios de una reserva |

## ✅ Funcionalidades destacadas

Validación con Zod

Middleware de autenticación y autorización por rol

Historial de cambios para cada reserva

Soft delete (cancelación) en lugar de eliminación

Gestión de espacios y departamentos
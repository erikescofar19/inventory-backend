## Leer en: [Español](README.es.md) | [English](README.md)

## Inventory API

API REST para la gestión de inventarios con autenticación JWT, control de stock y registro de movimientos de entrada y salida.

Este proyecto simula un sistema real de inventarios utilizado en negocios como cafeterías, tiendas y pequeños almacenes.

## Tecnologías utilizadas

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Token)  
- Swagger (OpenAPI 3.0)  
- dotenv  
- bcryptjs  

## Estructura del proyecto

```bash
inventory-backend/
├── src/
│   ├── controllers/
│   │   ├── product.controller.js
│   │   ├── user.controller.js
│   │   └── stockMovement.controller.js
│   ├── routes/
│   │   ├── product.routes.js
│   │   ├── user.routes.js
│   │   └── stockMovement.routes.js
│   ├── models/
│   │   ├── product.js
│   │   ├── user.js
│   │   └── stockMovement.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── admin.middleware.js
│   ├── config/
│   │   └── swagger.js
│   └── app.js
├── server.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── README.es.md
```

## Autenticación

La API utiliza autenticación JWT (Bearer Token).

Flujo básico:

Inicia sesión:
POST /api/users/login

Obtén el token JWT

Usa el token en los endpoints protegidos:
Authorization: Bearer TU_TOKEN_AQUI

## Roles y permisos

 Admin

Crear, actualizar y eliminar productos

Registrar movimientos de entrada y salida de stock

Consultar el historial completo de movimientos

## Usuario

Consultar productos

Consultar historial de movimientos

## Endpoints principales

###  Users

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/users/register | Registrar usuario |
| POST | /api/users/login | Iniciar sesión y obtener token |

---

###  Products

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/products | Obtener producto por ID |
| GET | /api/products/:id | Obtener producto por ID |
| GET | /api/products/alerts/low-stock | Productos con stock bajo |
| POST | /api/products | Crear producto (admin) |
| PUT | /api/products/:id | Actualizar producto (admin) |
| DELETE | /api/products/:id | Eliminar producto (admin) |

---

###  Stock Movements

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/stock | Registrar entrada o salida de stock |
| GET | /api/stock | Historial de movimientos de stock |


### Ejemplo de movimiento de stock

```json

{
  "product": "65f123abc456def789012345",
  "type": "out",
  "quantity": 2,
  "note": "Venta mostrador"
}


- Reglas de negocio

- No se permite stock negativo

- El campo type solo acepta: in o out

- Los endpoints protegidos requieren un token JWT

- El stock se actualiza automáticamente al registrar movimientos

### Documentación Swagger

Disponible en:

http://localhost:4000/api-docs

Desde Swagger puedes:

Probar endpoints

Autenticarte con JWT

Ver esquemas y respuestas

### Variables de entorno (.env)

PORT=4000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto

### Cómo ejecutar el proyecto

npm install
npm run dev


Servidor disponible en:

http://localhost:4000

### Estado del proyecto

- Funcional
- Seguro
- Documentado
- Listo para portafolio

### Autor

Erik Eduardo Escobar Farias

Proyecto backend desarrollado como práctica profesional utilizando Node.js, MongoDB y APIs REST, enfocado en arquitectura limpia, seguridad y reglas de negocio reales.
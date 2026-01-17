📦 Inventory API

API REST para gestión de inventario con autenticación JWT, control de stock y registro de movimientos de entrada y salida.

Este proyecto simula un sistema real de inventarios usado en negocios como cafeterías, tiendas o almacenes.

🚀 Tecnologías utilizadas

Node.js

Express.js

MongoDB + Mongoose

JWT (JSON Web Token)

Swagger (OpenAPI 3.0)

dotenv

bcryptjs

📂 Estructura del proyecto
inventory-backend/
│
├── controllers/
│   ├── product.controller.js
│   ├── user.controller.js
│   └── stockMovement.controller.js
│
├── routes/
│   ├── product.routes.js
│   ├── user.routes.js
│   └── stockMovement.routes.js
│
├── models/
│   ├── Product.js
│   ├── User.js
│   └── StockMovement.js
│
├── middlewares/
│   ├── auth.middleware.js
│   └── admin.middleware.js
│
├── swagger.js
├── app.js
├── server.js
└── README.md

🔐 Autenticación

La API utiliza JWT Bearer Token.

Inicia sesión en /api/users/login

Obtén el token

Usa el token en los endpoints protegidos:

Authorization: Bearer TU_TOKEN_AQUI

👤 Roles

admin

Crear, actualizar y eliminar productos

Registrar movimientos de stock

usuario

Consultar productos

Consultar historial de movimientos

📌 Endpoints principales
🧑 Usuarios
Método	Endpoint	Descripción
POST	/api/users/register	Registrar usuario
POST	/api/users/login	Login y obtener token
📦 Productos
Método	Endpoint	Descripción
GET	/api/products	Obtener todos los productos
GET	/api/products/:id	Obtener producto por ID
GET	/api/products/alerts/low-stock	Productos con stock bajo
POST	/api/products	Crear producto (admin)
PUT	/api/products/:id	Actualizar producto (admin)
DELETE	/api/products/:id	Eliminar producto (admin)
🔄 Movimientos de Stock
Método	Endpoint	Descripción
POST	/api/stock	Registrar entrada o salida
GET	/api/stock	Historial de movimientos
🧾 Ejemplo de movimiento de stock
{
  "productId": "65f123abc456def789012345",
  "type": "out",
  "quantity": 2,
  "note": "Venta mostrador"
}

📊 Reglas de negocio

❌ No se permite stock negativo

✅ type solo acepta: in o out

🔐 Endpoints protegidos requieren token

🧠 El stock se actualiza automáticamente al registrar movimientos

📖 Documentación Swagger

Disponible en:

http://localhost:4000/api-docs


Desde Swagger puedes:

Probar endpoints

Autenticarte con JWT

Ver esquemas y respuestas

⚙️ Variables de entorno (.env)
PORT=4000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto

▶️ Cómo ejecutar el proyecto
npm install
npm run dev


Servidor disponible en:

http://localhost:4000

🏁 Estado del proyecto

✅ Funcional
✅ Seguro
✅ Documentado
✅ Listo para portafolio

👨‍💻 Autor

EDERICK (Ed)
Proyecto backend desarrollado como práctica profesional de Node.js, MongoDB y APIs REST.
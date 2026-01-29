## Read this in: [English](README.md) | [Español](README.es.md)

## Inventory API

REST API for inventory management with JWT authentication, stock control, and input/output stock movement tracking.

This project simulates a real-world inventory system used in businesses such as cafés, retail stores, and small warehouses.

## Technologies Used

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Token)  
- Swagger (OpenAPI 3.0)  
- dotenv  
- bcryptjs  

## Project Structure

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

## Authentication

The API uses JWT Bearer Token authentication.

Basic flow:

1. Login:
   POST /api/users/login

2. Obtain the JWT token

3. Use the token in protected endpoints:
   Authorization: Bearer YOUR_TOKEN_HERE

## Roles & Permissions

 Admin

- Create, update, and delete products  
- Register stock input and output movements  
- View full movement history  

## User

- View products  
- View stock movement history  

## Main Endpoints

##  Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/users/register | Register user |
| POST   | /api/users/login    | Login and obtain token |

---

##  Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/products | Get all products |
| GET    | /api/products/:id | Get product by ID |
| GET    | /api/products/alerts/low-stock | Low stock alerts |
| POST   | /api/products | Create product (admin) |
| PUT    | /api/products/:id | Update product (admin) |
| DELETE | /api/products/:id | Delete product (admin) |

---

##  Stock Movements

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/stock | Register stock input or output |
| GET    | /api/stock | Stock movement history |


## Stock Movement Example

```json
{
  "product": "65f123abc456def789012345",
  "type": "out",
  "quantity": 2,
  "note": "Counter sale"
}
- Business Rules

- Negative stock is not allowed

- type only accepts: in or out

- Protected endpoints require a JWT token

- Stock is automatically updated when movements are registered

- Swagger Documentation

Available at:

http://localhost:4000/api-docs

From Swagger you can:

Test endpoints

Authenticate using JWT

View schemas and responses

## Environment Variables (.env)

PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

## How to Run the Project

bash
Copiar código
npm install
npm run dev
Server available at:

http://localhost:4000

## Project Status

- Functional
- Secure
- Documented
- Portfolio-ready

## Author

Erik Eduardo Escobar Farías

Backend project developed as professional practice using Node.js, MongoDB, and REST APIs, focused on clean architecture, security, and real-world business rules.

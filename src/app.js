import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import stockMovementRoutes from "./routes/stockMovement.routes.js";

const app = express();

// ======================
// 🔥 MIDDLEWARES GLOBALES
// ======================

// JSON PRIMERO (MUY BIEN HECHO)
app.use(express.json({ limit: "10mb" }));

// Manejo de JSON mal formado
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "JSON mal formado" });
  }
  next();
});

// ======================
// 📘 SWAGGER
// ======================
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======================
// 🛣️ RUTAS
// ======================
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stock", stockMovementRoutes);

// ======================
// 🧪 ROOT
// ======================
app.get("/", (req, res) => {
  res.send("API funcionando");
});

export default app;

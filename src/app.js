import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import stockMovementRoutes from "./routes/stockMovement.routes.js";

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

// ======================
// SWAGGER
// ======================
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======================
// RUTAS
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stock-movements", stockMovementRoutes);

// ======================
// ROOT
// ======================
app.get("/", (req, res) => {
  res.send("API funcionando");
});

export default app;
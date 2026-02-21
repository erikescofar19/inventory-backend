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
// CORS CONFIG
// ======================
const allowedOrigins = [
  "http://localhost:5174", // desarrollo local
  "https://inventory-frontend-eight-pink.vercel.app", // producción Vercel
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir requests sin origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ======================
// MIDDLEWARES
// ======================
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

import { Router } from "express";
import {
  createStockMovement,
  getStockMovements,
} from "../controllers/stockMovement.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: StockMovements
 *   description: Movimientos de inventario (entradas y salidas)
 */

/**
 * @swagger
 * /api/stock:
 *   post:
 *     summary: Registrar movimiento de stock (entrada o salida)
 *     tags: [StockMovements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - type
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID del producto
 *               type:
 *                 type: string
 *                 enum: [in, out]
 *                 example: in
 *               quantity:
 *                 type: number
 *                 example: 5
 *               note:
 *                 type: string
 *                 example: Compra a proveedor
 *     responses:
 *       201:
 *         description: Movimiento registrado correctamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para administradores
 */
// ✅ Ruta protegida con authMiddleware + isAdmin
router.post("/", authMiddleware, isAdmin, createStockMovement);

/**
 * @swagger
 * /api/stock:
 *   get:
 *     summary: Obtener historial de movimientos de stock
 *     tags: [StockMovements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: product
 *         schema:
 *           type: string
 *         description: Filtrar por ID de producto
 *     responses:
 *       200:
 *         description: Lista de movimientos
 *       401:
 *         description: No autorizado
 */
// ✅ Ruta protegida solo con authMiddleware (todos los usuarios pueden ver el historial)
router.get("/", authMiddleware, getStockMovements);

export default router;


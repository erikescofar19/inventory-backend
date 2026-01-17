import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
} from "../controllers/product.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/alerts/low-stock:
 *   get:
 *     summary: Obtener productos con stock bajo
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Productos con stock bajo
 *       401:
 *         description: No autorizado
 */
router.get(
  "/alerts/low-stock",
  authMiddleware,
  isAdmin,
  getLowStockProducts
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post("/", authMiddleware, isAdmin, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, isAdmin, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

export default router;

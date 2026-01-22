import { Router } from "express";
import { registerUser, loginUser, assignAdminRole } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación y registro de usuarios
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Erik
 *               email:
 *                 type: string
 *                 example: erik@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: erik@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/users/{id}/assign-admin:
 *   patch:
 *     summary: Asignar rol de admin a un usuario
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     responses:
 *       200:
 *         description: Rol de admin asignado correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo administradores pueden asignar roles
 *       404:
 *         description: Usuario no encontrado
 */
// ✅ Ruta protegida: solo admin puede asignar rol
router.patch("/:id/assign-admin", authMiddleware, isAdmin, assignAdminRole);

export default router;

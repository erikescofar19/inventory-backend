import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";

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

export default router;

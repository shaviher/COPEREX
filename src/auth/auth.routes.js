import { Router } from 'express';
import { loginValidator } from '../middlewares/validar-auth.js';
import { login } from './auth.controller.js';

const router = Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *               email:
 *                 type: string
 *                  description: The user's email
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/login', loginValidator, login)

export default router
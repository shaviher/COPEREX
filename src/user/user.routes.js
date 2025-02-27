import { Router } from 'express';
import { loginValidator } from '../middlewares/validar-user.js';
import { login } from './user.controller.js';

const router = Router()

router.post('/login', loginValidator, login)

export default router
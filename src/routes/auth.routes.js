import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import authenticate from '../middlewares/auth.middleware.js'
import validate from '../middlewares/validate.middleware.js'
import { loginSchema } from '../schemas/user.schema.js'

const router = Router()
router.post('/login', validate(loginSchema), AuthController.login)
router.get('/me', authenticate, AuthController.me)
router.post('/logout', AuthController.logout)

export default router

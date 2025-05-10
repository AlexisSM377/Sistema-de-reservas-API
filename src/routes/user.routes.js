import { Router } from 'express'
import UserController from '../controllers/user.controller.js'
import validate from '../middlewares/validate.middleware.js'
import { createUserSchema } from '../schemas/user.schema.js'

const router = Router()

router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)
router.post('/', validate(createUserSchema), UserController.create)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)

export default router

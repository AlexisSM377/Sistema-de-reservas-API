import { Router } from 'express'
import SpaceController from '../controllers/space.controller.js'
import validate from '../middlewares/validate.middleware.js'
import { createSpaceSchema, updateSpaceSchema } from '../schemas/space.schema.js'

const router = Router()

router.get('/', SpaceController.getAll)
router.get('/:id', SpaceController.getById)
router.post('/', validate(createSpaceSchema), SpaceController.create)
router.put('/:id', validate(updateSpaceSchema), SpaceController.update)
router.delete('/:id', SpaceController.delete)

export default router

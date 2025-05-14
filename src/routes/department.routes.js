import { Router } from 'express'
import DepartmentController from '../controllers/department.controller.js'

const router = Router()

router.get('/', DepartmentController.getAll)

export default router

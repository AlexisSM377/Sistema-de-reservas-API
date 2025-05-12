import { Router } from 'express'
import HistoryController from '../controllers/history.controller.js'

const router = Router()

router.get('/', HistoryController.getAll)
router.get('/:id_reserva', HistoryController.getByReserva)

export default router

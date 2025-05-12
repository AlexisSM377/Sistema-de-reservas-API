import { Router } from 'express'
import ReservationController from '../controllers/reservation.controller.js'
import validate from '../middlewares/validate.middleware.js'
import { createReservationSchema, updateEstadoSchema } from '../schemas/reservation.schema.js'
import authenticate from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', ReservationController.getAll)
router.get('/:folio', ReservationController.getByFolio)
router.post('/', validate(createReservationSchema), ReservationController.create)
router.put('/:id/estado', authenticate, validate(updateEstadoSchema), ReservationController.updateEstado)
router.delete('/:id', ReservationController.cancelar)

export default router

import { Router } from 'express'
import ReservationController from '../controllers/reservation.controller.js'
import validate from '../middlewares/validate.middleware.js'
import { createReservationSchema, updateEstadoSchema } from '../schemas/reservation.schema.js'
import authenticate from '../middlewares/auth.middleware.js'
import authorizeRoles from '../middlewares/role.middleware.js'

const router = Router()

router.get('/', ReservationController.getAll)
router.get('/mis-reservas', authenticate, ReservationController.getByUser)
router.get('/disponibilidad', authenticate, ReservationController.getDisponibilidad)
router.get('/:folio', ReservationController.getByFolio)
router.post('/', validate(createReservationSchema), ReservationController.create)
router.put('/:id/estado', authenticate, authorizeRoles(['Administrador']), validate(updateEstadoSchema), ReservationController.updateEstado)
router.delete('/:id', authenticate, authorizeRoles(['Administrador']), ReservationController.cancelar)

export default router

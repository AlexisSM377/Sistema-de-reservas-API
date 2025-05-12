import HistoryModel from '../models/history.model.js'
import ReservationModel from '../models/reservation.model.js'

const ReservationController = {
  async getAll (req, res) {
    const reservations = await ReservationModel.getAll()
    res.json(reservations)
  },

  async getByFolio (req, res) {
    const reservation = await ReservationModel.getByFolio(req.params.folio)
    if (!reservation) return res.status(404).json({ error: 'Reserva no encontrada' })
    res.json(reservation)
  },

  async create (req, res) {
    const reservation = await ReservationModel.create(req.body)
    res.status(201).json(reservation)
  },

  async updateEstado (req, res) {
    const { id } = req.params
    const { estado } = req.body
    const userId = req.user.id

    const reserva = await ReservationModel.updateEstado(id, estado)
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' })

    await HistoryModel.registrarCambio({
      id_reserva: reserva.id,
      id_usuario: userId,
      accion_realizada: estado // "aprobada", "rechazada"
    })

    res.json({ message: `Reserva ${estado}`, reserva })
  },

  async cancelar (req, res) {
    const { id } = req.params
    const userId = req.user.id // Asume que ya estás autenticando con JWT

    const reserva = await ReservationModel.cancelar(id)
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' })

    await HistoryModel.registrarCambio({
      id_reserva: reserva.id,
      id_usuario: userId,
      accion_realizada: 'Modificación'
    })

    res.json({ message: 'Reserva cancelada', reserva })
  }

}

export default ReservationController

import HistoryModel from '../models/history.model.js'
import ReservationModel from '../models/reservation.model.js'

const ReservationController = {
  async getAll (req, res) {
    const reservations = await ReservationModel.getAll()
    res.json(reservations)
  },

  async getByUser (req, res) {
    try {
      const reservas = await ReservationModel.findByUserId(req.user.id)
      res.json(reservas)
    } catch (error) {
      console.error('Error al obtener reservas del usuario:', error)
      res.status(500).json({ error: 'Error al obtener tus reservas' })
    }
  },

  async getDisponibilidad (req, res) {
    const { id_espacio, fecha } = req.query

    if (!id_espacio || !fecha) {
      return res.status(400).json({ error: 'Falta id_espacio o fecha en la consulta' })
    }

    try {
      const bloques = await ReservationModel.findDisponibilidad(id_espacio, fecha)
      res.json(bloques)
    } catch (err) {
      console.error('Error al obtener disponibilidad:', err)
      res.status(500).json({ error: 'Error al consultar disponibilidad' })
    }
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
      accion_realizada: 'Cancelada'
    })

    res.json({ message: 'Reserva cancelada', reserva })
  }

}

export default ReservationController

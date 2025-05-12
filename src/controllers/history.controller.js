import HistoryModel from '../models/history.model.js'

const HistoryController = {
  async getAll (req, res) {
    try {
      const history = await HistoryModel.getAll()
      res.json(history)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el historial de cambios' })
    }
  },

  async getByReserva (req, res) {
    try {
      const history = await HistoryModel.getByReserva(req.params.id_reserva)
      if (!history) return res.status(404).json({ error: 'No se encontró el historial de cambios para esta reserva' })
      res.json(history)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el historial de cambios' })
    }
  }
}

export default HistoryController

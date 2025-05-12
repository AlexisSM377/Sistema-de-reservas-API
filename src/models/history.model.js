import { pool } from '../db.js'

const HistoryModel = {
  async getAll () {
    const res = await pool.query('SELECT * FROM historial_cambios ORDER BY fecha_cambio DESC')
    return res.rows
  },

  async getByReserva (id_reserva) {
    const res = await pool.query('SELECT * FROM historial_cambios WHERE id_reserva = $1 ORDER BY fecha_cambio DESC', [id_reserva])
    return res.rows
  },

  async registrarCambio ({ id_reserva, id_usuario, accion_realizada }) {
    const res = await pool.query(`
      INSERT INTO historial_cambios (id, id_reserva, id_usuario, accion_realizada)
      VALUES (uuid_generate_v4(), $1, $2, $3)
      RETURNING *;
    `, [id_reserva, id_usuario, accion_realizada])

    return res.rows[0]
  }
}

export default HistoryModel

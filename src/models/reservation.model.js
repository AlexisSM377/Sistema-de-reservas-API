import { pool } from '../db.js'

const ReservationModel = {
  async getAll () {
    const res = await pool.query('SELECT * FROM reserva ORDER BY fecha_reserva DESC')
    return res.rows
  },

  async getByFolio (folio) {
    const res = await pool.query('SELECT * FROM reserva WHERE folio_reserva = $1', [folio])
    return res.rows[0]
  },

  async create (data) {
    const {
      folio_reserva, fecha_reserva, hora_inicio, hora_final,
      descripcion, estado, id_usuario, id_espacio, id_departamento
    } = data

    const res = await pool.query(`
      INSERT INTO reserva (
        id, folio_reserva, fecha_reserva, hora_inicio, hora_final,
        descripcion, estado, id_usuario, id_espacio, id_departamento
      )
      VALUES (
        uuid_generate_v4(), $1, $2, $3, $4,
        $5, $6, $7, $8, $9
      )
      RETURNING *
    `, [
      folio_reserva, fecha_reserva, hora_inicio, hora_final,
      descripcion, estado, id_usuario, id_espacio, id_departamento
    ])

    return res.rows[0]
  },

  async updateEstado (id, estado) {
    const res = await pool.query(`
      UPDATE reserva SET estado = $1 WHERE id = $2 RETURNING *;
    `, [estado, id])
    return res.rows[0]
  },

  async cancelar (id) {
    const res = await pool.query(`
    UPDATE reserva SET estado = 'Cancelada' WHERE id = $1 RETURNING *;
  `, [id])
    return res.rows[0]
  }
}

export default ReservationModel

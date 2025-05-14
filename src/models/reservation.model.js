import { pool } from '../db.js'

const ReservationModel = {
  async getAll () {
    const res = await pool.query(`
    SELECT 
      r.id,
      r.folio_reserva,
      r.fecha_reserva,
      r.hora_inicio,
      r.hora_final,
      r.estado,
      r.descripcion,
      u.nombre AS nombre_usuario,
      e.nombre AS nombre_espacio,
      d.nombre AS nombre_departamento
      FROM reserva r
      JOIN usuarios u ON r.id_usuario = u.id
      JOIN espacio e ON r.id_espacio = e.id
      JOIN departamento d ON r.id_departamento = d.id
      ORDER BY r.fecha_reserva DESC
  `, [])
    return res.rows
  },

  async findByUserId (userId) {
    const res = await pool.query(`
    SELECT 
      r.id,
      r.folio_reserva,
      r.fecha_reserva,
      r.hora_inicio,
      r.hora_final,
      r.descripcion,
      r.estado,
      e.nombre AS nombre_espacio,
      d.nombre AS nombre_departamento
    FROM reserva r
    JOIN espacio e ON r.id_espacio = e.id
    JOIN departamento d ON r.id_departamento = d.id
    WHERE r.id_usuario = $1
    ORDER BY r.fecha_reserva DESC
  `, [userId])

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

  async findDisponibilidad (idEspacio, fecha) {
    const res = await pool.query(`
    SELECT hora_inicio, hora_final
    FROM reserva
    WHERE id_espacio = $1
      AND fecha_reserva = $2
      AND estado != 'Cancelada'
  `, [idEspacio, fecha])
    return res.rows
  },

  async cancelar (id) {
    const res = await pool.query(`
    UPDATE reserva SET estado = 'Cancelada' WHERE id = $1 RETURNING *;
  `, [id])
    return res.rows[0]
  }
}

export default ReservationModel

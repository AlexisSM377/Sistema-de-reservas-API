import { pool } from '../db.js'

const SpaceModel = {
  async getAll () {
    const res = await pool.query('SELECT * FROM espacio ORDER BY nombre ASC')
    return res.rows
  },

  async getById (id) {
    const res = await pool.query('SELECT * FROM espacio WHERE id = $1', [id])
    return res.rows[0]
  },
  async existsByNombre (nombre) {
    const res = await pool.query('SELECT 1 FROM espacio WHERE nombre = $1', [nombre])
    return res.rowCount > 0
  },

  async create ({ nombre, capacidad, descripcion }) {
    const res = await pool.query(
      `INSERT INTO espacio (id, nombre, capacidad, descripcion)
       VALUES (uuid_generate_v4(), $1, $2, $3)
       RETURNING *`,
      [nombre, capacidad, descripcion]
    )
    return res.rows[0]
  },

  async update (id, { nombre, capacidad, descripcion }) {
    const res = await pool.query(
      `UPDATE espacio
       SET nombre = $1, capacidad = $2, descripcion = $3
       WHERE id = $4
       RETURNING *`,
      [nombre, capacidad, descripcion, id]
    )
    return res.rows[0]
  },

  async delete (id) {
    await pool.query('DELETE FROM espacio WHERE id = $1', [id])
  }
}

export default SpaceModel

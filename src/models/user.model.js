import { pool } from '../db.js'
import bcrypt from 'bcrypt'

const UserModel = {
  async getAll () {
    const res = await pool.query('SELECT * FROM usuarios')
    return res.rows
  },

  async getById (id) {
    const res = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id])
    return res.rows[0]
  },

  async create ({ nombre, email, password, telefono, id_rol }) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const res = await pool.query(
      `INSERT INTO usuarios (id, nombre, email, password, telefono, id_rol)
       VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre, email, hashedPassword, telefono, id_rol]
    )
    return res.rows[0]
  },

  async update (id, { nombre, email, password, telefono, id_rol }) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const res = await pool.query(
      `UPDATE usuarios
       SET nombre = $1, email = $2, password = $3, telefono = $4, id_rol = $5
       WHERE id = $6
       RETURNING *`,
      [nombre, email, hashedPassword, telefono, id_rol, id]
    )
    return res.rows[0]
  },

  async findByEmail (email) {
    const res = await pool.query(`
    SELECT u.id, u.nombre, u.email, u.password, r.nombre AS rol
    FROM usuarios u
    JOIN roles r ON r.id = u.id_rol
    WHERE u.email = $1
  `, [email])
    return res.rows[0]
  },

  async delete (id) {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id])
  }
}

export default UserModel

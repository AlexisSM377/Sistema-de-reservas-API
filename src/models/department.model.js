import { pool } from '../db.js'

const DepartmentModel = {
  async getAll () {
    const res = await pool.query('SELECT * FROM departamento ORDER BY nombre ASC')
    return res.rows
  }
}

export default DepartmentModel

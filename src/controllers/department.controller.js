import DepartmentModel from '../models/department.model.js'

const DepartmentController = {
  async getAll (req, res) {
    try {
      const departments = await DepartmentModel.getAll()
      res.json(departments)
    } catch (error) {
      console.error('Error al obtener los departamentos:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

export default DepartmentController

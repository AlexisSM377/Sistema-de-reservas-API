import UserModel from '../models/user.model.js'

const UserController = {
  async getAll (req, res) {
    const users = await UserModel.getAll()
    res.json(users)
  },

  async getById (req, res) {
    try {
      const user = await UserModel.getById(req.params.id)
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
      res.json(user)
    } catch (error) {
      if (error.message.includes('sintaxis de entrada no es válida para tipo uuid')) {
        return res.status(400).json({ error: 'ID inválido' })
      }
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },

  async create (req, res) {
    try {
      const user = await UserModel.create(req.body)
      res.status(201).json(user)
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'El usuario ya existe' })
      }
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },

  async update (req, res) {
    const user = await UserModel.update(req.params.id, req.body)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(user)
  },

  async delete (req, res) {
    await UserModel.delete(req.params.id)
    res.status(200).json({ message: 'Usuario eliminado' })
  }
}

export default UserController

import SpaceModel from '../models/space.model.js'

const SpaceController = {
  async getAll (req, res) {
    const spaces = await SpaceModel.getAll()
    res.json(spaces)
  },

  async getById (req, res) {
    const space = await SpaceModel.getById(req.params.id)
    if (!space) return res.status(404).json({ error: 'Espacio no encontrado' })
    res.json(space)
  },

  async create (req, res) {
    const exists = await SpaceModel.existsByNombre(req.body.nombre)
    if (exists) {
      return res.status(409).json({ error: 'Ya existe un espacio con ese nombre' })
    }

    const espacio = await SpaceModel.create(req.body)
    res.status(201).json(espacio)
  },

  async update (req, res) {
    const space = await SpaceModel.update(req.params.id, req.body)
    if (!space) return res.status(404).json({ error: 'Espacio no encontrado' })
    res.json(space)
  },

  async delete (req, res) {
    await SpaceModel.delete(req.params.id)
    res.status(200).json({ message: 'Espacio eliminado' })
  }
}

export default SpaceController

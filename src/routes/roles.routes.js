import { Router } from 'express'

const router = Router()

// Listar todos los roles
router.get('/roles', (req, res) => {
  res.send('Obteniendo todos los roles')
})

// Crear un nuevo rol
router.post('/roles', (req, res) => {
  res.send('Obteniendo todos los roles')
})

export default router

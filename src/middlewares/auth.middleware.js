import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export function authenticate (req, res, next) {
  const token = req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(' ')[1])

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' })
  }
}

export default authenticate

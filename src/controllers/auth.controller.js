import UserModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

const AuthController = {
  async login (req, res) {
    const { email, password } = req.body
    const user = await UserModel.findByEmail(email)

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' })

    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol // ahora es "Administrador" o "Empleado"
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 8 * 60 * 60 * 1000
    })

    res.json({ message: 'Inicio de sesión exitoso', rol: user.rol })
  },

  logout (req, res) {
    res.clearCookie('token')
    res.json({ message: 'Sesión cerrada correctamente' })
  },

  me (req, res) {
    const user = req.user
    if (!user) return res.status(401).json({ error: 'No autenticado' })

    res.json({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol // ahora es "Administrador" o "Empleado"
    })
  }
}

export default AuthController

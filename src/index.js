import express from 'express'
import { PORT, NEXT_PUBLIC_API_URL } from './config.js'
import userRoutes from './routes/user.routes.js'
import spaceRoutes from './routes/space.routes.js'
import departmentRoutes from './routes/department.routes.js'
import reservationRoutes from './routes/reservation.routes.js'
import historyRoutes from './routes/history.routes.js'
import authRoutes from './routes/auth.routes.js'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(morgan('dev'))
app.use(cors({
  credentials: true,
  origin: NEXT_PUBLIC_API_URL
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api/usuarios', userRoutes)
app.use('/api/espacios', spaceRoutes)
app.use('/api/departamentos', departmentRoutes)
app.use('/api/reservas', reservationRoutes)
app.use('/api/historial', historyRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

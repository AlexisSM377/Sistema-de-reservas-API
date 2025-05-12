import express from 'express'
import { PORT } from './config.js'
import userRoutes from './routes/user.routes.js'
import spaceRoutes from './routes/space.routes.js'
import reservationRoutes from './routes/reservation.routes.js'
import historyRoutes from './routes/history.routes.js'
import authRoutes from './routes/auth.routes.js'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/usuarios', userRoutes)
app.use('/api/espacios', spaceRoutes)
app.use('/api/reservas', reservationRoutes)
app.use('/api/historial', historyRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

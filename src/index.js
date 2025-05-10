import express from 'express'
import { PORT } from './config.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/usuarios', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

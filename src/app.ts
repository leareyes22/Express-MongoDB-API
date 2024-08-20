import express from 'express'
import cors from 'cors'
import bandsRoutes from './routes/bandRoutes'
import userRoutes from './routes/userRoutes'
import dotenv from 'dotenv'
import AppError from './utils/appError'
import { globalErrorHandler } from './controllers/errorController'

dotenv.config({ path: './.env/config.env' })

require('./db/mongo')

const app = express()
app.use(cors())
app.use(express.json()) // Middleware that transforms req.body into a json file.

const PORT = process.env.PORT != null ? process.env.PORT : 3001

app.use('/api/users', userRoutes)
app.use('/api/bands', bandsRoutes)

app.all('*', (req, _res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server.`, 404)

  next(err)
})

app.use(globalErrorHandler)

const server = app.listen(PORT, () => {
  console.log(`Server Started at Port: ${PORT}`)
})

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION. SHUTTING DOWN.')
  console.log(err, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION. SHUTTING DOWN.')
  console.log(err, err.message)
  server.close(() => {
    process.exit(1)
  })
})

export default app

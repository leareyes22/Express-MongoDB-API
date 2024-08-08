import express from 'express'
import cors from 'cors'
import bandsRoutes from './routes/bands/bandRoutes'
import dotenv from 'dotenv'
import AppError from './utils/appError'
import { globalErrorHandler } from './controllers/errorController'

dotenv.config({ path: './.env/config.env' })

require('./db/mongo')

const app = express()
app.use(cors())
app.use(express.json()) // Middleware that transforms req.body into a json file.

const PORT = process.env.PORT != null ? process.env.PORT : 3001

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
  console.log(err, err.message)
  server.close(() => {
    process.exit(1)
  })
})

export default app

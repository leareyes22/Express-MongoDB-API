import express from 'express'
import cors from 'cors'
import bandsRoutes from './routes/bands/bandRoutes'
import dotenv from 'dotenv'

dotenv.config({ path: './.env/config.env' })

require('./db/mongo')

const app = express()
app.use(cors())
app.use(express.json()) // Middleware that transforms req.body into a json file.

const PORT = process.env.PORT != null ? process.env.PORT : 3001

app.use('/api/bands', bandsRoutes)

app.all('*', (req, res, _next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server.`,
  })
})

app.listen(PORT, () => {
  console.log(`Server Started at Port: ${PORT}`)
})

export default app

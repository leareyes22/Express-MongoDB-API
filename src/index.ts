import express from 'express'
import bandsRoutes from './routes/bands/bands'

const app = express()
app.use(express.json()) // Middleware that transforms req.body into a json file.

const PORT = 3001

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!!')
  res.send('<h1><u>Rock bands festival API rest.</u></h1>')
})

app.use('/api/bands', bandsRoutes)

app.listen(PORT, () => {
  console.log(`Server Started at Port: ${PORT}`)
})

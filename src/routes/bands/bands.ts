import express from 'express'
import * as bandsServices from '../../services/bandsServices'

const router = express.Router()

router.get('/', (_req, res) => {
  const bands = bandsServices.getEntries()
  res.send(bands)
})

router.post('/', (_req, res) => {
  res.send('Guardando una nueva banda.')
})

export default router

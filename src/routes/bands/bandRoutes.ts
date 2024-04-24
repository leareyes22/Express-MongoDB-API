/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import {
  createBand,
  getBand,
  getBands,
  updateBand,
  deleteBand,
} from '../../controllers/bandController'

const router = express.Router()

router
  .get('', getBands)
  .get('/:id', getBand)
  .post('', createBand)
  .put('/:id', updateBand)
  .delete('/:id', deleteBand)

export default router

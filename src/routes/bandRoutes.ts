/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import {
  createBand,
  getBand,
  getBands,
  updateBand,
  deleteBand,
} from '../controllers/bandController'
import { protect } from '../controllers/authController'

const router = express.Router()

router
  .get('', protect, getBands)
  .get('/:id', protect, getBand)
  .post('', protect, createBand)
  .put('/:id', protect, updateBand)
  .delete('/:id', protect, deleteBand)

export default router

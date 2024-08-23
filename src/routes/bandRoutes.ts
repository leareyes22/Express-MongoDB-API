/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import {
  createBand,
  getBand,
  getBands,
  updateBand,
  deleteBand,
} from '../controllers/bandController'
import { protect, restrictTo } from '../controllers/authController'

const router = express.Router()

router
  .get('', protect, getBands)
  .get('/:id', protect, getBand)
  .post('', protect, restrictTo('admin'), createBand)
  .put('/:id', protect, restrictTo('admin'), updateBand)
  .delete('/:id', protect, restrictTo('admin'), deleteBand)

export default router

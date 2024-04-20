/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { createBand, getBand, getBands } from '../../controllers/bandController'

const router = express.Router()

router.get('', getBands)

router.get('/:id', getBand)

router.post('', createBand)

export default router

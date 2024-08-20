import mongoose from 'mongoose'
import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import app from '../app'

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(
    'mongodb+srv://leareyes22:LeandroNR22@cluster0.lqoohjw.mongodb.net/?retryWrites=true&w=majority',
  )
})

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close()
})

describe('GET /api/bands/:id', () => {
  it('Should return a band', async () => {
    const res = await request(app).get('/api/bands/66296c4a0f494e67c6c40f6d')
    expect(res.statusCode).toBe(200)
    expect(res.body.data.band.name).toBe('Carajo')
  })
})

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
require('../models/bandModel')

dotenv.config({ path: path.resolve(__dirname, '../.env', 'config.env') })

const connectionString =
  process.env.DB_STRING != null ? process.env.DB_STRING : ''

// Connection to mongodb
mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Database connected.')
  })
  .catch((err: any) => {
    console.error(err)
  })

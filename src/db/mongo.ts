import mongoose from 'mongoose'
require('../models/bandModel')

const connectionString =
  process.env.DB_STRING != null
    ? process.env.DB_STRING
    : 'mongodb+srv://leareyes22:LeandroNR22@cluster0.lqoohjw.mongodb.net/?retryWrites=true&w=majority'

// Connection to mongodb
mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Database connected.')
  })
  .catch((err: any) => {
    console.error(err)
  })

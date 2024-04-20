import { Schema } from 'mongoose'

const bandSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A band must have a name.'],
    unique: true,
  },
  pictureURL: String,
  gender: String,
  city: String,
  originYear: {
    type: Number,
    required: [true, 'A band must have an origin year.'],
  },
})

bandSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export { bandSchema }

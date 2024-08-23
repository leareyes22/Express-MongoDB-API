import { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name.'],
    unique: [true, 'User name must be unique.'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email address.'],
    unique: [true, 'User email address must be unique.'],
  },
  pictureURL: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A user must have a password.'],
    minlength: [8, 'User password must have a minimum lenght of 8 characters.'],
    select: false,
  },
  passwordChangedAt: Date,
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export { userSchema }

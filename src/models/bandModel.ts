import { model } from 'mongoose'
import { bandSchema } from '../schemas/bandSchema'

const Band = model('Band', bandSchema)

export { Band }

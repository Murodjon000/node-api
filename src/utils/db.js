import mongoose from 'mongoose'
import options from '../config'

export const connect = (url = options.dbUrl, opt = {}) => {
  return mongoose.connect(url, { ...opt, useNewUrlParser: true })
}

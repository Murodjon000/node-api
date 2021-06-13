import mongoose from 'mongoose'
import cuid from 'cuid'
import _ from 'lodash'
import { Item } from './src/resources/item/item.model'

const models = { Item }

const url =
  process.env.MONGODB_URL ||
  process.env.DB_URL ||
  'mongodb://localhost:27017/tipe-devapi-testing'

global.newId = () => {
  return mongoose.Types.ObjectId()
}

const remove = (collection) =>
  new Promise((resolve, reject) => {
    collection.remove((err) => {
      if (err) return reject(err)
      resolve()
    })
  })

beforeEach(async () => {
  const db = cuid()
  function clearDB() {
    return Promise.all(_.map(mongoose.connection.collections, (c) => remove(c)))
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url + db, {
        useNewUrlParser: true,
        autoIndex: true,
        useUnifiedTopology: true,
      })
      await clearDB()
      await Promise.all(Object.keys(models).map((name) => models[name].init()))
    } catch (e) {
      console.log('connection error')
      console.error(e)
      throw e
    }
  } else {
    await clearDB()
  }
})
afterEach(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
})

import { List } from '../list.model'
import mongoose from 'mongoose'

describe('List model', () => {
  describe('schema', () => {
    test('name', () => {
      const name = List.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      })
    })

    test('description', () => {
      const description = List.schema.obj.description
      expect(description).toEqual(String)
    })

    test('createdBy', () => {
      const createdBy = List.schema.obj.createdBy
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
      })
    })
  })
})

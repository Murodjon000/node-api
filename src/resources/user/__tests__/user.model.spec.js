import { User } from '../user.model'
import mongoose from 'mongoose'

describe('user model', () => {
  describe('schema', () => {
    test('email', () => {
      const email = User.schema.obj.email
      expect(email).toEqual({
        type: String,
        required: true,
        trim: true,
        unique: true,
      })
    })

    test('password', () => {
      const password = User.schema.obj.password
      expect(password).toEqual({
        type: String,
        required: true,
      })
    })
  })
})

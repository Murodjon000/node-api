import { signup, signin, protect, verifyToken, newToken } from '../auth'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { User } from '../../resources/user/user.model'

describe('Authentication', () => {
  describe('newToken', () => {
    test('creates new jwt from user', () => {
      const id = 1245
      const token = newToken({ id })
      const user = jwt.verify(token, config.secrets.jwt)
      expect(user.id).toBe(id)
    })
  })

  describe('verifyToken', () => {
    test('validates jwt and returns payload', async () => {
      const id = 1245
      const token = jwt.sign({ id }, config.secrets.jwt)
      const user = await verifyToken(token)
      console.log(user)
      expect(user.id).toBe(id)
    })
  })

  describe('signup', () => {
    test('requires email and password', async () => {
      expect.assertions(2)

      const req = { body: {} }
      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        },
      }

      await signup(req, res)
    })

    test('creates user and sends new token from user', async () => {
      expect.assertions(2)

      const req = {
        body: {
          username: 'John',
          email: 'exmaple@gmail.com',
          password: '1234567',
        },
      }
      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        async send(result) {
          let user = await verifyToken(result.token)
          user = await User.findById(user.id).lean().exec()
          expect(user.email).toBe('exmaple@gmail.com')
        },
      }

      await signup(req, res)
    })
  })

  describe('singin', () => {
    test('requires email and password', async () => {
      expect.assertions(2)

      const req = { body: {} }
      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        },
      }

      await signin(req, res)
    })

    test('user must be real', async () => {
      expect.assertions(3)

      const req = {
        body: { username: 'John', email: 'exa@gmail.com', password: '123456' },
      }

      const res = {
        status(status) {
          expect(status).toBe(500)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }
      await signin(req, res)
    })

    test('password should match', async () => {
      expect.assertions(2)
      await User.create({
        username: 'John',
        email: 'example@gmail.com',
        password: '12356',
      })
      const req = {
        body: {
          username: 'John',
          email: 'example@gmail.com',
          password: '123456',
        },
      }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        },
      }
      await signin(req, res)
    })

    test('creates new token', async () => {
      expect.assertions(2)
      const userField = {
        username: 'John',
        email: 'example@gmail.com',
        password: '123456',
      }
      const createdUser = await User.create(userField)
      const req = { body: userField }
      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        async send(result) {
          let user = await verifyToken(result.token)
          user = await User.findById(user.id).lean().exec()
          expect(user._id.toString()).toBe(createdUser._id.toString())
        },
      }
      await signin(req, res)
    })
  })

  describe('protect', () => {
    test('looks Bearer token', async () => {
      expect.assertions(2)

      const req = { headers: {} }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }

      await protect(req, res)
    })

    test('token mus have corect prefix', async () => {
      expect.assertions(2)

      const req = { headers: { authorization: newToken({ id: '55211' }) } }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }

      await protect(req, res)
    })

    test('must be real user', async () => {
      const token = `Bearer ${newToken({ id: mongoose.Types.ObjectId() })}`

      const req = { headers: { authorization: token } }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }

      await protect(req, res)
    })

    test('finds user from token and passes on', async () => {
      const user = await User.create({
        username: 'John',
        email: 'hello@hello.com',
        password: '1234',
      })
      const token = `Bearer ${newToken(user)}`
      const req = { headers: { authorization: token } }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }

      const next = () => {}
      await protect(req, res, next)

      expect(req.user._id.toString()).toBe(user._id.toString())
      expect(req.user).not.toHaveProperty('password')
    })
  })
})

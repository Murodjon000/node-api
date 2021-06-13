import controllers from '../item.controller'
import { isFunction } from 'lodash'

describe('item controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getOne',
      'getMany',
      'createOne',
      'removeOne',
      'updateOne',
    ]
    crudMethods.forEach((item) =>
      expect(isFunction(controllers[item])).toBe(true)
    )
  })
})

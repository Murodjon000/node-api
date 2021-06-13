import controllers from '../list.controller'
import { isFunction } from 'lodash'

describe('list controllers', () => {
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

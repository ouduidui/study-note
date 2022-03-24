import { assert, describe, expect, test } from 'vitest'

describe('use describe you can define a new suite in the current context', () => {
  const person = {
    isActive: true,
    age: 32,
  }
  test('person is defined', () => {
    expect(person).toBeDefined()
  })

  test('is active', () => {
    expect(person.isActive).toBeTruthy()
  })

  test('age limit', () => {
    expect(person.age).toBeLessThanOrEqual(32)
  })
})

describe('you can also nest describe blocks if you have a hierarchy of tests', () => {
  const numberToCurrency = (value) => {
    if (typeof value !== 'number')
      throw new Error('Value must be a number')

    return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  describe('given an invalid number', () => {
    test('composed of non-numbers to throw error', () => {
      expect(() => numberToCurrency('abc')).toThrow()
    })
  })

  describe('given a valid number', () => {
    test('returns the correct currency format', () => {
      expect(numberToCurrency(10000)).toBe('10,000.00')
    })
  })
})

describe.skip('skipped suite', () => {
  test('sqrt', () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})

// describe.only('suite', () => {
//   test('sqrt', () => {
//     assert.equal(Math.sqrt(4), 2)
//   })
// })

describe.concurrent('describe.concurrent in a suite marks every tests as concurrent', () => {
  test('concurrent test 1', async(done) => {
    setTimeout(() => {
      expect(Math.sqrt(4)).toBe(2)
      done()
    })
  })
  test('concurrent test 2', async(done) => {
    setTimeout(() => {
      expect(Math.sqrt(4)).toBe(2)
      done()
    })
  })
  test.concurrent('concurrent test 3', async(done) => {
    setTimeout(() => {
      expect(Math.sqrt(4)).toBe(2)
      done()
    })
  })
})

// An entry will be shown in the report for this suite
describe.todo('unimplemented suite')

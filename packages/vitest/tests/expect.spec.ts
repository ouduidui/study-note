import { describe, expect, test } from 'vitest'

describe('toBe', () => {
  const stock = {
    type: 'apples',
    count: 13,
  }

  test('toBe can be used to assert if primitives are equal or that objects share the same reference', () => {
    expect(1).toBe(1)
    expect('abc').toBe('abc')
    expect(false).toBe(false)
    expect(NaN).toBe(NaN)
    expect(stock.type).toBe('apples')
    expect(stock.count).toBe(13)
    const refStock = stock // same reference
    expect(stock).toBe(refStock)
  })

  test.fails('not toBe situation', () => {
    expect(true).toBe(false)
    expect('abc').toBe('abcd')
    expect([]).toBe([])
    expect({}).toBe({})
    const refStock = {
      type: 'apples',
      count: 13,
    }
    expect(stock).toBe(refStock)
  })
})

describe('toBeCloseTo', () => {
  test.fails('decimals are not equal in javascript', () => {
    expect(0.2 + 0.1).toBe(0.3) // 0.2 + 0.1 is 0.30000000000000004
  })

  test('Use toBeCloseTo to compare floating-point numbers. The optional numDigits argument limits the number of digits to check after the decimal point',
    () => {
      // 0.2 + 0.1 is 0.30000 | "000000000004" removed
      expect(0.2 + 0.1).toBeCloseTo(0.3, 5)
      // nothing from 0.30000000000000004 is removed
      expect(0.2 + 0.1).not.toBeCloseTo(0.3, 50)
    })
})

describe('toBeDefined', () => {
  test('toBeDefined asserts that the value is not equal to undefined', () => {
    const getApples = () => 3
    expect(getApples()).toBeDefined()
    expect('').toBeDefined()
    expect(false).toBeDefined()
    expect(null).toBeDefined()
  })

  test.fails('not toBeDefined situation', () => {
    const voidFn = () => {}
    expect(voidFn()).toBeDefined()
    expect(undefined).toBeDefined()
  })
})

describe('toBeUndefined', () => {
  test('Opposite of toBeDefined, toBeUndefined asserts that the value is equal to undefined', () => {
    const voidFn = () => {}
    expect(voidFn()).toBeUndefined()
    expect(undefined).toBeUndefined()
  })
})

describe('toBeTruthy', () => {
  test('assert the value is true, when converted to Boolean', () => {
    expect(true).toBeTruthy()
    expect('123').toBeTruthy()
    expect(123).toBeTruthy()
    expect({}).toBeTruthy()
  })

  test.fails('false situation', () => {
    expect(false).toBeTruthy()
    expect('').toBeTruthy()
    expect(null).toBeTruthy()
    expect(undefined).toBeTruthy()
  })
})

describe('toBeFalsy', () => {
  test('asserts that the value is false, when converted to boolean', () => {
    expect(false).toBeFalsy()
    expect('').toBeFalsy()
    expect(null).toBeFalsy()
    expect(undefined).toBeFalsy()
  })
})

describe('toBeNull', () => {
  test('toBeNull simply asserts if something is null', () => {
    expect(null).toBeNull()

    function apples() {
      return null
    }
    expect(apples()).toBeNull()
  })
})

describe('toBeNaN', () => {
  test('toBeNaN simply asserts if something is NaN', () => {
    expect(NaN).toBeNaN()
    expect(Number('abc')).toBeNaN()
  })
})

describe('toBeTypeOf', () => {
  test('toBeTypeOf asserts if an actual value is of type of received type', () => {
    expect(1).toBeTypeOf('number')
    expect('a').toBeTypeOf('string')
    expect(false).toBeTypeOf('boolean')
    expect(Symbol('a')).toBeTypeOf('symbol')
    expect(BigInt(10)).toBeTypeOf('bigint')
    expect(undefined).toBeTypeOf('undefined')
    expect(() => {}).toBeTypeOf('function')
    expect({}).toBeTypeOf('object')
    expect([]).toBeTypeOf('object')
  })
})

describe('toBeInstanceOf', () => {
  test('toBeInstanceOf asserts if an actual value is instance of received class', () => {
    expect({}).toBeInstanceOf(Object)
    expect(() => {}).toBeInstanceOf(Object)
    expect(() => {}).toBeInstanceOf(Function)

    class Test {}
    expect(new Test()).toBeInstanceOf(Test)
  })
})

describe('toBeGreaterThan', () => {
  test('toBeGreaterThan asserts if an actual value is greater than received one', () => {
    expect(4).toBeGreaterThan(3)
  })

  test.fails('fail situation', () => {
    expect(3).toBeGreaterThan(3)
    expect(2).toBeGreaterThan(3)
  })
})

describe('toBeGreaterThanOrEqual', () => {
  test('toBeGreaterThanOrEqual asserts if an actual value is greater than or equal to received one', () => {
    expect(4).toBeGreaterThanOrEqual(3)
    expect(3).toBeGreaterThanOrEqual(3)
  })
})

describe('toBeLessThan', () => {
  test('toBeLessThan asserts if actual value is less than received one', () => {
    expect(2).toBeLessThan(3)
  })

  test.fails('fail situation', () => {
    expect(3).toBeLessThan(3)
    expect(4).toBeLessThan(3)
  })
})

describe('toBeLessThanOrEqual', () => {
  test('toBeLessThanOrEqual asserts if actual value is less than received one or equal to it', () => {
    expect(2).toBeLessThanOrEqual(3)
    expect(3).toBeLessThanOrEqual(3)
  })
})

describe('toEqual', () => {
  test('toEqual asserts if actual value is equal to received one or has the same structure, if it is an object', () => {
    expect({}).toEqual({})
    expect([]).toEqual([])
    expect({ a: 1 }).toEqual({ a: 1 })
  })

  test('it will pass undefined option', () => {
    expect({ a: undefined, b: 1 }).toEqual({ b: 1 })
    // eslint-disable-next-line no-sparse-arrays
    expect([undefined, 1]).toEqual([, 1])
  })

  test('it will pass check object type to be equal', () => {
    class Test {
      a = 1
    }
    expect(new Test()).toEqual({ a: 1 })
  })
})

describe('toStrictEqual', () => {
  test('toStrictEqual is same of toEqual basically, but is stricter than toEqual', () => {
    expect({}).toStrictEqual({})
    expect([]).toStrictEqual([])
    expect({ a: 1 }).toStrictEqual({ a: 1 })
  })

  test('different from toEqual', () => {
    expect({ a: undefined, b: 1 }).not.toStrictEqual({ b: 1 })
    // eslint-disable-next-line no-sparse-arrays
    expect([undefined, 1]).not.toStrictEqual([, 1])
    class Test {
      a = 1
    }
    expect(new Test()).not.toStrictEqual({ a: 1 })
  })
})

describe('toContain', () => {
  test('toContain asserts if actual value is in an array', () => {
    expect(['a', 'b', 'c']).toContain('a')
    expect([1, 2, 3, 4]).toContain(2)

    const obj = { a: 1 }
    expect([obj]).toContain(obj)
  })

  test('toCantain can also check whether a string is a substring of another string', () => {
    expect('abcdefg').toContain('a')
  })
})

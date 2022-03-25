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

describe('toContainEqual', () => {
  test('toContainEqual asserts if an item with a specific structure and values is contained in an array', () => {
    expect([{ a: 1 }, { a: 2 }]).toContainEqual({ a: 1 })
    expect([{ a: 1 }, { a: 2 }]).toContainEqual({ a: 2 })
  })
})

describe('toHaveLength', () => {
  test('toHaveLength asserts if an object has a .length property and it is set to a certain numeric value', () => {
    expect('abc').toHaveLength(3)
    expect([1, 2, 3]).toHaveLength(3)
    expect([]).toHaveLength(0)
    expect({ length: 3 }).toHaveLength(3)
  })
})

describe('toHaveProperty', () => {
  test('toHaveProperty asserts if a property at provide reference key exists for an object', () => {
    const obj = { a: 1, b: { c: 2 } }
    expect(obj).toHaveProperty('a')
    expect(obj).toHaveProperty('b.c')
  })

  test('you can provide an optional value argument also known as deep equality, like the toEqual matcher to compare the received property value', () => {
    const obj = { a: 1, b: { c: 2 } }
    expect(obj).toHaveProperty('a', 1)
    expect(obj).toHaveProperty('b', { c: 2 })
    expect(obj).toHaveProperty('b.c', 2)
  })
})

describe('toMatch', () => {
  test('toMatch asserts if a string matches a regular expression or a string', () => {
    expect('abc').toMatch('a')
    expect('abc').toMatch(/^a*./)
    expect('abc').not.toMatch(/\*.b$/)
  })
})

describe('toMatchObject', () => {
  test('toMatchObject asserts if an object matches a subset of the properties of an object', () => {
    expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
    expect({ a: 1, b: 2 }).toMatchObject({ a: 1, b: 2 })
  })

  test('you can also pass an array of objects. this is useful if you want to check that two arrays matchin their number of elements.', () => {
    expect([{ foo: 'baz', bar: 'baz' }, { baz: 1 }]).toMatchObject([{ foo: 'baz' }, { baz: 1 }])
  })
})

describe('toThrowError', () => {
  test('toThrowError assets if a function throws an error when it is called', () => {
    expect(() => {
      throw new Error('error')
    }).toThrowError()
  })

  test('you can provide an optional argument to test a specific error is thrown', () => {
    expect(() => {
      throw new Error('error')
    }).toThrowError('error')

    expect(() => {
      throw new Error('error')
    }).toThrowError(/^e*./)
  })
})

describe('resolve', () => {
  test('use it to unwrap value from pending preomise and assert its value with usual assetions', async() => {
    const p = Promise.resolve({ foo: 1 })
    await expect(p).resolves.toEqual({ foo: 1 })
  })
})

describe('reject', () => {
  test('use it to unwrap reason why promise war rejected, and assert its value with usual assertions', async() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    const p = Promise.reject({ foo: 1 })
    await expect(p).rejects.toEqual({ foo: 1 })
  })
})

describe('assertions', () => {
  test('after the test has passed or failed verifies that curtain number of assertions was called during a test', async() => {
    expect.assertions(3)
    await Promise.all([
      expect(1).toBe(1),
      expect(1).toBe(1),
      expect(1).toBe(1),
    ])
  })
})

describe('hasAssertions', () => {
  test('After the test has passed or failed verifies that at least one assertion was called during a test', () => {
    expect.hasAssertions()
    expect(1).toBe(1)
  })

  test.fails('not has assertions', () => {
    expect.hasAssertions()
  })
})

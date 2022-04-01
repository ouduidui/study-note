/* eslint-disable no-console */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'

afterAll(() => {
  // Register a callback to be called once after all tests have run in the current context.
  console.log('afterAll Api')
})

describe('beforeEach + afterEach', () => {
  let counter = 0

  // Register a callback to be called after each one of the tests in the current context completes.
  afterEach(() => {
    console.log('afterEach Api')
    counter = 0
  })

  it('happy test', () => {
    console.log('happy test')
    expect(counter).toBe(2)
  })

  // Register a callback to be called before each of the tests in the current context runs
  beforeEach(() => {
    console.log('beforeEach Api')
    counter = 2
  })
})

beforeAll(() => {
  // Register a callback to be called once before starting to run all tests in the current context.
  console.log('beforeAll Api')
})

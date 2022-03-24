import { assert, describe, expect, test } from 'vitest'

test('should work as expected', () => {
  expect(Math.sqrt(4)).toBe(2)
})

test.skip('skipped test', () => {
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3)
})

// test.only('test', () => {
//   // Only this test (and others marked with only) are run
//   assert.equal(Math.sqrt(4), 2)
// })

describe('test.concurrent', () => {
  test('serial test', async() => {
    expect(Math.sqrt(4)).toBe(2)
  })

  test.concurrent('concurrent test 1', async(done) => {
    setTimeout(() => {
      expect(Math.sqrt(4)).toBe(2)
      done()
    })
  })
  test.concurrent('concurrent test 2', async(done) => {
    Promise.resolve().then(() => {
      expect(Math.sqrt(4)).toBe(2)
      done()
    })
  })
})

// An entry will be shown in the report for this test
test.todo('unimplemented test')

test.fails('fail test', () => {
  expect(Math.sqrt(4)).toBe(3)
})

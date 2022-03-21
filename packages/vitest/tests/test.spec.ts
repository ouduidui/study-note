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

describe('suite', () => {
  test('serial test', async() => {
    expect(Math.sqrt(4)).toBe(2)
  })

  test.concurrent('concurrent test 1', async() => { expect(Math.sqrt(4)).toBe(2) })
  test.concurrent('concurrent test 2', async() => { expect(Math.sqrt(4)).toBe(2) })
})

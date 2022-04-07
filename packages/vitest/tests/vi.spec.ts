import { describe, expect, it, vi } from 'vitest'

describe('vi.advanceTimersByTime', () => {
  it('Works just like runAllTimers, but will end after passed milliseconds. ', () => {
    vi.useFakeTimers()
    let i = 0
    setInterval(() => ++i, 50)
    vi.advanceTimersByTime(150)
    expect(i).toBe(3)
  })
})

describe('vi.advanceTimersToNextTimer', () => {
  it('Will call next available timer. Useful to make assertions between each timer call. ', () => {
    vi.useFakeTimers()
    let i = 0
    setInterval(() => ++i, 50)
    vi.advanceTimersToNextTimer()
    expect(i).toBe(1)
    vi.advanceTimersToNextTimer()
    expect(i).toBe(2)
    vi.advanceTimersToNextTimer()
      .advanceTimersToNextTimer()
    expect(i).toBe(4)
  })
})

describe('vi.clearAllTimers', () => {
  it('Removes all timers that are scheduled to run.', () => {
    vi.useFakeTimers()
    let i = 0
    setInterval(() => ++i, 50)
    vi.advanceTimersByTime(150)
    expect(i).toBe(3)
    vi.clearAllTimers()
    vi.advanceTimersByTime(150)
    expect(i).toBe(3)
  })
})

describe('vi.fn', () => {
  it('Create a spy on a function, though can be initated without one.', () => {
    const fn = vi.fn(() => 0)
    fn()
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveReturnedWith(0)
    expect(fn()).toBe(0)
  })
})

describe('vi.getMockedSystemTime', () => {
  it('Returns mocked current date that was set using setSystemTime', () => {
    expect(vi.getMockedSystemTime()).toBe(null)

    const date = new Date(1997, 11, 29)
    vi.useFakeTimers()
    vi.setSystemTime(date)
    expect(vi.getMockedSystemTime()).toBe(date)
    vi.useRealTimers()
  })
})

describe('vi.getRealSystemTime', () => {
  it('if you need to get real time in milliseconds, you can call this function', () => {
    const date = new Date(1997, 11, 29)
    vi.useFakeTimers()
    vi.setSystemTime(date)
    expect(vi.getRealSystemTime()).not.toBe(new Date().getTime())
    expect(vi.getRealSystemTime()).not.toBe(date.getTime)
    vi.useRealTimers()
    expect(vi.getRealSystemTime()).toBe(new Date().getTime())
  })
})

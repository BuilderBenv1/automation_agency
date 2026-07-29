import { describe, it, expect } from 'vitest'
import { hoursWaiting, daysWaiting, isOverdue, STALE_THRESHOLD_HOURS } from './staleness'

const now = new Date('2026-07-28T09:00:00Z')
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600_000).toISOString()

describe('hoursWaiting/daysWaiting', () => {
  it('computes whole hours and floored days', () => {
    expect(hoursWaiting(hoursAgo(50), now)).toBe(50)
    expect(daysWaiting(hoursAgo(50), now)).toBe(2)
    expect(daysWaiting(hoursAgo(23), now)).toBe(0)
  })
})

describe('isOverdue', () => {
  it('is true for an open contact past the threshold', () => {
    expect(isOverdue({ status: 'new', last_activity_at: hoursAgo(49) }, now)).toBe(true)
  })
  it('is false for an open contact within the threshold', () => {
    expect(isOverdue({ status: 'new', last_activity_at: hoursAgo(47) }, now)).toBe(false)
  })
  it('is false for a closed/won contact even if old', () => {
    expect(isOverdue({ status: 'won', last_activity_at: hoursAgo(500) }, now)).toBe(false)
    expect(isOverdue({ status: 'lost', last_activity_at: hoursAgo(500) }, now)).toBe(false)
  })
  it('uses exactly 48h as the default threshold', () => {
    expect(STALE_THRESHOLD_HOURS).toBe(48)
    expect(isOverdue({ status: 'proposal', last_activity_at: hoursAgo(48) }, now)).toBe(true)
  })
})

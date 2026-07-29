import type { Contact, ContactStatus } from './types'

export const OPEN_STATUSES: ContactStatus[] = ['new', 'contacted', 'proposal']
export const STALE_THRESHOLD_HOURS = 48

export function hoursWaiting(lastActivityAtISO: string, now: Date): number {
  return Math.floor((now.getTime() - new Date(lastActivityAtISO).getTime()) / 3600_000)
}

export function daysWaiting(lastActivityAtISO: string, now: Date): number {
  return Math.floor(hoursWaiting(lastActivityAtISO, now) / 24)
}

export function isOverdue(
  contact: Pick<Contact, 'status' | 'last_activity_at'>,
  now: Date,
  thresholdHours: number = STALE_THRESHOLD_HOURS,
): boolean {
  if (!OPEN_STATUSES.includes(contact.status)) return false
  return hoursWaiting(contact.last_activity_at, now) >= thresholdHours
}

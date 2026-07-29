import { describe, it, expect } from 'vitest'
import { buildDigestEmail } from './digest'
import type { Contact } from './types'

const now = new Date('2026-07-28T09:00:00Z')
const base = (over: Partial<Contact>): Contact => ({
  id: 'c1', name: 'Jane', email: 'jane@co.uk', company: 'Co', source: 'contact_form',
  message: null, status: 'new', notes: null,
  last_activity_at: '2026-07-25T09:00:00Z', created_at: '', updated_at: '', ...over,
})

describe('buildDigestEmail', () => {
  it('returns null for no contacts', () => {
    expect(buildDigestEmail([], now, 'https://x.co')).toBeNull()
  })
  it('summarises count in the subject', () => {
    const out = buildDigestEmail([base({}), base({ id: 'c2' })], now, 'https://x.co')
    expect(out).not.toBeNull()
    expect(out!.subject).toBe('2 leads waiting on you')
  })
  it('links each contact to its admin detail page and shows days waiting', () => {
    const out = buildDigestEmail([base({ id: 'abc' })], now, 'https://x.co')!
    expect(out.html).toContain('https://x.co/admin/contacts/abc')
    expect(out.html).toContain('3 days')
    expect(out.html).toContain('Jane')
  })
})

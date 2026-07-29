import type { Contact } from './types'
import { daysWaiting } from './staleness'

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!))
}

export function buildDigestEmail(
  contacts: Contact[], now: Date, baseUrl: string,
): { subject: string; html: string } | null {
  if (contacts.length === 0) return null
  const subject = `${contacts.length} lead${contacts.length === 1 ? '' : 's'} waiting on you`
  const rows = contacts.map((c) => {
    const d = daysWaiting(c.last_activity_at, now)
    const waited = d === 0 ? 'today' : `${d} day${d === 1 ? '' : 's'}`
    const who = esc(c.name) + (c.company ? ` — ${esc(c.company)}` : '')
    return `<tr>
      <td style="padding:8px 0;"><a href="${baseUrl}/admin/contacts/${c.id}">${who}</a></td>
      <td style="padding:8px 0;color:#5f5648;">waiting ${waited}</td>
    </tr>`
  }).join('')
  const html = `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
    <h2 style="color:#131210;">${subject}</h2>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
    <p style="color:#5f5648;font-size:13px;margin-top:24px;">Open the board to reply and mark them contacted.</p>
  </div>`
  return { subject, html }
}

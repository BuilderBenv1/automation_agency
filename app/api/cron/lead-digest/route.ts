import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getOverdueContacts } from '@/lib/crm/contacts'
import { STALE_THRESHOLD_HOURS } from '@/lib/crm/staleness'
import { buildDigestEmail } from '@/lib/crm/digest'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const now = new Date()
  const cutoff = new Date(now.getTime() - STALE_THRESHOLD_HOURS * 3600_000).toISOString()
  const overdue = await getOverdueContacts(cutoff)
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.automation-agency.co.uk'
  const email = buildDigestEmail(overdue, now, base)
  if (!email) return NextResponse.json({ sent: false, count: 0 })

  const resend = new Resend(process.env.RESEND_API_KEY!)
  await resend.emails.send({
    from: 'noreply@automation-agency.co.uk',
    to: process.env.CONTACT_EMAIL!,
    subject: email.subject,
    html: email.html,
  })
  return NextResponse.json({ sent: true, count: overdue.length })
}

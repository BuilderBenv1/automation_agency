import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  try {
    const resendKey = process.env.RESEND_API_KEY
    const OWNER_EMAIL = process.env.CONTACT_EMAIL
    if (!resendKey || !OWNER_EMAIL) {
      console.error('Callback route: missing env vars')
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }
    const resend = new Resend(resendKey)

    const { name, phone, note, context } = await req.json()

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const digits = String(phone).replace(/[^0-9]/g, '')
    if (digits.length < 8 || digits.length > 15) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    const safeName = escapeHtml(String(name).slice(0, 100))
    const safePhone = escapeHtml(String(phone).slice(0, 30))
    const safeNote = escapeHtml(String(note || '').slice(0, 2000))
    const safeContext = escapeHtml(String(context || '').slice(0, 200))
    const telHref = `tel:${digits}`

    await resend.emails.send({
      from: 'noreply@automation-agency.co.uk',
      to: OWNER_EMAIL,
      subject: `☎ Callback requested: ${String(name).slice(0, 60)} · ${String(phone).slice(0, 30)}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0f1b2d;color:#fff;padding:24px;border-radius:4px;margin-bottom:24px;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.5);">Callback requested</p>
            <h2 style="margin:6px 0 0;font-size:22px;font-weight:600;">${safeName}</h2>
            <p style="margin:14px 0 0;"><a href="${telHref}" style="display:inline-block;background:#fff;color:#0f1b2d;padding:10px 18px;border-radius:3px;font-weight:600;font-size:14px;text-decoration:none;">Call ${safePhone} →</a></p>
          </div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
            <tr><td style="padding:6px 0;color:#767b82;width:120px;">Name</td><td style="padding:6px 0;font-weight:600;">${safeName}</td></tr>
            <tr><td style="padding:6px 0;color:#767b82;">Phone</td><td style="padding:6px 0;"><a href="${telHref}">${safePhone}</a></td></tr>
            <tr><td style="padding:6px 0;color:#767b82;">From page</td><td style="padding:6px 0;">${safeContext || '—'}</td></tr>
          </table>
          ${
            safeNote
              ? `<h3 style="color:#0f1b2d;font-size:14px;margin:0 0 8px;">What they told us</h3><div style="background:#f3f1ed;padding:14px 18px;border-radius:4px;font-size:13px;line-height:1.6;color:#3d4045;">${safeNote.replace(
                  /\n/g,
                  '<br/>'
                )}</div>`
              : ''
          }
          <hr style="border:none;border-top:1px solid #e2ddd8;margin:24px 0;"/>
          <p style="color:#767b82;font-size:12px;">They&apos;re expecting a phone call within 24 hours — ideally sooner.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Callback route error:', error)
    return NextResponse.json({ error: 'Failed to request callback' }, { status: 500 })
  }
}

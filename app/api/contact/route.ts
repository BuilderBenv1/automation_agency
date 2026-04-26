import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    const resendKey = process.env.RESEND_API_KEY
    const OWNER_EMAIL = process.env.CONTACT_EMAIL
    if (!apiKey || !resendKey || !OWNER_EMAIL) {
      console.error('Contact route: missing env vars')
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }
    const anthropic = new Anthropic({ apiKey })
    const resend = new Resend(resendKey)

    const { name, email, company, message, intent } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // ── Claude agent: generate personalised acknowledgement ──
    const aiResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      messages: [
        {
          role: 'user',
          content: `You are responding on behalf of The Automation Agency, a UK AI automation consultancy run by a senior developer with 10+ years experience, based in Derbyshire.

Write a brief, warm, professional acknowledgement email (3 short paragraphs, plain text). Rules:
- Address them by first name only (from: "${name}")
- Reference something specific from their message to show it was read
- Mention we'll respond within 24 hours${intent === 'audit' ? ' and look forward to discussing their Process Audit' : ' to arrange a free discovery call'}
- Keep it human and direct — not corporate
- Do NOT invent solutions, prices, or promises
- End with: Best regards,\\nThe Automation Agency
- Output ONLY the email body, no subject line, no preamble

Enquiry:
Name: ${name}
Company: ${company || 'not provided'}
Intent: ${intent || 'not specified'}
Message: ${message}`,
        },
      ],
    })

    const autoReply = aiResponse.content[0]?.type === 'text' ? aiResponse.content[0].text : ''

    // ── Notify owner ──
    await resend.emails.send({
      from: 'noreply@automation-agency.co.uk',
      to: OWNER_EMAIL,
      subject: `New enquiry: ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#0f1b2d;margin-bottom:24px;">New Enquiry</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr><td style="padding:8px 0;color:#767b82;width:100px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#767b82;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#767b82;">Company</td><td style="padding:8px 0;">${company || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#767b82;">Intent</td><td style="padding:8px 0;">${intent || '—'}</td></tr>
          </table>
          <div style="background:#f3f1ed;padding:20px;border-radius:4px;margin-bottom:24px;">
            <p style="margin:0;color:#3d4045;line-height:1.6;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <hr style="border:none;border-top:1px solid #e2ddd8;margin:24px 0;"/>
          <p style="color:#767b82;font-size:13px;">Auto-reply sent to ${email}</p>
        </div>
      `,
    })

    // ── Send AI-generated reply to enquirer ──
    await resend.emails.send({
      from: 'hello@automation-agency.co.uk',
      to: email,
      reply_to: OWNER_EMAIL,
      subject: `We've received your enquiry — The Automation Agency`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#141210;line-height:1.7;">
          <div style="border-bottom:2px solid #0f1b2d;padding-bottom:20px;margin-bottom:32px;">
            <p style="font-size:18px;font-weight:600;margin:0;color:#0f1b2d;">The Automation Agency</p>
            <p style="margin:4px 0 0;font-size:13px;color:#767b82;">automation-agency.co.uk</p>
          </div>
          <div style="font-size:15px;">
            ${autoReply.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>').replace(/^/, '<p>').replace(/$/, '</p>')}
          </div>
          <div style="margin-top:40px;padding-top:24px;border-top:1px solid #e2ddd8;font-size:12px;color:#767b82;">
            <p>The Automation Agency · Derbyshire, UK · <a href="https://automation-agency.co.uk" style="color:#1a4fa0;">automation-agency.co.uk</a></p>
            <p>This email was sent in response to your enquiry. To unsubscribe from future communications, reply with "unsubscribe".</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact route error:', error)
    return NextResponse.json({ error: 'Failed to process enquiry' }, { status: 500 })
  }
}

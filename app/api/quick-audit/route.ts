import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type QuickAuditPayload = {
  name?: string
  email?: string
  company?: string
  industry?: string
  teamSize?: string
  tools?: string
  processes?: string
  pain?: string
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    const resendKey = process.env.RESEND_API_KEY
    const OWNER_EMAIL = process.env.CONTACT_EMAIL
    if (!apiKey || !resendKey || !OWNER_EMAIL) {
      console.error('Quick-audit route: missing env vars')
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }
    const anthropic = new Anthropic({ apiKey })
    const resend = new Resend(resendKey)

    const payload = (await req.json()) as QuickAuditPayload
    const { name, email, company, industry, teamSize, tools, processes, pain } = payload

    if (!name || !email || !processes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // ── Claude: generate tailored 1-page Quick-Audit ──
    const aiResponse = await anthropic.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1200,
      messages: [
        {
          role: 'user',
          content: `You are writing a free "Quick-Audit" email on behalf of The Automation Agency — a UK AI/process-automation consultancy run by Ben Horne, a senior developer with 10+ years building production systems. We send this audit to prospects who fill in a 7-question form. Our paid services: fixed-price starter builds from £350 (simple workflows), £750 (AI workflows and chatbots) and £1,500 (dashboards/internal tools); a £1,500 Process Audit (credited against any build); and full audit-scoped builds from £3,000.

Write a tailored, one-page email Quick-Audit (plain text, no HTML, around 350–500 words). The structure must be:

1. Personal greeting using their first name
2. ONE short paragraph acknowledging what they told you (their pain, processes, tools — reference specifics)
3. A section "Three automation opportunities for your business" with 3 numbered items. For each:
   - Bold-style heading describing the automation (use **markdown-style asterisks**)
   - 2–3 sentences explaining what it would do and roughly what kind of saving it could produce (e.g. "X hours per week", "eliminate a salary worth of data entry"). Don't invent specific numbers — keep it directional.
   - One line on rough complexity ("Straightforward — could be built in days" / "Mid-complexity — typically 2–4 weeks" / "Higher complexity — would be scoped in a Process Audit")
4. A section "What you could do in-house vs with outside help" — 1 short paragraph honest about which of the three are DIY-able with their stated tools and which would benefit from a developer.
5. Soft close — 2 sentences. Mention that if they want a deeper analysis the £1,500 Process Audit produces a fuller written report with fixed-price build quotes. Otherwise wish them well and tell them we're here when they're ready.
6. Sign off as: "Best,\\nBen\\nThe Automation Agency"

Rules:
- Be specific to their business, not generic. Reference their industry, tools, team size, and pain in your suggestions.
- Don't invent prices or guaranteed ROI percentages.
- Don't be salesy. Don't push the £1,500 Process Audit hard — mention it once at the end.
- If they gave clearly unsuitable info (a 1-person business, no real processes, etc.) be honest that they might not need us yet — suggest where they could DIY.
- Plain text only. Use line breaks for paragraph spacing. Markdown bold (**) for headings is fine.

Their submission:
Name: ${name}
Company: ${company || 'not provided'}
Industry: ${industry || 'not specified'}
Team size: ${teamSize || 'not specified'}
Tools and systems they use: ${tools || 'not provided'}
Top manual processes they want to automate: ${processes}
Biggest pain right now: ${pain || 'not provided'}

Write the Quick-Audit now.`,
        },
      ],
    })

    const auditBody =
      aiResponse.content[0]?.type === 'text' ? aiResponse.content[0].text : ''

    // ── Notify owner ──
    await resend.emails.send({
      from: 'noreply@automation-agency.co.uk',
      to: OWNER_EMAIL,
      subject: `Quick-Audit submitted: ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:640px;margin:0 auto;color:#141210;">
          <h2 style="color:#0f1b2d;margin-bottom:20px;">New Quick-Audit Submission</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
            <tr><td style="padding:6px 0;color:#767b82;width:140px;">Name</td><td style="padding:6px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#767b82;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#767b82;">Company</td><td style="padding:6px 0;">${company || '—'}</td></tr>
            <tr><td style="padding:6px 0;color:#767b82;">Industry</td><td style="padding:6px 0;">${industry || '—'}</td></tr>
            <tr><td style="padding:6px 0;color:#767b82;">Team size</td><td style="padding:6px 0;">${teamSize || '—'}</td></tr>
          </table>
          <h3 style="color:#0f1b2d;font-size:14px;margin:24px 0 8px;">Processes they want to automate</h3>
          <div style="background:#f3f1ed;padding:14px 18px;border-radius:4px;font-size:13px;line-height:1.6;">${(processes || '').replace(/\n/g, '<br/>')}</div>
          <h3 style="color:#0f1b2d;font-size:14px;margin:20px 0 8px;">Tools they use</h3>
          <div style="background:#f3f1ed;padding:14px 18px;border-radius:4px;font-size:13px;line-height:1.6;">${(tools || '—').replace(/\n/g, '<br/>')}</div>
          <h3 style="color:#0f1b2d;font-size:14px;margin:20px 0 8px;">Biggest pain</h3>
          <div style="background:#f3f1ed;padding:14px 18px;border-radius:4px;font-size:13px;line-height:1.6;">${(pain || '—').replace(/\n/g, '<br/>')}</div>
          <hr style="border:none;border-top:1px solid #e2ddd8;margin:24px 0;"/>
          <h3 style="color:#0f1b2d;font-size:14px;margin:20px 0 8px;">AI-drafted Quick-Audit (auto-sent to ${email})</h3>
          <div style="background:#fbfaf8;padding:18px;border:1px solid #e2ddd8;border-radius:4px;font-size:13px;line-height:1.7;white-space:pre-wrap;">${auditBody}</div>
        </div>
      `,
    })

    // ── Send Quick-Audit to enquirer ──
    const htmlBody = auditBody
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')

    await resend.emails.send({
      from: 'hello@automation-agency.co.uk',
      to: email,
      reply_to: OWNER_EMAIL,
      subject: `Your free Quick-Audit — The Automation Agency`,
      html: `
        <div style="font-family:sans-serif;max-width:640px;margin:0 auto;color:#141210;line-height:1.7;">
          <div style="border-bottom:2px solid #0f1b2d;padding-bottom:18px;margin-bottom:28px;">
            <p style="font-size:18px;font-weight:600;margin:0;color:#0f1b2d;">The Automation Agency</p>
            <p style="margin:4px 0 0;font-size:13px;color:#767b82;">Your free Quick-Audit</p>
          </div>
          <div style="font-size:15px;">
            ${htmlBody}
          </div>
          <div style="margin-top:36px;padding-top:24px;border-top:1px solid #e2ddd8;font-size:12px;color:#767b82;">
            <p>When you&apos;re ready to dig deeper, book a free 30-minute discovery call at <a href="https://www.automation-agency.co.uk/#contact" style="color:#1a4fa0;">automation-agency.co.uk</a> — or just reply to this email.</p>
            <p>The Automation Agency · Chesterfield, Derbyshire</p>
          </div>
        </div>
      `,
    })

    // Best-effort CRM capture — must never block or fail the enquiry response.
    try {
      const { captureEnquiry } = await import('@/lib/crm/contacts')
      await captureEnquiry({
        name,
        email,
        company,
        message: [processes, tools, pain].filter(Boolean).join('\n\n'),
        source: 'quick_audit',
      })
    } catch (e) {
      console.error('CRM capture failed (quick-audit):', e)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Quick-audit route error:', error)
    return NextResponse.json({ error: 'Failed to generate audit' }, { status: 500 })
  }
}

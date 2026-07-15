import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ── Supported platforms + per-platform generation guidance ──
const PLATFORMS = {
  linkedin: {
    label: 'LinkedIn',
    guide:
      'Professional but human. Open with a one-line hook that earns the scroll-stop. 2–4 short paragraphs, generous line breaks, no walls of text. Around 900–1300 characters. End with a light question or call to action. 3–5 relevant hashtags on their own line at the end. No emoji spam — one or two at most, only if they fit.',
  },
  x: {
    label: 'X (Twitter)',
    guide:
      'Punchy and tight. Must be 280 characters or fewer including hashtags. One clear idea. 0–2 hashtags. No fluff, no throat-clearing.',
  },
  instagram: {
    label: 'Instagram',
    guide:
      'Warm, visual, first-person. A strong first line (it shows before "more"), then a few short lines with line breaks. Emoji are welcome where natural but do not overdo it. Finish with 5–10 relevant hashtags on their own line.',
  },
  facebook: {
    label: 'Facebook',
    guide:
      'Conversational and friendly, like talking to a local audience. 2–3 short paragraphs. A clear call to action. 0–3 hashtags. Emoji optional and sparing.',
  },
} as const

type PlatformKey = keyof typeof PLATFORMS

const TONES: Record<string, string> = {
  professional: 'Professional and credible — senior, plain-spoken, no jargon.',
  friendly: 'Friendly and approachable — warm, conversational, human.',
  bold: 'Bold and punchy — confident, direct, opinionated, short sentences.',
  educational: 'Educational — teach one useful thing clearly, no hard sell.',
}

type Payload = {
  topic?: string
  platforms?: string[]
  tone?: string
  cta?: string
}

// ── Best-effort in-memory rate limit (per-IP, resets on cold start) ──
const RATE_LIMIT = 8 // generations
const RATE_WINDOW_MS = 60 * 60 * 1000 // per hour
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const raw = fenced ? fenced[1] : text
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('No JSON object in model output')
  return JSON.parse(raw.slice(start, end + 1))
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      console.error('Social route: missing ANTHROPIC_API_KEY')
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "You've generated a lot of posts in a short time. Give it a few minutes and try again." },
        { status: 429 }
      )
    }

    const { topic, platforms, tone, cta } = (await req.json()) as Payload

    if (!topic || typeof topic !== 'string' || topic.trim().length < 8) {
      return NextResponse.json(
        { error: 'Tell us a bit more about what you want to post (at least a sentence).' },
        { status: 400 }
      )
    }
    if (topic.length > 1500) {
      return NextResponse.json({ error: 'That topic is a bit long — keep it under 1500 characters.' }, { status: 400 })
    }

    const selected = (Array.isArray(platforms) ? platforms : [])
      .filter((p): p is PlatformKey => typeof p === 'string' && p in PLATFORMS)
    if (selected.length === 0) {
      return NextResponse.json({ error: 'Pick at least one platform.' }, { status: 400 })
    }

    const toneKey = tone && tone in TONES ? tone : 'professional'
    const platformBrief = selected
      .map((p) => `- ${PLATFORMS[p].label} (key "${p}"): ${PLATFORMS[p].guide}`)
      .join('\n')

    const anthropic = new Anthropic({ apiKey })

    const prompt = `You are a social media copywriter for a real business. Write ready-to-publish posts for the platforms listed below, all about the same topic.

TOPIC / WHAT TO POST ABOUT:
${topic.trim()}
${cta && cta.trim() ? `\nDESIRED CALL TO ACTION: ${cta.trim()}` : ''}

TONE: ${TONES[toneKey]}

PLATFORMS TO WRITE FOR:
${platformBrief}

WRITING RULES (important — read carefully):
- Write like a real person talking to their audience. Short, varied sentences.
- Respect each platform's length and format guidance above exactly.
- Never use these words: unlock, leverage, seamless, robust, elevate, empower, cutting-edge, game-changing, revolutionise, "in today's fast-paced world", "dive in", "delve".
- No robotic triads ("we identify, we build, we deliver"). No stacked keyword lists pretending to be sentences.
- Be specific and concrete. Do not invent facts, numbers, prices, or testimonials that were not given in the topic.
- Hashtags must be relevant and lowercase-friendly; put them where the platform guidance says.

Return ONLY a JSON object, no prose before or after, in exactly this shape:
{
  "posts": [
    { "platform": "<one of: ${selected.join(', ')}>", "content": "<the full post text, ready to paste>" }
  ]
}
Include exactly one post object per requested platform, in the order listed. The "content" is the complete post including any hashtags. Do not add commentary.`

    const aiResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1600,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = aiResponse.content[0]?.type === 'text' ? aiResponse.content[0].text : ''
    let parsed: { posts?: Array<{ platform?: string; content?: string }> }
    try {
      parsed = extractJson(text) as typeof parsed
    } catch (err) {
      console.error('Social route: failed to parse model output', err)
      return NextResponse.json({ error: 'The generator hiccuped — please try again.' }, { status: 502 })
    }

    const posts = (parsed.posts || [])
      .filter((p) => p && typeof p.content === 'string' && p.platform && p.platform in PLATFORMS)
      .map((p) => ({
        platform: p.platform as PlatformKey,
        label: PLATFORMS[p.platform as PlatformKey].label,
        content: (p.content as string).trim(),
      }))

    if (posts.length === 0) {
      return NextResponse.json({ error: 'The generator returned nothing usable — please try again.' }, { status: 502 })
    }

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Social route error:', error)
    return NextResponse.json({ error: 'Failed to generate posts. Please try again.' }, { status: 500 })
  }
}

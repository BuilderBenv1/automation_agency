import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'wrong password' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_session', await createSession(), {
    httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30,
  })
  return res
}

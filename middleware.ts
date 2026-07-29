import { NextResponse, type NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  if (path.startsWith('/admin/login')) return NextResponse.next()
  const ok = await verifySession(req.cookies.get('admin_session')?.value)
  if (!ok) return NextResponse.redirect(new URL('/admin/login', req.url))
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }

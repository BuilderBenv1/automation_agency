import { SignJWT, jwtVerify } from 'jose'

const key = () => new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET!)

export async function createSession(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(key())
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, key())
    return payload.role === 'admin'
  } catch {
    return false
  }
}

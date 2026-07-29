import { neon } from '@neondatabase/serverless'

// Server-only. DATABASE_URL is injected by the Vercel Neon integration (and lives in
// .env.local for local dev). Never import this from a client component.
export const sql = neon(process.env.DATABASE_URL!)

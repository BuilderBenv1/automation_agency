import { readFileSync, readdirSync } from 'node:fs'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not set')
const sql = neon(process.env.DATABASE_URL)

await sql.query(
  'create table if not exists schema_migrations (name text primary key, applied_at timestamptz default now())',
)
const applied = new Set((await sql.query('select name from schema_migrations')).map((r) => r.name))
const files = readdirSync('db/migrations').filter((f) => f.endsWith('.sql')).sort()

for (const file of files) {
  if (applied.has(file)) { console.log(`skip ${file}`); continue }
  const body = readFileSync(`db/migrations/${file}`, 'utf8')
  const statements = body.split(';').map((s) => s.trim()).filter(Boolean)
  for (const stmt of statements) await sql.query(stmt)
  await sql.query('insert into schema_migrations (name) values ($1)', [file])
  console.log(`applied ${file}`)
}
console.log('migrations up to date')

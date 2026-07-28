# Lead CRM (Phase 1) Implementation Plan — Neon foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture every website enquiry into a Neon-Postgres CRM, show them on an admin board, and email Ben a daily digest of leads that have gone stale.

**Architecture:** New authenticated `/admin` area inside the existing Next.js app, backed by Neon Postgres (via the Vercel Marketplace, auto-injected `DATABASE_URL`). Existing contact/quick-audit API routes gain a best-effort CRM write. A single-admin session gate (password → signed `jose` cookie) protects `/admin`. A Vercel Cron route sends a daily "leads waiting on you" digest via Resend. Pure business logic (staleness, digest) is isolated in `lib/crm/` and unit-tested; DB and framework glue are thin wrappers around it.

**Tech Stack:** Next.js 14.2.5 (App Router), TypeScript, Tailwind, Neon (`@neondatabase/serverless`), `jose` (admin session), Resend (already installed), Vitest (new), Vercel Cron.

## Global Constraints

- Next.js **14.2.5**, App Router, TypeScript strict; import alias `@/` maps to repo root.
- API/cron/admin data code runs on the Node runtime (`export const runtime = 'nodejs'`). Middleware runs on Edge (jose verifies there fine).
- **The enquiry email is sacred:** CRM capture is best-effort — wrapped so it can never throw into, delay, or fail the existing `/api/contact` and `/api/quick-audit` responses.
- **Do not touch** the existing `window.gtag` conversion firing or the Resend/Claude email logic in the two API routes beyond appending the capture call.
- Secrets are **server-only**: `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `CRON_SECRET`. Only `NEXT_PUBLIC_SITE_URL` is public.
- Provisioning is Ben's: Neon is created via **Vercel dashboard → Storage → Neon**, which injects `DATABASE_URL` into the project. Locally it lives in `.env.local`.
- Admin UI matches existing design tokens (`ink`, `cream`, `cream-2`, `lime`, `muted-cream`, `muted-dark`) and `font-display`/`font-sans`.
- Statuses: `new | contacted | proposal | won | onboarding | active | lost`. Open (stale-eligible) set: `new | contacted | proposal`. Stale threshold: **48h**.
- No RLS (Neon is plain Postgres; all Phase-1 DB access is server-side over `DATABASE_URL`, single admin).

---

## File Structure

**Create:**
- `db/migrations/0001_crm_phase1.sql` — tables, enum, indexes.
- `scripts/migrate.mjs` — applies pending SQL migrations (tracked in `schema_migrations`).
- `lib/db.ts` — Neon SQL client (`neon(DATABASE_URL)`).
- `lib/auth.ts` — `createSession`, `verifySession` (jose HS256).
- `lib/crm/types.ts` — `Contact`, `Activity`, `ContactStatus`, constants.
- `lib/crm/staleness.ts` — `daysWaiting`, `hoursWaiting`, `isOverdue`, `OPEN_STATUSES`, `STALE_THRESHOLD_HOURS`.
- `lib/crm/digest.ts` — `buildDigestEmail`.
- `lib/crm/contacts.ts` — Neon data layer.
- `lib/crm/staleness.test.ts`, `lib/crm/digest.test.ts` — Vitest unit tests.
- `middleware.ts` — protect `/admin` via session cookie.
- `app/api/admin/login/route.ts` — password → signed cookie.
- `app/admin/login/page.tsx` — login form.
- `app/admin/layout.tsx`, `app/admin/page.tsx`, `app/admin/contacts/[id]/page.tsx`, `app/admin/actions.ts`.
- `app/api/cron/lead-digest/route.ts` — daily digest.
- `vitest.config.ts`, `vercel.json`.

**Modify:**
- `app/api/contact/route.ts`, `app/api/quick-audit/route.ts` — append best-effort capture.
- `package.json` — deps + `test`/`db:migrate` scripts.

---

## Task 1: Tooling, deps, Neon client, migrate runner

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`, `lib/db.ts`, `scripts/migrate.mjs`
- Test: `lib/crm/sanity.test.ts` (temporary)

**Interfaces:**
- Produces: `sql` — a Neon `NeonQueryFunction` from `lib/db.ts` (tagged-template SQL); `npm run db:migrate` applies `db/migrations/*.sql`.

- [ ] **Step 1: Install dependencies**

```bash
npm install @neondatabase/serverless jose
npm install -D vitest
```

- [ ] **Step 2: Add scripts to package.json**

In `"scripts"` add:

```json
"test": "vitest run",
"test:watch": "vitest",
"db:migrate": "node --env-file=.env.local scripts/migrate.mjs"
```

(`--env-file` needs Node ≥ 20.6; if older, `export DATABASE_URL=...` before running.)

- [ ] **Step 3: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: { environment: 'node', include: ['lib/**/*.test.ts'] },
})
```

- [ ] **Step 4: Sanity test + confirm the runner works**

Create `lib/crm/sanity.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
describe('vitest', () => { it('runs', () => { expect(1 + 1).toBe(2) }) })
```

Run: `npm test` → 1 passing test. Then delete `lib/crm/sanity.test.ts`.

- [ ] **Step 5: Create the Neon client (`lib/db.ts`)**

```ts
import { neon } from '@neondatabase/serverless'

// Server-only. DATABASE_URL is injected by the Vercel Neon integration (and lives in
// .env.local for local dev). Never import this from a client component.
export const sql = neon(process.env.DATABASE_URL!)
```

- [ ] **Step 6: Create the migrate runner (`scripts/migrate.mjs`)**

```js
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
  // Simple DDL migrations only — split on ';'. Do not put ';' inside string literals/function bodies.
  const statements = body.split(';').map((s) => s.trim()).filter(Boolean)
  for (const stmt of statements) await sql.query(stmt)
  await sql.query('insert into schema_migrations (name) values ($1)', [file])
  console.log(`applied ${file}`)
}
console.log('migrations up to date')
```

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/db.ts scripts/migrate.mjs
git commit -m "chore: add vitest + neon client + migrate runner"
```

---

## Task 2: Database migration (contacts + activities)

**Files:**
- Create: `db/migrations/0001_crm_phase1.sql`

**Interfaces:**
- Produces: `contacts` and `activities` tables; enum `contact_status`; supporting indexes. No RLS (server-side access only in Phase 1).

- [ ] **Step 1: Write the migration**

```sql
-- db/migrations/0001_crm_phase1.sql
create type contact_status as enum
  ('new','contacted','proposal','won','onboarding','active','lost');

create table contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  company text,
  source text not null check (source in ('contact_form','quick_audit','manual')),
  message text,
  status contact_status not null default 'new',
  notes text,
  last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table activities (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references contacts(id) on delete cascade,
  type text not null check (type in ('enquiry_in','reply_logged','note','status_change')),
  body text,
  created_at timestamptz not null default now()
);

create index contacts_status_last_activity_idx on contacts (status, last_activity_at);
create index activities_contact_id_created_idx on activities (contact_id, created_at desc)
```

(No trailing `;` on the last statement — the runner splits on `;`.)

- [ ] **Step 2: Apply it**

Ensure `DATABASE_URL` is in `.env.local`, then: `npm run db:migrate`
Expected: `applied 0001_crm_phase1.sql` then `migrations up to date`.

- [ ] **Step 3: Verify tables exist**

Run a throwaway check (or via the Neon dashboard SQL editor):
`select count(*) from contacts; select count(*) from activities;` → both 0, no error.

- [ ] **Step 4: Commit**

```bash
git add db/migrations/0001_crm_phase1.sql
git commit -m "feat: crm phase 1 schema"
```

---

## Task 3: Types + staleness logic (pure, TDD)

**Files:**
- Create: `lib/crm/types.ts`, `lib/crm/staleness.ts`
- Test: `lib/crm/staleness.test.ts`

**Interfaces:**
- Produces:
  - `type ContactStatus = 'new'|'contacted'|'proposal'|'won'|'onboarding'|'active'|'lost'`
  - `type ContactSource = 'contact_form'|'quick_audit'|'manual'`
  - `interface Contact { id, name, email, company, source, message, status, notes, last_activity_at, created_at, updated_at }` (string dates)
  - `interface Activity { id, contact_id, type, body, created_at }`
  - `const OPEN_STATUSES: ContactStatus[]`, `const STALE_THRESHOLD_HOURS = 48`
  - `hoursWaiting(lastActivityAtISO: string, now: Date): number`
  - `daysWaiting(lastActivityAtISO: string, now: Date): number` (whole days, floored)
  - `isOverdue(contact: Pick<Contact,'status'|'last_activity_at'>, now: Date, thresholdHours?: number): boolean`

- [ ] **Step 1: Write the failing test**

`lib/crm/staleness.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { hoursWaiting, daysWaiting, isOverdue, STALE_THRESHOLD_HOURS } from './staleness'

const now = new Date('2026-07-28T09:00:00Z')
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600_000).toISOString()

describe('hoursWaiting/daysWaiting', () => {
  it('computes whole hours and floored days', () => {
    expect(hoursWaiting(hoursAgo(50), now)).toBe(50)
    expect(daysWaiting(hoursAgo(50), now)).toBe(2)
    expect(daysWaiting(hoursAgo(23), now)).toBe(0)
  })
})

describe('isOverdue', () => {
  it('is true for an open contact past the threshold', () => {
    expect(isOverdue({ status: 'new', last_activity_at: hoursAgo(49) }, now)).toBe(true)
  })
  it('is false for an open contact within the threshold', () => {
    expect(isOverdue({ status: 'new', last_activity_at: hoursAgo(47) }, now)).toBe(false)
  })
  it('is false for a closed/won contact even if old', () => {
    expect(isOverdue({ status: 'won', last_activity_at: hoursAgo(500) }, now)).toBe(false)
    expect(isOverdue({ status: 'lost', last_activity_at: hoursAgo(500) }, now)).toBe(false)
  })
  it('uses exactly 48h as the default threshold', () => {
    expect(STALE_THRESHOLD_HOURS).toBe(48)
    expect(isOverdue({ status: 'proposal', last_activity_at: hoursAgo(48) }, now)).toBe(true)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test` → FAIL (module `./staleness` not found).

- [ ] **Step 3: Write `lib/crm/types.ts`**

```ts
export type ContactStatus =
  | 'new' | 'contacted' | 'proposal' | 'won' | 'onboarding' | 'active' | 'lost'
export type ContactSource = 'contact_form' | 'quick_audit' | 'manual'

export interface Contact {
  id: string
  name: string
  email: string
  company: string | null
  source: ContactSource
  message: string | null
  status: ContactStatus
  notes: string | null
  last_activity_at: string
  created_at: string
  updated_at: string
}

export type ActivityType = 'enquiry_in' | 'reply_logged' | 'note' | 'status_change'

export interface Activity {
  id: string
  contact_id: string
  type: ActivityType
  body: string | null
  created_at: string
}
```

- [ ] **Step 4: Write `lib/crm/staleness.ts`**

```ts
import type { Contact, ContactStatus } from './types'

export const OPEN_STATUSES: ContactStatus[] = ['new', 'contacted', 'proposal']
export const STALE_THRESHOLD_HOURS = 48

export function hoursWaiting(lastActivityAtISO: string, now: Date): number {
  return Math.floor((now.getTime() - new Date(lastActivityAtISO).getTime()) / 3600_000)
}

export function daysWaiting(lastActivityAtISO: string, now: Date): number {
  return Math.floor(hoursWaiting(lastActivityAtISO, now) / 24)
}

export function isOverdue(
  contact: Pick<Contact, 'status' | 'last_activity_at'>,
  now: Date,
  thresholdHours: number = STALE_THRESHOLD_HOURS,
): boolean {
  if (!OPEN_STATUSES.includes(contact.status)) return false
  return hoursWaiting(contact.last_activity_at, now) >= thresholdHours
}
```

- [ ] **Step 5: Run to verify pass** — `npm test` → PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/crm/types.ts lib/crm/staleness.ts lib/crm/staleness.test.ts
git commit -m "feat: crm contact types + staleness logic"
```

---

## Task 4: Digest email builder (pure, TDD)

**Files:**
- Create: `lib/crm/digest.ts`
- Test: `lib/crm/digest.test.ts`

**Interfaces:**
- Consumes: `Contact` (types.ts), `daysWaiting` (staleness.ts).
- Produces: `buildDigestEmail(contacts: Contact[], now: Date, baseUrl: string): { subject: string; html: string } | null` — `null` when `contacts` is empty.

- [ ] **Step 1: Write the failing test**

`lib/crm/digest.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { buildDigestEmail } from './digest'
import type { Contact } from './types'

const now = new Date('2026-07-28T09:00:00Z')
const base = (over: Partial<Contact>): Contact => ({
  id: 'c1', name: 'Jane', email: 'jane@co.uk', company: 'Co', source: 'contact_form',
  message: null, status: 'new', notes: null,
  last_activity_at: '2026-07-25T09:00:00Z', created_at: '', updated_at: '', ...over,
})

describe('buildDigestEmail', () => {
  it('returns null for no contacts', () => {
    expect(buildDigestEmail([], now, 'https://x.co')).toBeNull()
  })
  it('summarises count in the subject', () => {
    const out = buildDigestEmail([base({}), base({ id: 'c2' })], now, 'https://x.co')
    expect(out).not.toBeNull()
    expect(out!.subject).toBe('2 leads waiting on you')
  })
  it('links each contact to its admin detail page and shows days waiting', () => {
    const out = buildDigestEmail([base({ id: 'abc' })], now, 'https://x.co')!
    expect(out.html).toContain('https://x.co/admin/contacts/abc')
    expect(out.html).toContain('3 days')
    expect(out.html).toContain('Jane')
  })
})
```

- [ ] **Step 2: Run to verify it fails** — `npm test` → FAIL.

- [ ] **Step 3: Write `lib/crm/digest.ts`**

```ts
import type { Contact } from './types'
import { daysWaiting } from './staleness'

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!))
}

export function buildDigestEmail(
  contacts: Contact[], now: Date, baseUrl: string,
): { subject: string; html: string } | null {
  if (contacts.length === 0) return null
  const subject = `${contacts.length} lead${contacts.length === 1 ? '' : 's'} waiting on you`
  const rows = contacts.map((c) => {
    const d = daysWaiting(c.last_activity_at, now)
    const waited = d === 0 ? 'today' : `${d} day${d === 1 ? '' : 's'}`
    const who = esc(c.name) + (c.company ? ` — ${esc(c.company)}` : '')
    return `<tr>
      <td style="padding:8px 0;"><a href="${baseUrl}/admin/contacts/${c.id}">${who}</a></td>
      <td style="padding:8px 0;color:#5f5648;">waiting ${waited}</td>
    </tr>`
  }).join('')
  const html = `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
    <h2 style="color:#131210;">${subject}</h2>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
    <p style="color:#5f5648;font-size:13px;margin-top:24px;">Open the board to reply and mark them contacted.</p>
  </div>`
  return { subject, html }
}
```

- [ ] **Step 4: Run to verify pass** — `npm test` → PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/crm/digest.ts lib/crm/digest.test.ts
git commit -m "feat: daily digest email builder"
```

---

## Task 5: Data layer (Neon SQL)

**Files:**
- Create: `lib/crm/contacts.ts`

**Interfaces:**
- Consumes: `sql` (lib/db.ts), `Contact`/`Activity`/`ContactStatus` (types.ts), `OPEN_STATUSES` (staleness.ts).
- Produces (all use the shared `sql`; integration-verified, not unit-mocked):
  - `captureEnquiry(input: { name, email, company?, message?, source: 'contact_form'|'quick_audit' }): Promise<void>` — upsert by email (`on conflict` bumps `last_activity_at` only) + `enquiry_in` activity.
  - `listContacts(): Promise<Contact[]>` — stalest first (`last_activity_at` asc).
  - `getContact(id): Promise<{ contact: Contact; activities: Activity[] } | null>`
  - `getOverdueContacts(cutoffISO: string): Promise<Contact[]>` — open statuses with `last_activity_at <= cutoff`.
  - `logReply(id): Promise<void>`; `updateStatus(id, status): Promise<void>`; `addNote(id, body): Promise<void>`; `createManualContact({ name, email, company?, message? }): Promise<string>`.

- [ ] **Step 1: Write `lib/crm/contacts.ts`**

```ts
import { sql } from '@/lib/db'
import type { Contact, Activity, ContactStatus } from './types'
import { OPEN_STATUSES } from './staleness'

type EnquiryInput = {
  name: string; email: string; company?: string | null; message?: string | null
  source: 'contact_form' | 'quick_audit'
}

export async function captureEnquiry(input: EnquiryInput): Promise<void> {
  const rows = await sql`
    insert into contacts (name, email, company, message, source, status, last_activity_at)
    values (${input.name}, ${input.email}, ${input.company ?? null},
            ${input.message ?? null}, ${input.source}, 'new', now())
    on conflict (email) do update set last_activity_at = now(), updated_at = now()
    returning id`
  const id = rows[0].id as string
  await sql`insert into activities (contact_id, type, body)
            values (${id}, 'enquiry_in', ${input.message ?? null})`
}

export async function listContacts(): Promise<Contact[]> {
  return (await sql`select * from contacts order by last_activity_at asc`) as Contact[]
}

export async function getContact(
  id: string,
): Promise<{ contact: Contact; activities: Activity[] } | null> {
  const c = (await sql`select * from contacts where id = ${id}`) as Contact[]
  if (c.length === 0) return null
  const a = (await sql`select * from activities where contact_id = ${id}
                       order by created_at desc`) as Activity[]
  return { contact: c[0], activities: a }
}

export async function getOverdueContacts(cutoffISO: string): Promise<Contact[]> {
  return (await sql`
    select * from contacts
    where status::text = any(${OPEN_STATUSES}) and last_activity_at <= ${cutoffISO}
    order by last_activity_at asc`) as Contact[]
}

export async function logReply(id: string): Promise<void> {
  await sql`update contacts set last_activity_at = now(), updated_at = now() where id = ${id}`
  await sql`insert into activities (contact_id, type) values (${id}, 'reply_logged')`
}

export async function updateStatus(id: string, status: ContactStatus): Promise<void> {
  await sql`update contacts set status = ${status}::contact_status, updated_at = now() where id = ${id}`
  await sql`insert into activities (contact_id, type, body) values (${id}, 'status_change', ${status})`
}

export async function addNote(id: string, body: string): Promise<void> {
  const rows = (await sql`select notes from contacts where id = ${id}`) as { notes: string | null }[]
  const merged = [rows[0]?.notes, body].filter(Boolean).join('\n---\n')
  await sql`update contacts set notes = ${merged}, updated_at = now() where id = ${id}`
  await sql`insert into activities (contact_id, type, body) values (${id}, 'note', ${body})`
}

export async function createManualContact(
  input: { name: string; email: string; company?: string; message?: string },
): Promise<string> {
  const rows = await sql`
    insert into contacts (name, email, company, message, source, status, last_activity_at)
    values (${input.name}, ${input.email}, ${input.company ?? null},
            ${input.message ?? null}, 'manual', 'new', now())
    returning id`
  return rows[0].id as string
}
```

- [ ] **Step 2: Integration check against Neon**

With `DATABASE_URL` set and the migration applied, verify (throwaway script or via Task 6): calling `captureEnquiry` twice with the same email yields **one** `contacts` row and **two** `activities` rows, and `last_activity_at` advanced on the second call. Clean up the test row afterward (`delete from contacts where email = '...'`).

- [ ] **Step 3: Commit**

```bash
git add lib/crm/contacts.ts
git commit -m "feat: crm data layer (neon sql)"
```

---

## Task 6: Wire capture into the enquiry routes

**Files:**
- Modify: `app/api/contact/route.ts`, `app/api/quick-audit/route.ts`

- [ ] **Step 1: Append capture to `app/api/contact/route.ts`**

Immediately **before** `return NextResponse.json({ success: true })` (after both Resend sends):

```ts
    // Best-effort CRM capture — must never block or fail the enquiry response.
    try {
      const { captureEnquiry } = await import('@/lib/crm/contacts')
      await captureEnquiry({ name, email, company, message, source: 'contact_form' })
    } catch (e) {
      console.error('CRM capture failed (contact):', e)
    }
```

- [ ] **Step 2: Append capture to `app/api/quick-audit/route.ts`**

Before its success response (after its email send). Confirm the exact field names destructured in that route and reuse them:

```ts
    try {
      const { captureEnquiry } = await import('@/lib/crm/contacts')
      await captureEnquiry({
        name, email, company,
        message: [processes, tools, pain].filter(Boolean).join('\n\n'),
        source: 'quick_audit',
      })
    } catch (e) {
      console.error('CRM capture failed (quick-audit):', e)
    }
```

- [ ] **Step 3: Verify the enquiry still succeeds and captures**

`npm run dev`; POST a valid body to `/api/contact`. Expected: `{"success":true}`, HTTP 200, and a new `contacts` row (`select email,status,source from contacts order by created_at desc limit 1`).

- [ ] **Step 4: Verify capture failure does not break the response**

Temporarily set `DATABASE_URL` to an invalid value, POST again. Expected: still `{"success":true}` / 200, with `CRM capture failed` logged. Restore `DATABASE_URL`.

- [ ] **Step 5: Commit**

```bash
git add app/api/contact/route.ts app/api/quick-audit/route.ts
git commit -m "feat: capture enquiries into crm (best-effort)"
```

---

## Task 7: Admin auth (single-admin password → signed cookie)

**Files:**
- Create: `lib/auth.ts`, `app/api/admin/login/route.ts`, `app/admin/login/page.tsx`, `app/admin/layout.tsx`, `middleware.ts`

**Interfaces:**
- Produces: `createSession(): Promise<string>` (30-day HS256 JWT with `{role:'admin'}`), `verifySession(token?: string): Promise<boolean>`. `/admin/*` requires a valid `admin_session` cookie; `/admin/login` is public.

- [ ] **Step 1: Write `lib/auth.ts`**

```ts
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
```

- [ ] **Step 2: Login route (`app/api/admin/login/route.ts`)**

```ts
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
```

- [ ] **Step 3: Login page (`app/admin/login/page.tsx`)**

```tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(false)
  const router = useRouter()
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) router.push('/admin')
    else setErr(true)
  }
  return (
    <div className="min-h-screen bg-ink text-cream flex items-center justify-center p-8">
      <form onSubmit={submit} className="w-full max-w-sm">
        <h1 className="font-display font-bold text-2xl mb-4">Admin sign in</h1>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
          placeholder="Password"
          className="w-full bg-cream text-ink rounded-xl px-3.5 py-2.5 mb-3" />
        <button type="submit" className="btn-lime w-full justify-center">Sign in</button>
        {err && <p className="text-sm mt-3 text-center">Wrong password.</p>}
      </form>
    </div>
  )
}
```

- [ ] **Step 4: Admin shell (`app/admin/layout.tsx`)**

```tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-cream">
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <h1 className="font-display font-bold text-xl mb-6">Leads</h1>
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Middleware (`middleware.ts`)**

```ts
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
```

- [ ] **Step 6: Verify the gate**

Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (any long random string) in `.env.local`. Run dev. Visit `/admin` signed out → redirected to `/admin/login`. Enter the wrong password → "Wrong password". Enter the right one → reach `/admin`.

- [ ] **Step 7: Commit**

```bash
git add lib/auth.ts app/api/admin/login/route.ts app/admin/login/page.tsx app/admin/layout.tsx middleware.ts
git commit -m "feat: single-admin session gate for /admin"
```

---

## Task 8: Admin board + detail + actions

**Files:**
- Create: `app/admin/page.tsx`, `app/admin/contacts/[id]/page.tsx`, `app/admin/actions.ts`

**Interfaces:**
- Consumes: `listContacts`, `getContact`, `logReply`, `updateStatus`, `addNote`, `createManualContact` (contacts.ts), `daysWaiting`, `isOverdue` (staleness.ts).

- [ ] **Step 1: Server actions (`app/admin/actions.ts`)**

```ts
'use server'
import { revalidatePath } from 'next/cache'
import * as crm from '@/lib/crm/contacts'
import type { ContactStatus } from '@/lib/crm/types'

export async function logReplyAction(id: string) {
  await crm.logReply(id); revalidatePath(`/admin/contacts/${id}`); revalidatePath('/admin')
}
export async function updateStatusAction(id: string, status: ContactStatus) {
  await crm.updateStatus(id, status); revalidatePath(`/admin/contacts/${id}`); revalidatePath('/admin')
}
export async function addNoteAction(id: string, body: string) {
  if (body.trim()) await crm.addNote(id, body.trim()); revalidatePath(`/admin/contacts/${id}`)
}
export async function addManualContactAction(input: {
  name: string; email: string; company?: string; message?: string
}) {
  await crm.createManualContact(input); revalidatePath('/admin')
}
```

- [ ] **Step 2: Board (`app/admin/page.tsx`)** — server component, table with overdue highlight

```tsx
import Link from 'next/link'
import { listContacts } from '@/lib/crm/contacts'
import { daysWaiting, isOverdue } from '@/lib/crm/staleness'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function AdminBoard() {
  const contacts = await listContacts()
  const now = new Date()
  return (
    <table className="w-full text-sm">
      <thead className="text-muted-dark text-left">
        <tr><th>Name</th><th>Company</th><th>Source</th><th>Status</th><th>Waiting</th></tr>
      </thead>
      <tbody>
        {contacts.map((c) => (
          <tr key={c.id} className={isOverdue(c, now) ? 'bg-lime/10' : ''}>
            <td className="py-2"><Link href={`/admin/contacts/${c.id}`} className="underline">{c.name}</Link></td>
            <td>{c.company ?? '—'}</td>
            <td>{c.source}</td>
            <td>{c.status}</td>
            <td>{daysWaiting(c.last_activity_at, now)}d</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

- [ ] **Step 3: Detail (`app/admin/contacts/[id]/page.tsx`)**

Load via `getContact`; `notFound()` if null. Render info, the original message, the activity timeline (newest first), and a `logReplyAction`-bound button. Add the status `<select>` (→ `updateStatusAction`) and notes `<textarea>` (→ `addNoteAction`) forms, plus a small "Add lead" form on the board bound to `addManualContactAction`, all using the `form action={...}` pattern shown.

```tsx
import { notFound } from 'next/navigation'
import { getContact } from '@/lib/crm/contacts'
import { logReplyAction } from '@/app/admin/actions'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function ContactDetail({ params }: { params: { id: string } }) {
  const data = await getContact(params.id)
  if (!data) notFound()
  const { contact, activities } = data
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-lg">{contact.name}</h2>
        <p className="text-muted-dark">{contact.email}{contact.company ? ` · ${contact.company}` : ''}</p>
      </div>
      <form action={logReplyAction.bind(null, contact.id)}>
        <button className="btn-lime">Log reply / mark contacted</button>
      </form>
      {contact.message && <p className="whitespace-pre-wrap bg-ink-2 p-4 rounded-xl">{contact.message}</p>}
      <ul className="text-sm text-muted-dark space-y-1">
        {activities.map((a) => (
          <li key={a.id}>{new Date(a.created_at).toLocaleString()} — {a.type}{a.body ? `: ${a.body}` : ''}</li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 4: Verify end-to-end**

Sign in; submit a live enquiry via the site form; confirm it appears on `/admin` (highlighted once >48h — force by editing `last_activity_at` in the DB if needed). Open detail, click "Log reply" → waiting resets, leaves the overdue set. Change status to `won` → leaves the open set. Add a manual lead → appears.

- [ ] **Step 5: Commit**

```bash
git add app/admin/page.tsx app/admin/contacts/ app/admin/actions.ts
git commit -m "feat: admin board, detail, and actions"
```

---

## Task 9: Daily digest cron

**Files:**
- Create: `app/api/cron/lead-digest/route.ts`, `vercel.json`

**Interfaces:**
- Consumes: `getOverdueContacts` (contacts.ts), `STALE_THRESHOLD_HOURS` (staleness.ts), `buildDigestEmail` (digest.ts), Resend.

- [ ] **Step 1: Cron route**

```ts
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
```

- [ ] **Step 2: Cron config (`vercel.json`)**

```json
{
  "crons": [{ "path": "/api/cron/lead-digest", "schedule": "0 8 * * *" }]
}
```

Set `CRON_SECRET` and `NEXT_PUBLIC_SITE_URL` in Vercel. (Vercel Cron sends `Authorization: Bearer $CRON_SECRET` automatically when `CRON_SECRET` is set.)

- [ ] **Step 3: Verify**

`curl -H "Authorization: Bearer <CRON_SECRET>" http://localhost:3000/api/cron/lead-digest`. With ≥1 overdue lead → `{"sent":true,"count":N}` + a digest email. None → `{"sent":false,"count":0}`. No header → 401.

- [ ] **Step 4: Commit**

```bash
git add app/api/cron/lead-digest/route.ts vercel.json
git commit -m "feat: daily stale-lead digest cron"
```

---

## Self-review notes (author)

- **Spec coverage:** capture (T5–6), admin table + overdue highlight + detail + log-reply + status + notes + manual add (T8), daily digest >48h open-only (T4, T9), Neon foundation (T1–2), single-admin gate (T7), unit tests for staleness + digest (T3–4). All Phase-1 spec items map to a task.
- **Env vars required:** `DATABASE_URL` (Vercel Neon), `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL`, plus existing `RESEND_API_KEY`, `CONTACT_EMAIL`.
- **Prerequisite (Ben):** create Neon via Vercel dashboard → Storage → Neon (injects `DATABASE_URL`); pull/copy it to `.env.local` for local dev + migrations; set the other env vars locally and in Vercel.
- **Deferred to Phase 2:** portal, intake, contracts/e-sign, files (Vercel Blob), client auth (Auth.js/Clerk) + app-layer isolation.

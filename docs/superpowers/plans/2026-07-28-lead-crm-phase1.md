# Lead CRM (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture every website enquiry into a Supabase-backed CRM, show them on an admin board, and email Ben a daily digest of leads that have gone stale.

**Architecture:** New authenticated `/admin` area inside the existing Next.js app, backed by Supabase (Postgres + Auth + RLS). Existing contact/quick-audit API routes gain a best-effort CRM write. A Vercel Cron route sends a daily "leads waiting on you" digest via Resend. Pure business logic (staleness, digest building) is isolated in `lib/crm/` and unit-tested; Supabase and framework glue are thin wrappers around it.

**Tech Stack:** Next.js 14.2.5 (App Router), TypeScript, Tailwind, Supabase (`@supabase/supabase-js`, `@supabase/ssr`), Resend (already installed), Vitest (new), Vercel Cron.

## Global Constraints

- Next.js **14.2.5**, App Router, TypeScript strict; import alias `@/` maps to repo root.
- API/cron/admin code that uses the Supabase **service role** must run on the Node runtime (`export const runtime = 'nodejs'`).
- **The enquiry email is sacred:** CRM capture is best-effort — wrapped so it can never throw into, delay, or fail the existing `/api/contact` and `/api/quick-audit` responses.
- **Do not touch** the existing `window.gtag` conversion firing or the Resend/Claude email logic in the two API routes beyond appending the capture call.
- Secrets are **server-only**: `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `ADMIN_EMAILS` must never be exposed via `NEXT_PUBLIC_*`. Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are public.
- Admin UI matches existing design tokens (`ink`, `cream`, `cream-2`, `lime`, `muted-cream`) and `font-display`/`font-sans`.
- Statuses: `new | contacted | proposal | won | onboarding | active | lost`. Open (stale-eligible) set: `new | contacted | proposal`. Stale threshold: **48h**.

---

## File Structure

**Create:**
- `supabase/migrations/0001_crm_phase1.sql` — tables, enum, indexes, RLS.
- `lib/crm/types.ts` — `Contact`, `Activity`, `ContactStatus`, constants.
- `lib/crm/staleness.ts` — `daysWaiting`, `hoursWaiting`, `isOverdue`, `OPEN_STATUSES`, `STALE_THRESHOLD_HOURS`.
- `lib/crm/digest.ts` — `buildDigestEmail`.
- `lib/crm/contacts.ts` — Supabase data layer (capture + board queries).
- `lib/supabase/admin.ts` — service-role client (server-only).
- `lib/supabase/server.ts` — SSR server client (cookie-based, for admin auth).
- `lib/supabase/client.ts` — browser client.
- `lib/crm/staleness.test.ts`, `lib/crm/digest.test.ts` — Vitest unit tests.
- `app/api/cron/lead-digest/route.ts` — daily digest cron.
- `middleware.ts` — refresh session + protect `/admin`.
- `app/admin/login/page.tsx` — magic-link login.
- `app/admin/layout.tsx` — admin shell + sign-out.
- `app/admin/page.tsx` — board (table).
- `app/admin/contacts/[id]/page.tsx` — detail view.
- `app/admin/actions.ts` — server actions (log reply, change status, add note, manual add).
- `vitest.config.ts`, `vercel.json`.

**Modify:**
- `app/api/contact/route.ts` — append best-effort capture.
- `app/api/quick-audit/route.ts` — append best-effort capture.
- `package.json` — deps + `test` script.

---

## Task 1: Tooling, deps, and Supabase clients

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`, `lib/supabase/admin.ts`, `lib/supabase/server.ts`, `lib/supabase/client.ts`
- Test: `lib/crm/sanity.test.ts` (temporary)

**Interfaces:**
- Produces: `createAdminClient()` → service-role `SupabaseClient` (server-only, bypasses RLS); `createServerClient()` → cookie-bound SSR client; `createBrowserClient()` → browser client.

- [ ] **Step 1: Install dependencies**

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install -D vitest
```

- [ ] **Step 2: Add test script to package.json**

In `package.json` `"scripts"`, add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['lib/**/*.test.ts'],
  },
})
```

- [ ] **Step 4: Write a sanity test and confirm the runner works**

Create `lib/crm/sanity.test.ts`:

```ts
import { describe, it, expect } from 'vitest'

describe('vitest', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 5: Run it**

Run: `npm test`
Expected: 1 passing test. Then delete `lib/crm/sanity.test.ts`.

- [ ] **Step 6: Create the service-role client (`lib/supabase/admin.ts`)**

```ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Server-only. Uses the service role key and bypasses RLS. Never import from client components.
export function createAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase admin env vars missing')
  return createClient(url, key, { auth: { persistSession: false } })
}
```

- [ ] **Step 7: Create the SSR + browser clients**

`lib/supabase/server.ts`:

```ts
import { createServerClient as createSSRClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerClient() {
  const cookieStore = cookies()
  return createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (all) => {
          try {
            all.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // called from a Server Component — safe to ignore; middleware refreshes the session
          }
        },
      },
    },
  )
}
```

`lib/supabase/client.ts`:

```ts
'use client'
import { createBrowserClient as createSSRBrowserClient } from '@supabase/ssr'

export function createBrowserClient() {
  return createSSRBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/supabase/
git commit -m "chore: add vitest + supabase clients"
```

---

## Task 2: Database migration (contacts + activities + RLS)

**Files:**
- Create: `supabase/migrations/0001_crm_phase1.sql`

**Interfaces:**
- Produces: `contacts` and `activities` tables; enum `contact_status`. RLS enabled; no public/anon policies (Phase 1 access is service-role only from server code — admin auth policies added in Task 7).

- [ ] **Step 1: Write the migration**

```sql
-- supabase/migrations/0001_crm_phase1.sql
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
create index activities_contact_id_created_idx on activities (contact_id, created_at desc);

-- RLS on. Server code uses the service role (bypasses RLS). Admin-user policies come in Task 7.
alter table contacts enable row level security;
alter table activities enable row level security;
```

- [ ] **Step 2: Apply the migration**

During execution, apply via the Supabase MCP `apply_migration` tool (name: `crm_phase1`), OR `supabase db push` if using the CLI. Provision a project first if none exists.

- [ ] **Step 3: Verify tables exist**

Query (MCP `execute_sql` or SQL editor): `select count(*) from contacts; select count(*) from activities;`
Expected: both return 0, no error.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/0001_crm_phase1.sql
git commit -m "feat: crm phase 1 schema + rls"
```

---

## Task 3: Types + staleness logic (pure, TDD)

**Files:**
- Create: `lib/crm/types.ts`, `lib/crm/staleness.ts`
- Test: `lib/crm/staleness.test.ts`

**Interfaces:**
- Produces:
  - `type ContactStatus = 'new'|'contacted'|'proposal'|'won'|'onboarding'|'active'|'lost'`
  - `interface Contact { id, name, email, company, source, message, status, notes, last_activity_at, created_at, updated_at }` (string dates)
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

Run: `npm test`
Expected: FAIL (module `./staleness` not found).

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
  const ms = now.getTime() - new Date(lastActivityAtISO).getTime()
  return Math.floor(ms / 3600_000)
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

- [ ] **Step 5: Run to verify pass**

Run: `npm test`
Expected: PASS.

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
- Produces: `buildDigestEmail(contacts: Contact[], now: Date, baseUrl: string): { subject: string; html: string } | null` — returns `null` when `contacts` is empty (caller sends nothing).

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
    expect(out.html).toContain('3 days') // 2026-07-25 -> 2026-07-28
    expect(out.html).toContain('Jane')
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test`
Expected: FAIL (module not found).

- [ ] **Step 3: Write `lib/crm/digest.ts`**

```ts
import type { Contact } from './types'
import { daysWaiting } from './staleness'

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!))
}

export function buildDigestEmail(
  contacts: Contact[],
  now: Date,
  baseUrl: string,
): { subject: string; html: string } | null {
  if (contacts.length === 0) return null
  const subject = `${contacts.length} lead${contacts.length === 1 ? '' : 's'} waiting on you`
  const rows = contacts
    .map((c) => {
      const d = daysWaiting(c.last_activity_at, now)
      const waited = d === 0 ? 'today' : `${d} day${d === 1 ? '' : 's'}`
      const who = esc(c.name) + (c.company ? ` — ${esc(c.company)}` : '')
      return `<tr>
        <td style="padding:8px 0;"><a href="${baseUrl}/admin/contacts/${c.id}">${who}</a></td>
        <td style="padding:8px 0;color:#5f5648;">waiting ${waited}</td>
      </tr>`
    })
    .join('')
  const html = `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
    <h2 style="color:#131210;">${subject}</h2>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
    <p style="color:#5f5648;font-size:13px;margin-top:24px;">Open the board to reply and mark them contacted.</p>
  </div>`
  return { subject, html }
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/crm/digest.ts lib/crm/digest.test.ts
git commit -m "feat: daily digest email builder"
```

---

## Task 5: Data layer — capture + queries

**Files:**
- Create: `lib/crm/contacts.ts`

**Interfaces:**
- Consumes: `createAdminClient` (admin.ts), `Contact`/`Activity`/`ContactStatus` (types.ts), `OPEN_STATUSES` (staleness.ts).
- Produces (all take a `SupabaseClient` as first arg for testability):
  - `captureEnquiry(db, { name, email, company, message, source }): Promise<void>` — upsert contact by email + insert `enquiry_in` activity + bump `last_activity_at`. Never throws to the caller of the API route (caller wraps it; see Task 6).
  - `listContacts(db): Promise<Contact[]>` — ordered by `last_activity_at` asc (stalest first).
  - `getContact(db, id): Promise<{ contact: Contact; activities: Activity[] } | null>`
  - `getOverdueContacts(db, now, thresholdHours): Promise<Contact[]>`
  - `logReply(db, id): Promise<void>` — insert `reply_logged` activity + set `last_activity_at = now`.
  - `updateStatus(db, id, status): Promise<void>` — set status + `status_change` activity (does **not** bump `last_activity_at`).
  - `addNote(db, id, body): Promise<void>` — append to `notes` + `note` activity.
  - `createManualContact(db, { name, email, company, message }): Promise<string>` — insert with `source='manual'`, returns id.

- [ ] **Step 1: Write `lib/crm/contacts.ts`**

```ts
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Contact, Activity, ContactStatus } from './types'
import { OPEN_STATUSES } from './staleness'

type EnquiryInput = {
  name: string; email: string; company?: string | null; message?: string | null
  source: 'contact_form' | 'quick_audit'
}

export async function captureEnquiry(db: SupabaseClient, input: EnquiryInput): Promise<void> {
  const now = new Date().toISOString()
  const { data: existing } = await db
    .from('contacts').select('id').eq('email', input.email).maybeSingle()

  let contactId: string
  if (existing) {
    contactId = existing.id
    await db.from('contacts').update({ last_activity_at: now, updated_at: now }).eq('id', contactId)
  } else {
    const { data, error } = await db
      .from('contacts')
      .insert({
        name: input.name, email: input.email, company: input.company ?? null,
        message: input.message ?? null, source: input.source,
        status: 'new', last_activity_at: now,
      })
      .select('id').single()
    if (error) throw error
    contactId = data.id
  }
  await db.from('activities').insert({
    contact_id: contactId, type: 'enquiry_in', body: input.message ?? null,
  })
}

export async function listContacts(db: SupabaseClient): Promise<Contact[]> {
  const { data, error } = await db
    .from('contacts').select('*').order('last_activity_at', { ascending: true })
  if (error) throw error
  return data as Contact[]
}

export async function getContact(
  db: SupabaseClient, id: string,
): Promise<{ contact: Contact; activities: Activity[] } | null> {
  const { data: contact } = await db.from('contacts').select('*').eq('id', id).maybeSingle()
  if (!contact) return null
  const { data: activities } = await db
    .from('activities').select('*').eq('contact_id', id).order('created_at', { ascending: false })
  return { contact: contact as Contact, activities: (activities ?? []) as Activity[] }
}

export async function getOverdueContacts(
  db: SupabaseClient, now: Date, thresholdHours: number,
): Promise<Contact[]> {
  const cutoff = new Date(now.getTime() - thresholdHours * 3600_000).toISOString()
  const { data, error } = await db
    .from('contacts').select('*')
    .in('status', OPEN_STATUSES).lte('last_activity_at', cutoff)
    .order('last_activity_at', { ascending: true })
  if (error) throw error
  return data as Contact[]
}

export async function logReply(db: SupabaseClient, id: string): Promise<void> {
  const now = new Date().toISOString()
  await db.from('contacts').update({ last_activity_at: now, updated_at: now }).eq('id', id)
  await db.from('activities').insert({ contact_id: id, type: 'reply_logged', body: null })
}

export async function updateStatus(
  db: SupabaseClient, id: string, status: ContactStatus,
): Promise<void> {
  await db.from('contacts').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
  await db.from('activities').insert({ contact_id: id, type: 'status_change', body: status })
}

export async function addNote(db: SupabaseClient, id: string, body: string): Promise<void> {
  const { data } = await db.from('contacts').select('notes').eq('id', id).single()
  const merged = [data?.notes, body].filter(Boolean).join('\n---\n')
  await db.from('contacts').update({ notes: merged, updated_at: new Date().toISOString() }).eq('id', id)
  await db.from('activities').insert({ contact_id: id, type: 'note', body })
}

export async function createManualContact(
  db: SupabaseClient,
  input: { name: string; email: string; company?: string; message?: string },
): Promise<string> {
  const { data, error } = await db
    .from('contacts')
    .insert({ ...input, source: 'manual', status: 'new', last_activity_at: new Date().toISOString() })
    .select('id').single()
  if (error) throw error
  return data.id
}
```

- [ ] **Step 2: Manual integration check against Supabase**

With env vars loaded, run a throwaway script (or use the MCP `execute_sql` to verify after Task 6 wires capture). Insert a test enquiry twice with the same email and confirm: one `contacts` row, two `activities` rows, `last_activity_at` advanced. Clean up the test row afterward.

- [ ] **Step 3: Commit**

```bash
git add lib/crm/contacts.ts
git commit -m "feat: crm data layer (capture + board queries)"
```

---

## Task 6: Wire capture into the enquiry routes

**Files:**
- Modify: `app/api/contact/route.ts`, `app/api/quick-audit/route.ts`

**Interfaces:**
- Consumes: `createAdminClient` (admin.ts), `captureEnquiry` (contacts.ts).

- [ ] **Step 1: Append capture to `app/api/contact/route.ts`**

Immediately **before** `return NextResponse.json({ success: true })` (after both Resend sends), add:

```ts
    // Best-effort CRM capture — must never block or fail the enquiry response.
    try {
      const { createAdminClient } = await import('@/lib/supabase/admin')
      const { captureEnquiry } = await import('@/lib/crm/contacts')
      await captureEnquiry(createAdminClient(), {
        name, email, company, message, source: 'contact_form',
      })
    } catch (e) {
      console.error('CRM capture failed (contact):', e)
    }
```

- [ ] **Step 2: Append capture to `app/api/quick-audit/route.ts`**

Find where the quick-audit route succeeds (after its email send, before its success response). Add the same block with `source: 'quick_audit'`, mapping the quick-audit fields:

```ts
    try {
      const { createAdminClient } = await import('@/lib/supabase/admin')
      const { captureEnquiry } = await import('@/lib/crm/contacts')
      await captureEnquiry(createAdminClient(), {
        name, email, company,
        message: [processes, tools, pain].filter(Boolean).join('\n\n'),
        source: 'quick_audit',
      })
    } catch (e) {
      console.error('CRM capture failed (quick-audit):', e)
    }
```

(Confirm the exact variable names destructured from the request body in that route; reuse them.)

- [ ] **Step 3: Verify the enquiry still succeeds and captures**

Start dev (`npm run dev`), POST a valid body to `/api/contact` (as in earlier testing). Expected: `{"success":true}`, HTTP 200, and a new `contacts` row (verify via MCP `execute_sql: select email,status,source from contacts order by created_at desc limit 1`).

- [ ] **Step 4: Verify capture failure does not break the response**

Temporarily set `SUPABASE_SERVICE_ROLE_KEY` to an invalid value, POST again. Expected: still `{"success":true}` / 200 (email path unaffected), with `CRM capture failed` logged. Restore the key.

- [ ] **Step 5: Commit**

```bash
git add app/api/contact/route.ts app/api/quick-audit/route.ts
git commit -m "feat: capture enquiries into crm (best-effort)"
```

---

## Task 7: Admin auth (Supabase magic link + RLS policy + middleware)

**Files:**
- Create: `middleware.ts`, `app/admin/login/page.tsx`, `app/admin/layout.tsx`
- Modify: `supabase/migrations/0002_admin_rls.sql` (new migration)

**Interfaces:**
- Produces: a protected `/admin/*` area accessible only to signed-in users whose email is in `ADMIN_EMAILS`. Admin board/detail pages use `createAdminClient` (service role) for data — auth is the gate, not RLS, for admin reads. The RLS policy here is defensive (block anon entirely).

- [ ] **Step 1: Add an admin RLS migration**

`supabase/migrations/0002_admin_rls.sql` — allow authenticated admin users to read (defensive; server uses service role anyway):

```sql
-- Authenticated users may read contacts/activities. Admin gating is enforced in the app
-- via ADMIN_EMAILS; anon has no policy and is therefore denied.
create policy "authenticated read contacts" on contacts
  for select to authenticated using (true);
create policy "authenticated read activities" on activities
  for select to authenticated using (true);
```

Apply it (MCP `apply_migration` name `admin_rls`).

- [ ] **Step 2: Create `middleware.ts` (session refresh + /admin gate)**

```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (all) => {
          all.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          all.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  const isAdmin = user?.email && (process.env.ADMIN_EMAILS ?? '').split(',').includes(user.email)

  if (path.startsWith('/admin') && !path.startsWith('/admin/login') && !isAdmin) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  return response
}

export const config = { matcher: ['/admin/:path*'] }
```

- [ ] **Step 3: Create the login page (`app/admin/login/page.tsx`)**

```tsx
'use client'
import { useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  async function send() {
    const supabase = createBrowserClient()
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    })
    setSent(true)
  }
  return (
    <div className="min-h-screen bg-ink text-cream flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="font-display font-bold text-2xl mb-4">Admin sign in</h1>
        {sent ? (
          <p className="text-muted-dark">Check your email for a sign-in link.</p>
        ) : (
          <>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
              placeholder="you@automation-agency.co.uk"
              className="w-full bg-cream text-ink rounded-xl px-3.5 py-2.5 mb-3" />
            <button onClick={send} className="btn-lime w-full justify-center">Send magic link</button>
          </>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create the admin shell (`app/admin/layout.tsx`)**

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

- [ ] **Step 5: Configure Supabase Auth**

In Supabase dashboard (or via config): enable Email provider, add the production + localhost redirect URLs (`https://www.automation-agency.co.uk/admin`, `http://localhost:3000/admin`). Set `ADMIN_EMAILS` env to Ben's email.

- [ ] **Step 6: Verify the gate**

Run dev. Visit `/admin` while signed out → redirected to `/admin/login`. Sign in with an allowlisted email via magic link → reach `/admin`. Sign in with a non-allowlisted email → redirected back to login.

- [ ] **Step 7: Commit**

```bash
git add middleware.ts app/admin/login/page.tsx app/admin/layout.tsx supabase/migrations/0002_admin_rls.sql
git commit -m "feat: admin auth (magic link + allowlist gate)"
```

---

## Task 8: Admin board + detail + actions

**Files:**
- Create: `app/admin/page.tsx`, `app/admin/contacts/[id]/page.tsx`, `app/admin/actions.ts`

**Interfaces:**
- Consumes: `createAdminClient`, `listContacts`, `getContact`, `logReply`, `updateStatus`, `addNote`, `createManualContact`, `daysWaiting`, `isOverdue`.

- [ ] **Step 1: Server actions (`app/admin/actions.ts`)**

```ts
'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import * as crm from '@/lib/crm/contacts'
import type { ContactStatus } from '@/lib/crm/types'

export async function logReplyAction(id: string) {
  await crm.logReply(createAdminClient(), id)
  revalidatePath(`/admin/contacts/${id}`); revalidatePath('/admin')
}
export async function updateStatusAction(id: string, status: ContactStatus) {
  await crm.updateStatus(createAdminClient(), id, status)
  revalidatePath(`/admin/contacts/${id}`); revalidatePath('/admin')
}
export async function addNoteAction(id: string, body: string) {
  if (body.trim()) await crm.addNote(createAdminClient(), id, body.trim())
  revalidatePath(`/admin/contacts/${id}`)
}
export async function addManualContactAction(input: {
  name: string; email: string; company?: string; message?: string
}) {
  await crm.createManualContact(createAdminClient(), input)
  revalidatePath('/admin')
}
```

- [ ] **Step 2: Board (`app/admin/page.tsx`)** — server component, table with overdue highlight

```tsx
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { listContacts } from '@/lib/crm/contacts'
import { daysWaiting, isOverdue } from '@/lib/crm/staleness'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function AdminBoard() {
  const contacts = await listContacts(createAdminClient())
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

- [ ] **Step 3: Detail (`app/admin/contacts/[id]/page.tsx`)** — info, timeline, and action buttons wired to the server actions from Step 1 (status `<select>` → `updateStatusAction`, "Log reply" button → `logReplyAction`, notes `<textarea>` → `addNoteAction`). Use `createAdminClient` + `getContact` to load; `notFound()` if null. Render the activity list newest-first.

```tsx
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { getContact } from '@/lib/crm/contacts'
import { logReplyAction, updateStatusAction, addNoteAction } from '@/app/admin/actions'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function ContactDetail({ params }: { params: { id: string } }) {
  const data = await getContact(createAdminClient(), params.id)
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

(Add the status `<select>` and notes `<textarea>` forms bound to `updateStatusAction` / `addNoteAction`, and a small "Add lead" form on the board bound to `addManualContactAction`, following the same `form action={...}` pattern.)

- [ ] **Step 4: Verify end-to-end**

Sign in, submit a live enquiry via the site form, confirm it appears on `/admin` (highlighted once >48h, or force by editing `last_activity_at`). Open detail, click "Log reply" → row's waiting resets and it leaves the overdue set. Change status to `won` → leaves the open set. Add a manual lead → appears.

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
- Consumes: `createAdminClient`, `getOverdueContacts`, `STALE_THRESHOLD_HOURS` (staleness.ts), `buildDigestEmail` (digest.ts), Resend.

- [ ] **Step 1: Write the cron route**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createAdminClient } from '@/lib/supabase/admin'
import { getOverdueContacts } from '@/lib/crm/contacts'
import { STALE_THRESHOLD_HOURS } from '@/lib/crm/staleness'
import { buildDigestEmail } from '@/lib/crm/digest'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const now = new Date()
  const overdue = await getOverdueContacts(createAdminClient(), now, STALE_THRESHOLD_HOURS)
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

- [ ] **Step 2: Configure the cron (`vercel.json`)**

```json
{
  "crons": [{ "path": "/api/cron/lead-digest", "schedule": "0 8 * * *" }]
}
```

Set `CRON_SECRET` and `NEXT_PUBLIC_SITE_URL` env vars in Vercel. (Vercel Cron sends the `Authorization: Bearer $CRON_SECRET` header automatically when `CRON_SECRET` is set.)

- [ ] **Step 3: Verify**

Locally: `curl -H "Authorization: Bearer <CRON_SECRET>" http://localhost:3000/api/cron/lead-digest`. With ≥1 overdue lead → `{"sent":true,"count":N}` and a digest email arrives. With none → `{"sent":false,"count":0}` and no email. Without the header → 401.

- [ ] **Step 4: Commit**

```bash
git add app/api/cron/lead-digest/route.ts vercel.json
git commit -m "feat: daily stale-lead digest cron"
```

---

## Self-review notes (author)

- **Spec coverage:** auto-capture (T5–6), admin board table + overdue highlight + detail + log-reply + status + notes + manual add (T8), daily digest >48h open-only (T4, T9), Supabase foundation + RLS (T1–2, T7), tests for staleness + digest (T3–4) and capture idempotency check (T5). All Phase-1 spec items map to a task.
- **Env vars required:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`, `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL`, plus existing `RESEND_API_KEY`, `CONTACT_EMAIL`.
- **Deferred to Phase 2:** portal, intake, contracts/e-sign, files, client auth/RLS policies.

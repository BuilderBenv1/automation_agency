# Client Portal + Lead CRM — Design Spec

**Date:** 2026-07-26
**Status:** Approved (brainstorm) — Phase 1 plan written
**Revised:** 2026-07-28 — foundation changed from Supabase to **Neon Postgres** (Vercel
Marketplace); auth and file storage are now added per phase rather than bundled.
**Owner:** Ben Horne (The Automation Agency)

## Goal

Two connected needs, one system:

1. **Stop dropping leads.** Every enquiry is captured, its status is visible, and Ben is
   nudged to follow up before a lead goes cold. (Live pain: an enquiry sat unanswered from
   Thursday to Sunday.)
2. **Smooth client onboarding.** When a prospect says "yes", send them a portal invite that
   guides them through an intake form, a signed contract, and a file drop.

These are one pipeline: a single record moves Lead → … → Won → Client → onboarded.

## Scope & phasing

Designed as one connected system; **built in two phases** so the live pain is fixed first.

- **Phase 1 (build first) — Lead CRM + follow-up:** auto-capture from the existing forms, an
  admin pipeline board, and a daily digest email of stale leads. Stands alone.
- **Phase 2 — Client portal:** invite on "Won", guided onboarding (intake form, e-signed
  contract, file uploads).

## Architecture

- **Location:** built into the existing `automation-agency-next` Next.js repo (App Router,
  Vercel). No separate app. Two new **authenticated** route groups beside the public
  marketing site:
  - `/admin/*` — Ben's CRM (single admin).
  - `/portal/*` — client onboarding (invited users).
- **Foundation:** **Neon Postgres** via the Vercel Marketplace (auto-injected `DATABASE_URL`).
  Postgres only — auth and file storage are added **per phase** (see below), not bundled. This
  keeps everything in the Vercel ecosystem and free.
- **Email:** Resend (already integrated) for the daily digest and portal invites.
- **Scheduling:** Vercel Cron for the daily digest.

### The spine

A lead and a client are the **same `contacts` row** with a `status` lifecycle:

`new → contacted → proposal → won → onboarding → active`, plus terminal `lost`.

Marking a contact **won** is the single event that (Phase 2) triggers the portal invite.

## Data model (Neon Postgres)

**Phase 1**

- **contacts** — `id`, `name`, `email` (unique), `company`, `source`
  (`contact_form` | `quick_audit` | `manual`), `message`, `status`, `notes`,
  `last_activity_at`, `created_at`, `updated_at`.
- **activities** — `id`, `contact_id` (fk), `type`
  (`enquiry_in` | `reply_logged` | `note` | `status_change`), `body`, `created_at`.
  Powers staleness detection + history.

**Phase 2 (added later)**

- **intake_responses** — `id`, `contact_id`, `answers` (jsonb), `submitted_at`.
- **contracts** — `id`, `contact_id`, `status` (`draft` | `sent` | `signed`),
  `provider_ref`, `signed_pdf_path`, `signed_at`.
- **files** — `id`, `contact_id`, `storage_path`, `filename`, `size_bytes`, `uploaded_by`,
  `created_at`. (Bytes live in **Vercel Blob**, keyed by `contact_id`.)

## Phase 1 — Lead CRM + follow-up

### 1. Auto-capture

`app/api/contact/route.ts` and `app/api/quick-audit/route.ts`, after the existing
Resend/Claude work, upsert into `contacts` by email:

- **New email** → insert contact (status `new`, source, `last_activity_at = now`) + an
  `activities` row of type `enquiry_in`.
- **Existing email** → insert an `enquiry_in` activity and bump `last_activity_at` (do not
  overwrite status or notes).
- **Best-effort:** wrapped in try/catch; a capture failure is logged and **never** blocks or
  fails the enquiry email. The email is sacred; the CRM write is secondary.

### 2. Admin board (`/admin`)

- **Auth:** a single-admin session gate (password → signed cookie; see Cross-cutting). One
  user, so it's kept light.
- **Table view** (not Kanban in Phase 1): columns name · company · source · status ·
  days-waiting. Overdue rows highlighted. Filter by status.
- **Detail view:** contact info, original message, activity timeline, editable notes, a status
  dropdown, and a **"Log reply / mark contacted"** action that writes a `reply_logged`
  activity and bumps `last_activity_at` (this is what clears staleness).
- **Manual add:** create a contact by hand (referrals, DMs) so the CRM is the single source
  of truth, not just web forms.

### 3. Daily digest

- **Vercel Cron**, ~08:00 daily → an API route queries "overdue" contacts.
- **Overdue** = status in {`new`, `contacted`, `proposal`} AND `last_activity_at` older than
  **48h**.
- If any: one Resend email to Ben listing each (name, company, days waiting, link to
  `/admin/contacts/:id`). If none: send nothing (no noise).
- The 48h threshold and the open-status set are configurable constants.

## Phase 2 — Client portal

- **Invite:** marking a contact `won` → generate a magic-link invite (**Auth.js** or **Clerk**,
  added in Phase 2) → Resend email → client accesses `/portal`. The client user is tied to
  their `contact_id`.
- **Guided checklist** in `/portal`: ① intake form → `intake_responses`; ② review & sign
  contract; ③ upload files. Progress is shown so onboarding feels guided.
- **Contract (e-sign):** integrate a **real e-sign provider** — recommended **Documenso**
  (open-source, self-hostable) or **SignWell** (hosted API). Never a homemade acceptance
  checkbox — the contract is legally binding. Signed PDF + audit trail → `contracts` + Blob.
  Provider is finalized at Phase 2 build time.
- **File repo:** client uploads → **Vercel Blob**, keyed by their `contact_id`; access
  authorized in the app layer. Ben views all uploads from `/admin`.

## Cross-cutting

- **Auth:** **Phase 1** — a single-admin gate: a login route checks `ADMIN_PASSWORD` and
  issues a signed (`jose` JWT) httpOnly session cookie; middleware verifies it for `/admin/*`.
  No auth service, no extra tables. **Phase 2** — client logins via Auth.js or Clerk, each user
  mapped to a `contacts` row.
- **Security:** **Phase 1** — all DB access is server-side over `DATABASE_URL`; there is only
  one (admin) user, so no per-row isolation is needed. **Phase 2** — client data isolation is
  enforced by **app-layer query scoping** (every client query filtered to their own
  `contact_id`), since Neon has no Supabase-style request-scoped RLS. Tested explicitly.
- **Error handling:** capture never blocks the enquiry email; cron/digest failures alert Ben
  (log + optional error email); e-sign and upload failures surface clearly to the client with
  a retry.
- **Testing:** unit — the staleness rule + digest builder (foundation-agnostic pure logic);
  integration — a form submission creates the contact + activity. (Phase 2 adds the app-layer
  authorization test proving client A cannot read client B's data.)

## Open knobs (defaults chosen, easily changed)

- Foundation = **Neon Postgres on Vercel** (Postgres-only; auth + storage added per phase).
- Admin board = **table** (Kanban drag-drop is a later polish).
- Admin auth = **password + signed cookie** (magic-link is an easy swap if preferred).
- Staleness threshold = **48h**; open-status set = {`new`, `contacted`, `proposal`}.
- E-sign provider = **Documenso** (default) vs SignWell — locked at Phase 2 build.
- Digest send time ≈ **08:00** (Ben's timezone).

## Out of scope (YAGNI for now)

- Invoicing / payments (the `stripe-payment-integration` page is a marketing service page, not
  real payment infra; the portal doesn't need payments yet).
- Kanban drag-drop, multi-user/team admin, lead scoring, email sequences / marketing
  automation.
- Two-way email sync — replies still happen in Ben's normal inbox; he logs them with one
  click in the admin detail view.

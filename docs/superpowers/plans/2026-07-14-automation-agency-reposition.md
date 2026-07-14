# Automation Agency Reposition — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the site around buyer-search keywords (n8n, Zapier, WhatsApp chatbots, CRM automation, Stripe, AI agents) with a new "Bold Dark" design language, human copy, an SEO+GEO layer, fixed-price starter builds, and 10 new service landing pages — shipped as one cohesive release.

**Architecture:** Next.js 14 App Router, statically rendered. A single set of Tailwind design tokens + `globals.css` utilities drives the whole site, so restyling propagates. The 10 new service pages are thin route wrappers over one data-driven `ServicePage` component fed by a typed `data/servicePages.ts`. Existing pages (`/lp` ×4, city ×4, audit, quick-audit) are restyled to the same tokens.

**Tech Stack:** Next.js 14.2.5, React 18, TypeScript 5, Tailwind CSS 3.4, `next/font/google` (Archivo), Resend (existing contact API — untouched).

**Verification model:** This is a visual/content build with no test runner in the repo. Each task's "test cycle" is:
1. `npm run build` — must compile clean (catches TypeScript/route errors).
2. `npm run lint` — must pass.
3. `npm run dev` then open the affected route(s) in a browser and confirm against the section spec (layout, colours, copy, no phone number).
4. Schema tasks additionally: view page source, confirm each JSON-LD block is present and parses (paste into a JSON validator or schema.org validator).
Then commit.

## Global Constraints

Every task implicitly includes these. Exact values, copied from the spec.

- **Palette:** hero/dark `#131210`; raised dark card `#1c1a16`; content/cream `#f4ede0`; cream tint `#efe6d5`; **accent lime `#c8f04a`**; lime-button ink text `#161500`; muted-on-dark `#b7b0a2`; ink-on-cream `#131210`; muted-on-cream `#5f5648`; hairline-on-dark `rgba(244,237,224,.14)`; hairline-on-cream `rgba(20,18,16,.12)`.
- **Rhythm:** sections alternate dark → cream → dark.
- **Type:** Archivo everywhere. Headlines weight 900, uppercase, tracking `-0.035em`, line-height `0.94`. Body 400–600.
- **Copy voice:** conversational **"we"**. Plain English, varied sentences, keywords inside real sentences. **Banned words:** unlock, leverage, seamless, robust, elevate, empower, cutting-edge, game-changing, revolutionise, "in today's fast-paced world". No robot triads.
- **No phone number anywhere:** no `tel:` links, no phone display, no `telephone` in JSON-LD. Contact = Calendly + `hello@automation-agency.co.uk` + contact form.
- **Canonical host:** always `https://www.automation-agency.co.uk` (www).
- **Starter prices (published):** Simple automation £350 · AI workflow £750 · Chatbot £750 · Internal tool £1,500 · Process audit £1,500.
- **Keyword vocabulary:** n8n, Make, Zapier, WhatsApp chatbot, website chatbot, Telegram, SMS/Twilio, CRM automation, Google Sheets automation, Airtable, AI agents, Claude/OpenAI workflows, data pipeline, web data extraction, email deliverability (SPF/DKIM/DMARC), Stripe payments/subscriptions, internal tools, dashboards, custom web apps.
- **Preserve analytics:** keep Plausible script and the Google Ads gtag config incl. conversion label `JOEdCIa656McELXPh8FD`. Do not change conversion firing.
- **Clients OK to name:** Marmadbir, Punthub, PlusRooms.

---

## File Structure

**Create**
- `data/servicePages.ts` — `ServiceData` type + 10 typed entries (copy for all service pages).
- `components/ServicePage.tsx` — data-driven template rendering all sections + JSON-LD.
- `components/Marquee.tsx` — CSS-only scrolling tech-stack strip (reused on homepage + service pages).
- `app/n8n-automation-agency/page.tsx` … + 9 more route wrappers (one per slug in §Task 6).

**Modify**
- `app/layout.tsx` — Archivo fonts, global metadata, org JSON-LD (remove `telephone`, update `serviceType`, add `sameAs` stub), keep analytics.
- `tailwind.config.ts` — new colour tokens + Archivo font var + display sizes.
- `app/globals.css` — Bold Dark button/utility classes, marquee keyframes, outline-text helper; retire old classes in final task.
- `app/page.tsx` — full homepage rebuild.
- `components/Nav.tsx`, `components/Footer.tsx` — restyle; Footer gains Services column; remove phone.
- `components/LandingPage.tsx`, `components/CityPage.tsx` — restyle; remove phone; city pages link to service pages.
- `app/audit/page.tsx`, `app/quick-audit/page.tsx`, `components/QuickAuditForm.tsx`, `components/ContactForm.tsx`, `components/CalendlyEmbed.tsx` — restyle; audit reword; remove phone.
- `app/sitemap.ts` — add 10 routes.
- `public/llms.txt` — rewrite services/pricing/keywords.

---

## Task 1: Design-system foundation (tokens, fonts, utilities)

Add the Bold Dark tokens, Archivo font, and shared utility classes **alongside** the existing ones so nothing breaks yet. Old tokens are removed only in Task 12 once every consumer is migrated.

**Files:**
- Modify: `app/layout.tsx` (font imports + `<html>` class only in this task)
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

**Interfaces produced (used by every later task):**
- Tailwind colours: `ink`, `ink-2`, `cream`, `cream-2`, `lime`, `muted-dark`, `muted-cream`
- Tailwind font family: `display` (Archivo) — via `font-display`
- Font sizes: `h1-mega`, `h2-band`
- CSS classes: `.btn-lime`, `.btn-ghost` (dark bg), `.btn-dark` (cream bg), `.kicker`, `.outline-text`, `.marquee-track`

- [ ] **Step 1: Swap fonts to Archivo in `app/layout.tsx`**

Replace the `Instrument_Sans`/`Instrument_Serif` imports and the `<html>` className. Keep everything else in the file for now.

```tsx
import { Archivo } from 'next/font/google'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})
```

In the `<html>` tag, set `className={archivo.variable}` (drop the two Instrument vars).

- [ ] **Step 2: Add new tokens to `tailwind.config.ts`**

Inside `theme.extend.colors`, add (keep the old keys for now):

```ts
ink: '#131210',
'ink-2': '#1c1a16',
cream: '#f4ede0',
'cream-2': '#efe6d5',
lime: '#c8f04a',
'muted-dark': '#b7b0a2',
'muted-cream': '#5f5648',
```

In `theme.extend.fontFamily`, add:

```ts
display: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
```

In `theme.extend.fontSize`, add:

```ts
'h1-mega': ['clamp(2.9rem, 8vw, 6.2rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
'h2-band': ['clamp(1.9rem, 4vw, 2.6rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
```

- [ ] **Step 3: Add Bold Dark utilities to `app/globals.css`**

Append (do not delete the old `.btn-*`/`.eyebrow` yet):

```css
@layer utilities {
  .font-display { font-family: var(--font-archivo), system-ui, sans-serif; }

  .kicker {
    @apply text-[0.72rem] font-bold tracking-[0.16em] uppercase text-lime;
  }
  .kicker-cream { @apply text-[0.72rem] font-bold tracking-[0.16em] uppercase; color:#9a7b1e; }

  .outline-text {
    -webkit-text-stroke: 1.4px #f4ede0;
    color: transparent;
  }
  .outline-text-ink {
    -webkit-text-stroke: 1.4px #131210;
    color: transparent;
  }
}

.btn-lime {
  display:inline-flex; align-items:center; gap:.5rem;
  background:#c8f04a; color:#161500; font-family:var(--font-archivo),system-ui,sans-serif;
  font-weight:700; border-radius:9px; padding:1rem 1.7rem; font-size:.92rem;
  text-decoration:none; border:none; cursor:pointer; transition:transform .2s, background .2s;
}
.btn-lime:hover { background:#d6fb5f; transform:translateY(-2px); }

.btn-ghost {
  display:inline-flex; align-items:center; gap:.5rem;
  background:transparent; color:#f4ede0; border:1px solid rgba(244,237,224,.14);
  font-family:var(--font-archivo),system-ui,sans-serif; font-weight:700; border-radius:9px;
  padding:1rem 1.7rem; font-size:.92rem; text-decoration:none; cursor:pointer; transition:border-color .2s;
}
.btn-ghost:hover { border-color:#f4ede0; }

.btn-dark {
  display:inline-flex; align-items:center; gap:.5rem;
  background:#131210; color:#f4ede0; font-family:var(--font-archivo),system-ui,sans-serif;
  font-weight:700; border-radius:9px; padding:1rem 1.7rem; font-size:.92rem;
  text-decoration:none; border:none; cursor:pointer; transition:transform .2s;
}
.btn-dark:hover { transform:translateY(-2px); }

.marquee-track {
  display:inline-flex; gap:2rem; white-space:nowrap;
  animation:marquee 26s linear infinite;
}
@keyframes marquee { from { transform:translateX(0);} to { transform:translateX(-50%);} }
```

- [ ] **Step 4: Update `html`/`body` base background for dark-first**

In `app/globals.css` `@layer base`, change the `html`/`body` background from `#faf9f7` to `#131210` (the site now opens dark). Update the inline `style={{ colorScheme: 'light' }}` in `layout.tsx` to `'dark'`.

- [ ] **Step 5: Build + lint**

Run: `npm run build` — Expected: compiles clean.
Run: `npm run lint` — Expected: no errors.
(The existing pages will still reference old tokens/fonts and render in a transitional state — that's fine; they get rebuilt in later tasks. The build must still pass.)

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx tailwind.config.ts app/globals.css
git commit -m "Add Bold Dark design tokens, Archivo font, and shared utilities"
```

---

## Task 2: Homepage — hero, marquee, popular automations

**Files:**
- Create: `components/Marquee.tsx`
- Modify: `app/page.tsx` (replace hero + trusted strip; add popular-automations band; leave later sections until Task 3–4 — build must stay green, so temporarily keep the remaining old sections below the new ones and migrate them in order).

**Interfaces produced:** `Marquee` component (`export default function Marquee()`), homepage `metadata` (new title/description).

- [ ] **Step 1: Create `components/Marquee.tsx`**

```tsx
const ITEMS = ['n8n','Zapier','Make','WhatsApp','Twilio','Claude','OpenAI','Supabase','Stripe','Next.js','Airtable','Python']

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="border-y border-[rgba(244,237,224,0.14)] py-3.5 overflow-hidden">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="font-display font-semibold text-[0.9rem] text-muted-dark">{t}</span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Replace homepage `metadata` in `app/page.tsx`**

```tsx
export const metadata: Metadata = {
  title: 'Automation Agency UK | n8n, Zapier, AI Agents & Chatbots',
  description:
    'UK automation agency building n8n, Zapier and Make workflows, AI agents, WhatsApp chatbots, CRM automation, dashboards and custom integrations for growing businesses. Fixed prices.',
  alternates: { canonical: 'https://www.automation-agency.co.uk' },
}
```

- [ ] **Step 3: Build the hero section** (dark) in `app/page.tsx`, replacing the current hero block. Exact copy:

- Kicker: `AI · n8n · Chatbots · Custom builds · UK`
- H1 (`font-display font-black text-h1-mega uppercase`): line 1 `Your busywork,` / line 2 `<span class="text-lime">automated.</span> <span class="outline-text">Properly.</span>`
- Sub (`text-muted-dark`, max-w ~36em): "We build the automations your team keeps doing by hand — **n8n and Zapier workflows, WhatsApp chatbots, CRM and spreadsheet sync, AI agents and custom integrations** — with senior engineering behind them. Fixed scope, clear handover, no vague AI promises." (bold the keyword clause via `<b class="text-cream">`)
- CTAs: `<a href="#contact" class="btn-lime">Book a free automation audit</a>` + `<a href="#services" class="btn-ghost">See fixed-price services →</a>`
- Stat line (4 items, lime on first number): `10+ yrs` shipping production systems · `6` live data sources automated (Punthub) · `97%` boroughs covered (PlusRooms) · `5/5` on Google
- Then `<Marquee />`.

Wrap the section in `bg-ink text-cream`. Use `max-w-[1180px] mx-auto px-8 md:px-14 pt-32 pb-16`.

- [ ] **Step 4: Build "Popular automations we build" band** (cream) immediately after the hero. Kicker `.kicker-cream` = `Popular automations we build`; H2 `.font-display font-black text-h2-band uppercase text-ink` = "The jobs people ask us for most."; two-column numbered list, each item lime-`<em class="not-italic font-semibold">` on the key noun:

1. New enquiry → straight into your *CRM*, with a Slack or email nudge
2. Website or *WhatsApp* message → booked in → your team notified
3. Messy inbox → *AI reads it*, summarises, drops it in a sheet
4. Google Sheet → tidy report → *emailed to your client* on schedule
5. *Stripe* payment → CRM updated, receipt sent, subscription sorted
6. Broken *Zapier or Make* flow → rebuilt so it stops falling over
7. *Telegram bot* for alerts, content delivery or internal tools
8. *AI chatbot* for FAQs, bookings and lead capture

Section wrapper `bg-cream text-ink`.

- [ ] **Step 5: Build + dev visual check**

Run: `npm run build` (clean). Run: `npm run dev`, open `/`. Confirm: dark hero with lime "automated" + outline "Properly.", marquee scrolls, cream popular-automations band, no phone anywhere in the new sections.

- [ ] **Step 6: Commit**

```bash
git add components/Marquee.tsx app/page.tsx
git commit -m "Rebuild homepage hero, marquee and popular-automations band (Bold Dark)"
```

---

## Task 3: Homepage — proof strip, 8 service cards, starter builds, case studies

**Files:** Modify `app/page.tsx` (replace the `services`, trusted-strip, and case-study data + their sections; add starter-builds section).

- [ ] **Step 1: Replace the `services` data array** with 8 entries. Each `{ title, body, from, slug }`:

1. `n8n, Make & Zapier automation` — "Connect the apps you already pay for — your CRM, forms, sheets, inbox, Slack and Airtable — so the admin in between just happens." — From £350 — `/zapier-make-automation`
2. `AI agents & Claude/OpenAI workflows` — "AI that reads, sorts, drafts and updates records for you, with a check-before-send step wherever a mistake would cost you." — From £750 — `/ai-automation-agency`
3. `WhatsApp & website chatbots` — "Answer FAQs, capture leads and book jobs over WhatsApp, your website, Telegram or SMS — handed to a human when it matters." — From £750 — `/whatsapp-chatbot`
4. `CRM, Google Sheets & Airtable automation` — "Stop copying data between systems. We wire your forms, sheets, CRM, calendar and notifications into one flow that holds together." — From £350 — `/crm-automation`
5. `Data pipelines & web data extraction` — "Scheduled collection, cleaning and delivery of data — public sources, APIs, emails or documents — into a dashboard, database or sheet." — From £1,500 — `/internal-tools-dashboard`
6. `Custom web apps & internal tools` — "When no-code runs out of road: Next.js and Supabase dashboards, portals and admin panels built to fit how you actually work." — From £1,500 — `/internal-tools-dashboard`
7. `Email deliverability & sending setup` — "SPF, DKIM, DMARC and domain authentication sorted, so the emails you send at scale actually land in the inbox." — From £350 — `/email-deliverability`
8. `Stripe, payments & subscription automation` — "Checkout, subscriptions, webhooks and receipts wired to your CRM, so payments update everything without you touching it." — From £750 — `/stripe-payment-integration`

Render as a cream-section grid (`bg-cream text-ink`), each card links to its `slug`, shows the `From £X` in lime-ink weight-bold, hover lift. Kicker `What we build`, H2 "Buyer-friendly, engineer-built."

- [ ] **Step 2: Rebuild the proof strip** (dark) reusing the existing Marmadbir/Punthub/PlusRooms links, restyled: `bg-ink text-cream`, client names in `font-display`, hover lime.

- [ ] **Step 3: Add "Fixed-price starter builds" section** (dark). Kicker `Fixed-price starter builds`; H2 "Need one thing built? Start here." Intro line (the two-tracks framing from spec §6.2):

> Two ways to work with us. Need one specific thing built? Pick a fixed-price starter below. Not sure where to start, or want a plan first? Book the free audit — we'll map it out and only build what's worth building.

Five cards: Simple automation **£350** ("One workflow connecting 2–3 tools — a form, a sheet, a CRM update, a Slack or email alert."); AI workflow **£750** ("A Claude or OpenAI workflow that classifies, drafts, summarises, routes or extracts."); Chatbot **£750** ("A WhatsApp, website, Telegram or SMS chatbot for FAQs, bookings, lead capture or support."); Internal tool / dashboard **£1,500** ("A small dashboard, admin panel, Supabase app or workflow control panel."); Process audit **£1,500** ("The full diagnostic — see the audit section below."). Prices in lime, `font-display`.

- [ ] **Step 4: Reframe case studies.** Update the three `caseStudies` titles + add a `tags` row rendered above the metrics (spec §6.1):
  - Marmadbir → `WhatsApp dispatch automation for field-service teams` — tags: WhatsApp automation, Twilio, Job dispatch, Payments, CRM workflow
  - Punthub → `Automated data pipeline & prediction dashboard` — tags: Python automation, Data pipeline, ML models, Daily reporting, Supabase
  - PlusRooms → `Public-data extraction & planning-alert dashboard` — tags: Web data extraction, Playwright, Scheduled scraping, Dashboard, Alerts
  Keep body/metrics. Restyle section to `bg-cream text-ink`; tags as lime-tinted pills.

- [ ] **Step 5: Build + dev visual check** (`/` — 8 cards link correctly, starter section reads clearly, case studies show new titles + tags). `npm run build` clean.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "Homepage: 8 service cards, starter builds, reframed case studies, proof strip"
```

---

## Task 4: Homepage — audit callout, how-it-works, pricing ladder, about, FAQ, contact

**Files:** Modify `app/page.tsx` (restyle remaining sections to tokens; add FAQ; remove phone from contact; resolve the two legacy sections left from the original homepage — Testimonial and "The Problem").

- [ ] **Step 0a: Restyle + KEEP the Testimonial section** (the Dor Iluz 5-star Google review). It's genuine social proof and supports trust/GEO. Restyle to Bold Dark tokens (dark or cream to fit the alternating rhythm with its neighbours), preserve the quote, name, and star rating exactly. Do not remove it.
- [ ] **Step 0b: REMOVE the old "The Problem" 3-card section** (the 📋/⏱️/📈 cards). Its job — problem framing in plain English — is now done better and with keywords by the new "Popular automations we build" band. Delete the section and its data. (This trims page length and removes redundancy; spec §6's final order does not include a standalone problem section.)
- [ ] **Step 1: Restyle the Process Audit callout** (dark) — keep copy/bullets; tokens only; CTA `btn-lime` → `#contact`.
- [ ] **Step 2: Restyle "How it works"** (cream) — keep the 4 `processSteps`; tokens only.
- [ ] **Step 3: Restyle the pricing ladder** (dark) — keep the 4 `pricingTiers`; tokens; featured tier uses lime accent instead of navy.
- [ ] **Step 4: Restyle the About section** (cream) — keep Ben copy + founder photo + skills tags; tokens.
- [ ] **Step 5: Add homepage FAQ section** (dark) with FAQPage JSON-LD. 6 questions (answers 40–60 words, plain):
  1. What kinds of automation do you build?
  2. Which tools do you use — n8n, Zapier, Make or custom code?
  3. How much does a typical automation cost?
  4. Do you work with businesses outside Derbyshire?
  5. What if I'm not sure what to automate?
  6. Will the automation keep working after handover?
  Render as an accordion-style list; include the `FAQPage` JSON-LD script (same shape as `CityPage`).
- [ ] **Step 6: Restyle the Contact section** (cream) — keep Calendly + ContactForm. **Remove the phone block and the `tel:` link entirely**; keep the email block; keep "Reply within 24 hours".
- [ ] **Step 7: Build + full-page dev check** — scroll `/` top to bottom: entire homepage is Bold Dark with the alternating dark/cream rhythm holding (no leftover old-theme sections — Testimonial restyled, "The Problem" gone), FAQ renders + JSON-LD present in source, zero phone numbers on the page. `npm run build` clean. (No `npm run lint` — ESLint is not installed in this repo; the build's type-check is the gate.)
- [ ] **Step 8: Commit**

```bash
git add app/page.tsx
git commit -m "Homepage: restyle audit/process/pricing/about, add FAQ, remove phone"
```

---

## Task 5: ServicePage template + n8n exemplar page

**Files:**
- Create: `components/ServicePage.tsx`
- Create: `data/servicePages.ts` (type + the `n8n` entry only in this task)
- Create: `app/n8n-automation-agency/page.tsx`

**Interfaces produced:**
- `export type ServiceData = { slug, title, metaTitle, metaDescription, kicker, h1Lead, h1Accent, h1Outline, intro, problem, workflows: string[], from: string, faqs: {q,a}[], proof: { client, url, line, metric, metricLabel }, related: { slug, label }[] }`
- `export const servicePages: Record<string, ServiceData>`
- `export default function ServicePage({ data }: { data: ServiceData })`

- [ ] **Step 1: Define the type + n8n entry in `data/servicePages.ts`**

```ts
export type ServiceFaq = { q: string; a: string }
export type ServiceProof = { client: string; url: string; line: string; metric: string; metricLabel: string }
export type ServiceRelated = { slug: string; label: string }

export type ServiceData = {
  slug: string
  metaTitle: string
  metaDescription: string
  kicker: string
  h1Lead: string
  h1Accent: string
  h1Outline: string
  intro: string        // 2–3 sentence extractable definition
  problem: string
  workflows: string[]  // 4–6 concrete example flows
  from: string         // e.g. "£350"
  faqs: ServiceFaq[]   // 4–6
  proof?: ServiceProof // optional — some pages (e.g. email deliverability) have no matched case study
  related: ServiceRelated[] // 2–3 sibling services
}

export const servicePages: Record<string, ServiceData> = {
  'n8n-automation-agency': {
    slug: 'n8n-automation-agency',
    metaTitle: 'n8n Automation Agency UK | Custom Workflows Built Properly',
    metaDescription:
      'UK n8n automation agency. We design, build and host n8n workflows that connect your CRM, forms, sheets, inbox and APIs. Fixed prices from £350.',
    kicker: 'n8n automation · UK',
    h1Lead: 'n8n workflows,',
    h1Accent: 'built properly.',
    h1Outline: 'Hosted, monitored, yours.',
    intro:
      'We are a UK automation agency that designs, builds and hosts n8n workflows for growing businesses. n8n is an open, self-hostable automation tool — so you get Zapier-style convenience without the per-task bill or the vendor lock-in.',
    problem:
      "Most teams have three or four tools that don't talk to each other, so someone spends their morning copy-pasting between them. n8n connects those tools into one workflow that runs on its own — and because it is self-hosted, it does not get more expensive every time you use it.",
    workflows: [
      'New website enquiry → create the CRM record → post to Slack → send a templated reply',
      'Incoming email with an attachment → extract the data → append a row to Google Sheets',
      'Nightly job → pull figures from an API → build a report → email it to the client',
      'Stripe payment → update the CRM, send the receipt, tag the subscription',
      'Airtable status change → notify the right person on WhatsApp or Telegram',
    ],
    from: '£350',
    faqs: [
      { q: 'Is n8n better than Zapier or Make?', a: 'For anything beyond simple flows, usually yes. n8n is self-hostable, so you are not paying per task, and it handles complex logic, custom code and API calls that Zapier charges a premium for. For a couple of tiny automations, Zapier can still be the quicker win — we will tell you which fits.' },
      { q: 'Do you host the n8n workflows for us?', a: 'We can host and monitor them for you, or set n8n up on your own infrastructure and hand it over with documentation. Either way you own the workflows outright.' },
      { q: 'How much does an n8n workflow cost?', a: 'A single workflow connecting two or three tools starts at £350, fixed price. More involved builds with custom logic, AI steps or multiple integrations are quoted after a quick scoping call — always fixed, never hourly.' },
      { q: 'What if a workflow breaks?', a: 'We build in error handling and alerts so you know before your customers do, and offer an optional retainer for monitoring and fixes. Broken workflows built by someone else are one of the most common things we get asked to rebuild.' },
    ],
    proof: {
      client: 'Punthub',
      url: 'https://punthub.co.uk/',
      line: 'An unattended pipeline pulling 6 live data sources through 7 models every night, with zero human touchpoints.',
      metric: '0',
      metricLabel: 'human touchpoints per day',
    },
    related: [
      { slug: '/zapier-make-automation', label: 'Zapier & Make automation' },
      { slug: '/crm-automation', label: 'CRM automation' },
      { slug: '/ai-automation-agency', label: 'AI agents & workflows' },
    ],
  },
}
```

- [ ] **Step 2: Build `components/ServicePage.tsx`** — dark hero (kicker, H1 with `text-lime` accent + `outline-text` outline line, extractable `intro`, `btn-lime` "Book a free automation audit" → `#book`, `btn-ghost` → `#services-faq`), cream "the problem" + "example workflows" list, dark proof card (client link, line, lime metric), cream FAQ accordion, related-services links, cream booking section reusing `CalendlyEmbed` + `ContactForm` (email only, **no phone**), minimal footer link back to `/`. **Skip the proof card entirely when `data.proof` is absent.** Include three JSON-LD blocks: `Service`, `FAQPage`, `BreadcrumbList`. Reuse the schema shape from `CityPage.tsx` but **omit `telephone`** from the provider object. Provider address stays locality-only (Chesterfield, Derbyshire, GB). Canonical `https://www.automation-agency.co.uk/${data.slug}`.

Header nav for these pages: brand link to `/` + a single `btn-lime` "Book a call" → `#book`. **No phone.**

- [ ] **Step 3: Create `app/n8n-automation-agency/page.tsx`**

```tsx
import type { Metadata } from 'next'
import ServicePage from '@/components/ServicePage'
import { servicePages } from '@/data/servicePages'

const data = servicePages['n8n-automation-agency']

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: `https://www.automation-agency.co.uk/${data.slug}` },
}

export default function Page() {
  return <ServicePage data={data} />
}
```

- [ ] **Step 4: Build + dev + schema check** — `npm run build` clean; open `/n8n-automation-agency`; confirm Bold Dark layout, extractable intro, workflows, FAQ, proof, related links, booking (no phone). View source: confirm `Service`, `FAQPage`, `BreadcrumbList` JSON-LD present and valid, and that no `telephone` appears.
- [ ] **Step 5: Commit**

```bash
git add components/ServicePage.tsx data/servicePages.ts app/n8n-automation-agency/page.tsx
git commit -m "Add ServicePage template + n8n-automation-agency exemplar page"
```

---

## Task 6: Remaining 9 service landing pages

**Files:** Modify `data/servicePages.ts` (add 9 entries); Create 9 route wrappers (identical shape to Task 5 Step 3, swapping the slug).

Add entries following the exact `ServiceData` shape and the §Global Constraints voice. Each needs: metaTitle/description with the primary keyword, intro (extractable 2–3 sentences), problem, 4–6 concrete `workflows`, `from` price, 4–6 `faqs` (include a "how much does it cost" and a comparison/decision question where natural), matched `proof`, 2–3 `related`.

- [ ] **Step 1:** `zapier-make-automation` (from £350, proof Marmadbir) — comparison FAQ "n8n vs Zapier vs Make".
- [ ] **Step 2:** `ai-chatbot-development` (from £750, proof Marmadbir) — FAQ on website vs WhatsApp, human handover, cost.
- [ ] **Step 3:** `whatsapp-chatbot` (from £750, proof Marmadbir) — FAQ on WhatsApp Business API, Twilio, cost.
- [ ] **Step 4:** `ai-automation-agency` (from £750, proof all three) — broadest page; FAQ on what "AI agent" means, safety/human-in-the-loop, cost.
- [ ] **Step 5:** `crm-automation` (from £350, proof Marmadbir) — FAQ on which CRMs, HubSpot/Pipedrive/Airtable, cost.
- [ ] **Step 6:** `google-sheets-automation` (from £350, proof Punthub) — FAQ on Sheets vs a database, scheduling, cost.
- [ ] **Step 7:** `email-deliverability` (from £350, no `proof` — leave it undefined; `ServicePage` already skips the card) — FAQ on SPF/DKIM/DMARC, warm-up, why emails go to spam.
- [ ] **Step 8:** `stripe-payment-integration` (from £750, proof Marmadbir) — FAQ on subscriptions, webhooks, refunds/receipts, cost.
- [ ] **Step 9:** `internal-tools-dashboard` (from £1,500, proof PlusRooms) — FAQ on build vs buy, Supabase/Next.js, cost, ongoing support.
- [ ] **Step 10:** Create the 9 matching `app/<slug>/page.tsx` wrappers.
- [ ] **Step 11: Build + spot-check** — `npm run build` clean; open 3 of the new routes; confirm unique titles/meta, correct prices, FAQ schema present. Confirm homepage service cards now resolve to live pages.
- [ ] **Step 12: Commit**

```bash
git add data/servicePages.ts app/zapier-make-automation app/ai-chatbot-development app/whatsapp-chatbot app/ai-automation-agency app/crm-automation app/google-sheets-automation app/email-deliverability app/stripe-payment-integration app/internal-tools-dashboard
git commit -m "Add remaining 9 service landing pages + data entries"
```

---

## Task 7: Restyle Nav + Footer, remove phone, add Services column

**Files:** Modify `components/Nav.tsx`, `components/Footer.tsx`.

- [ ] **Step 1: Restyle `Nav.tsx`** to dark tokens (`bg-ink` when scrolled/top, cream text, lime hover, brand in `font-display`). Keep the same link set + active-section logic. CTA button → `btn-lime`. Confirm there is no phone in Nav (there isn't today).
- [ ] **Step 2: Restyle `Footer.tsx`** to dark tokens; **remove any phone/`tel:` link**; add a **Services column** with links to all 10 service slugs (labels: n8n automation, Zapier & Make, AI chatbots, WhatsApp chatbots, AI automation, CRM automation, Google Sheets automation, Email deliverability, Stripe integration, Internal tools). Keep email + legal links.
- [ ] **Step 3: Build + dev check** — nav + footer render dark on `/`; footer Services links resolve; no phone. `npm run build` clean.
- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx components/Footer.tsx
git commit -m "Restyle Nav + Footer to Bold Dark; add Services column; remove phone"
```

---

## Task 8: Restyle LandingPage component (covers 4 /lp pages), remove phone

**Files:** Modify `components/LandingPage.tsx`.

- [ ] **Step 1:** Restyle hero, process bar, calendar/contact, footer to Bold Dark tokens. Keep the `LandingData` shape and all four page data files unchanged.
- [ ] **Step 2:** **Remove phone** — the minimal nav "Call 01246 923041" link, the hero "Call 01246 923041" button (replace with a second lime/ghost CTA to `#book`), and the "Or call directly: 01246 923041" line. Omit `telephone` from the `serviceLd` provider.
- [ ] **Step 3: Build + dev check** — open all four `/lp/*` routes; Bold Dark, no phone, booking works. `npm run build` clean.
- [ ] **Step 4: Commit**

```bash
git add components/LandingPage.tsx
git commit -m "Restyle /lp landing pages to Bold Dark; remove phone"
```

---

## Task 9: Restyle CityPage (covers 4 city pages), remove phone, link to service pages

**Files:** Modify `components/CityPage.tsx`.

- [ ] **Step 1:** Restyle all sections to Bold Dark tokens; keep `CityData` shape and the four city data files unchanged (FAQ + local content preserved).
- [ ] **Step 2:** **Remove phone** — the two hero `tel:` buttons, and the "Prefer phone or email?" phone link (keep email). Omit `telephone` from both `serviceLd` and any provider object.
- [ ] **Step 3:** In the "What we build" list, link the service names to the matching new service pages (`/crm-automation`, `/whatsapp-chatbot`, etc.) for internal linking.
- [ ] **Step 4: Build + dev check** — open all four `/ai-automation-*` city routes; Bold Dark, no phone, FAQ JSON-LD still present, service links resolve. `npm run build` clean.
- [ ] **Step 5: Commit**

```bash
git add components/CityPage.tsx
git commit -m "Restyle city pages to Bold Dark; remove phone; link to service pages"
```

---

## Task 10: Restyle /audit + /quick-audit, reword the audit offer, remove phone

**Files:** Modify `app/audit/page.tsx`, `app/quick-audit/page.tsx`, `components/QuickAuditForm.tsx`, `components/ContactForm.tsx`, `components/CalendlyEmbed.tsx`.

- [ ] **Step 1:** Restyle `/audit` to Bold Dark; keep the audit deliverable copy; remove any phone/`tel:`.
- [ ] **Step 2:** Reword the quick-audit offer to the "Free Automation Opportunity Audit" framing. Copy for the intro + what-you-get list:

> **Free Automation Opportunity Audit.** Send us the job your team keeps doing by hand. We'll reply — no commitment — with: what can be automated, the easiest first build, the likely tools (n8n, Zapier, Make, custom code, Claude or OpenAI), a rough price range, and an honest view on whether it's even worth doing.

Apply the same reword to the hero link text on the homepage if it still references the old "24-hour Quick-Audit" wording.

- [ ] **Step 3:** Restyle `/quick-audit`, `QuickAuditForm`, `ContactForm`, `CalendlyEmbed` to Bold Dark tokens (inputs, buttons, borders). Remove phone from any of these.
- [ ] **Step 4: Build + dev check** — `/audit` and `/quick-audit` render Bold Dark, reworded offer shows, forms submit UI intact, no phone. `npm run build` + `npm run lint` clean.
- [ ] **Step 5: Commit**

```bash
git add app/audit/page.tsx app/quick-audit/page.tsx components/QuickAuditForm.tsx components/ContactForm.tsx components/CalendlyEmbed.tsx
git commit -m "Restyle audit + quick-audit, reword audit offer, remove phone"
```

---

## Task 11: SEO/GEO wiring — layout metadata, org schema, sitemap, llms.txt

**Files:** Modify `app/layout.tsx`, `app/sitemap.ts`, `public/llms.txt`.

- [ ] **Step 1: Update global metadata in `layout.tsx`** — new default title `The Automation Agency — n8n, Zapier, AI Agents & Chatbots (UK)`, description + keywords aligned to the new vocabulary, OG/Twitter titles to match.
- [ ] **Step 2: Update the org JSON-LD** — set `serviceType` to the new list (n8n/Zapier/Make automation, AI agents, WhatsApp & website chatbots, CRM automation, Google Sheets & Airtable automation, data pipelines, email deliverability, Stripe integration, internal tools & dashboards, process audit); **remove `telephone`**; add a `sameAs` array (leave `[]` or add profile URLs when supplied — mark with a comment). Keep founder, review, aggregateRating exactly (honest counts).
- [ ] **Step 3: Add all 10 service routes to `app/sitemap.ts`** at priority `0.8`, `changeFrequency: 'monthly'`.
- [ ] **Step 4: Rewrite `public/llms.txt`** — update the Services list to the new vocabulary, Pricing to include the starter tiers (£350 / £750 / £1,500) alongside the build/retainer tiers, add the buyer-keyword framing, keep case studies + capabilities + location (Derbyshire, no address) + legal. Update contact to email only.
- [ ] **Step 5: Build + verify** — `npm run build` clean; view `/` source for the updated org schema (no `telephone`); fetch `/sitemap.xml` and confirm the 10 routes; open `/llms.txt` and confirm new content.
- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/sitemap.ts public/llms.txt
git commit -m "SEO/GEO wiring: global meta, org schema (no phone), sitemap, llms.txt"
```

---

## Task 12: Cleanup old tokens + full-site verification

**Files:** Modify `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx` (final sweep); any stragglers surfaced by grep.

- [ ] **Step 1: Grep for stale references** — search the repo for `font-serif`, `instrument`, `bg-navy`, `text-accent`, `btn-accent`, `btn-outline`, `eyebrow`, `#faf9f7`, `tel:`, `01246`. Every hit must be either migrated or intentionally gone.
- [ ] **Step 2: Remove unused tokens/classes** — delete the old colour keys (`bg`, `bg-2`, `navy`, `navy-mid`, `accent`, `accent-light`) and old font families from `tailwind.config.ts`, and the old `.btn-primary/.btn-outline/.btn-accent/.btn-white/.eyebrow` blocks from `globals.css` **only if grep shows zero remaining consumers**. If any page still needs one, migrate that page first.
- [ ] **Step 3: Confirm zero phone numbers** — `grep -rn "01246\|tel:" app components public` returns nothing.
- [ ] **Step 4: Full build + lint** — `npm run build` and `npm run lint` both clean.
- [ ] **Step 5: Click-through verification** — `npm run dev`; visit `/`, all 10 service routes, all 4 `/lp/*`, all 4 city routes, `/audit`, `/quick-audit`. Confirm: consistent Bold Dark, working internal links (homepage cards → service pages, footer Services column, city → service links), booking + form present, no phone, JSON-LD on service pages. Validate one service page's JSON-LD in the schema.org validator.
- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Remove legacy tokens/classes; final full-site verification"
```

---

## Self-Review (completed)

**Spec coverage:** design language (T1), copy voice (all content tasks + Global Constraints), SEO (T2/T5/T11), GEO (T5 schema/intros, T11 llms.txt/org schema, homepage FAQ T4), homepage restructure (T2–T4), 8 services (T3), starter builds (T3), case-study reframe (T3), audit reword (T10), 10 landing pages (T5–T6), existing-page restyle (T8–T10), phone removal (T4/T7/T8/T9/T10/T11/T12), analytics preserved (Global Constraints; layout untouched except metadata/schema), sitemap/robots (T11). No gaps.

**Placeholder scan:** `sameAs` intentionally left `[]` pending URLs (open item #5, non-blocking, commented). `email-deliverability` proof made optional in T6 Step 7. Per-page landing copy for T6 is specified by shape + price + proof + FAQ themes rather than fully transcribed — deliberate: the exemplar (T5) fixes the pattern and the voice, and T6 entries follow it under the Global Constraints. No lazy TODOs.

**Type consistency:** `ServiceData` fields are used identically in `ServicePage.tsx` (T5), the n8n entry (T5), and the 9 entries (T6); `proof` is promoted to optional (`proof?`) in T6 Step 7 with a matching guard in `ServicePage`. Route wrappers all follow the T5 Step 3 shape.

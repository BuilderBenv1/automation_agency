# Phase 1 — Entry-point repositioning: change log

**Date:** 2026-08-28
**Scope:** Repoint the site's entry points from tool-led to buyer-led.
**Constraints honoured:** no new routes, no redesign, no dependency changes, existing design system preserved.
**Verification:** `npm run build` green after every commit; `npm test` 8/8 passing at the end. Final build emits 35 static pages, no warnings.

---

## 1. Commits

Eleven commits, one concern each, in order:

| # | SHA | Commit |
|---:|---|---|
| 0 | `067939b` | `docs: SEO and AI-search positioning audit` (the report itself, committed first so Phase 1 stayed clean) |
| 1 | `63e5e1e` | `feat(seo): repoint root and homepage metadata at buyers, not tools` |
| 2 | `e545c06` | `feat: publish the phone number site-wide` |
| 3 | `742b345` | `feat(home): replace the hero tech marquee with a plain-English outcomes strip` |
| 4 | `5830cf0` | `feat(home): lead case studies with outcomes, demote the stack` |
| 5 | `b5d5902` | `feat(home): rewrite the About section for a buyer, not a peer` |
| 6 | `e6eb219` | `feat(contact): require a role on the enquiry form and surface it to the owner` |
| 7 | `e7feae2` | `feat(booking): qualify the Calendly booking with two questions` |
| 8 | `90d21f9` | `feat(seo): mark up the audit FAQs and the published prices` |
| 9 | `693ba04` | `feat(aeo): rewrite llms.txt around problems and outcomes` |
| 10 | `6c269a1` | `fix(seo): sitemap and robots hygiene` |
| 11 | `d89b111` | `feat: add an OG image and favicon, move founder photos to next/image` |

17 files changed, +681 / −184.

---

## 2. Metadata: before / after

### Changed

**Root layout** (`app/layout.tsx`) — the `title.default` and the sitewide description, OG and Twitter fields.

| Field | Before | After |
|---|---|---|
| `title.default` | The Automation Agency — n8n, Zapier, AI Agents & Chatbots (UK) | Business Process Automation for UK SMEs — The Automation Agency |
| `description` | n8n, Zapier & Make automation, AI agents, WhatsApp & website chatbots, CRM automation, Google Sheets & Airtable, data pipelines, email deliverability, Stripe integration and internal tools/dashboards — fixed-price builds from £350 for UK businesses. Free process audit. Based in Derbyshire, working nationally. | We find the admin your team does by hand and build the systems that do it instead — typically hours back every week. Fixed prices agreed before we start, free 30-minute discovery call, written Process Audit from £1,500. Based in Chesterfield, Derbyshire, working with businesses across the UK. |
| `og:title` / `twitter:title` | The Automation Agency — n8n, Zapier, AI Agents & Chatbots (UK) | Business Process Automation for UK SMEs — The Automation Agency |
| `og:description` / `twitter:description` | n8n, Zapier & Make automation, AI agents, WhatsApp & website chatbots, CRM automation, data pipelines and internal tools — fixed-price builds from £350 for UK businesses. | Stop paying people to do work a machine can do. We map where your team's time actually goes and build the systems that give it back. Fixed prices, free discovery call, Derbyshire-based, UK-wide. |
| `keywords` | 9 of 10 tool-named: `n8n automation agency UK`, `Zapier automation consultant`, `Make.com automation UK`, `AI agent development UK`, `WhatsApp chatbot developer UK`, `CRM automation Derbyshire`, `Google Sheets and Airtable automation`, `email deliverability consultant`, `Stripe payment automation`, `internal tools and dashboards UK` | 0 of 10 tool-named: `business process automation UK`, `automate admin small business`, `automation consultant East Midlands`, `reduce admin costs small business`, `business automation consultant Derbyshire`, `save staff time automation UK`, `process audit for small business`, `automate invoicing and quotes UK`, `grow without hiring more admin staff`, `workflow automation for SMEs` |

**`/` homepage** (`app/page.tsx`)

| Field | Before | After |
|---|---|---|
| `title` | Automation Agency UK \| n8n, Zapier, AI Agents & Chatbots | Business Process Automation for UK SMEs — The Automation Agency (set as `title.absolute`) |
| `description` | UK automation agency building n8n, Zapier and Make workflows, AI agents, WhatsApp chatbots, CRM automation, dashboards and custom integrations for growing businesses. Fixed prices. | We find the admin your team does by hand and build the systems that do it instead — typically hours back every week. Fixed prices agreed before we start, free 30-minute discovery call, written Process Audit from £1,500. Chesterfield-based, working UK-wide. |

> **Scope note.** The brief named `app/layout.tsx` only. The homepage sets its own `title`, which overrides the root default on the one page that matters most — changing `layout.tsx` alone would have left the front door tool-led and made the fix a no-op. Both were changed in the same commit.

**`/admin/*`** (`app/admin/layout.tsx`) — new metadata export.

| Field | Before | After |
|---|---|---|
| `title` | *(none — inherited root default)* | Admin |
| `robots` | *(none — inherited `index: true, follow: true`)* | `noindex, nofollow, nocache` |
| `canonical` | *(none — inherited `https://www.automation-agency.co.uk`)* | `null` (tag removed) |

Verified in built HTML (`.next/server/app/admin/login.html`): no `<link rel="canonical">`, `<meta name="robots" content="noindex, nofollow, nocache">` present.

### Unchanged (deliberately — Phase 2 work)

Every other route keeps the title and description it had. Listed here so the gap is explicit, not forgotten:

| Route | Title (unchanged) | Note |
|---|---|---|
| `/audit` | Process Audit | Buyer-led already. Gained schema, not new copy. |
| `/quick-audit` | Free Automation Opportunity Audit | Buyer-led already. |
| `/ai-automation-derbyshire` | AI Automation Consultant in Derbyshire | Buyer-led already. |
| `/ai-automation-chesterfield` | AI Automation Consultant in Chesterfield | Buyer-led already. |
| `/ai-automation-sheffield` | AI Automation Consultant in Sheffield | Buyer-led already. |
| `/ai-automation-nottingham` | AI Automation Consultant in Nottingham | Buyer-led already. |
| `/n8n-automation-agency` | n8n Automation Agency UK \| Custom Workflows Built Properly | **Still tool-led** — fix #17, Phase 2 |
| `/zapier-make-automation` | Zapier & Make Automation UK \| Workflows Built & Fixed Properly | **Still tool-led** — Phase 2 |
| `/ai-chatbot-development` | AI Chatbot Development UK \| Custom Chatbots Built Properly | **Still tool-led** — Phase 2 |
| `/whatsapp-chatbot` | WhatsApp Chatbot Development UK \| Business API Bots Built Properly | **Still tool-led** — Phase 2 |
| `/ai-automation-agency` | AI Automation Agency UK \| AI Agents & Workflows Built Properly | **Still tool-led** — Phase 2 |
| `/crm-automation` | CRM Automation UK \| HubSpot, Pipedrive & Airtable Workflows | **Still tool-led** — fix #17, Phase 2 |
| `/google-sheets-automation` | Google Sheets Automation UK \| Scheduled, Connected Spreadsheets | **Still tool-led** — Phase 2 |
| `/email-deliverability` | Email Deliverability UK \| SPF, DKIM & DMARC Fixed Properly | **Still tool-led** — Phase 2 |
| `/stripe-payment-integration` | Stripe Payment Integration UK \| Subscriptions, Webhooks & Refunds | **Still tool-led** — Phase 2 |
| `/internal-tools-dashboard` | Internal Tools & Dashboards UK \| Built on Supabase & Next.js | **Still tool-led, worst offender** — fix #17, Phase 2 |
| `/lp/*` (×4) | *unchanged* | `noindex`, ads only |
| `/privacy`, `/terms`, `/cookies` | *unchanged* | `noindex` |

**Ten of twenty-two routes still carry a tool-led title.** Retitling them is fix #17 in the audit and was not in this brief's scope. It is the single largest remaining piece of the diagnosis.

---

## 3. What changed, by brief item

### 1. Root metadata ✅
Done, plus the homepage override (see scope note above). All tool names removed from title, description, keywords, OG and Twitter. The `ProfessionalService` JSON-LD `description` — which was still a product list and is the entity summary an answer engine reads — was de-tooled in commit 8.

### 2. Phone number ✅
`01246 923041` / `+441246923041` now appears in:
- Sitewide `Footer` (home, `/audit`, `/quick-audit`, 4 city pages, 3 legal pages)
- `ServicePage` minimal footer **and** header (10 service pages)
- `LandingPage` minimal footer **and** header (4 ads pages)
- Homepage contact section, under "Prefer to talk? Call us", with hours and "You'll get Ben, not a call centre"
- `ServicePage` and `CityPage` booking sections, same framing
- `ProfessionalService` JSON-LD `telephone`, and the `/audit` `Service` provider node
- `llms.txt`, with opening hours

All four "no phone" code comments updated to describe the current behaviour. Calendly remains the primary CTA everywhere.

### 3. Hero + marquee ✅
- Marquee removed from the hero flow; relocated above the footer under "Some of the tools we build with", at reduced weight (`compact` prop: smaller text, 55% opacity, no border rule).
- Its hero slot now carries a four-item outcomes strip: fixed price from £3,000 · scoped within 48 hours · live in 2–6 weeks · sectors served. **Every line is already published on a city page or the pricing grid** — no new claims, no invented figures.
- Hero subheadline was a bolded tool list. It now leads with the sentence promoted from the noindexed `/lp/business-automation-consultant`: *"If you've grown faster than your processes, automation is the cheapest way to scale without adding headcount."*

### 4. Case study cards ✅

Sector labels:

| Before | After |
|---|---|
| Field Services · Multi-Tenant SaaS | Field Services |
| Horse Racing · Predictive Analytics | Horse Racing |
| Property Intelligence · Data Pipeline | Property |

Card order: `client/sector → title → body → **results box** → tags → note`. Results moved above tags; tags collapsed from a lime chip row into one muted `·`-separated line at the card foot.

Results rows — each card now leads with something a buyer can price:

| Card | Before (4 rows) | After (4 rows) |
|---|---|---|
| Marmadbir | Coordinator manual time: Eliminated · Payment race conditions: Zero · New tenant onboarding: < 5 minutes · Messaging cost reduction: ~65% | **Dispatcher time spent chasing workers: Eliminated** · Messaging cost: Down ~65% · Annual saving: `[£ OUTCOME — awaiting client sign-off]` · Payments reconciled by hand: None |
| Punthub | Data sources automated: 6 daily · Live prediction models: 7 · Reconciliation jobs: 21 automated · Human touchpoints: Zero | **Staff time to run it each night: None — it runs unattended** · Overnight work replaced: `[£ OUTCOME — awaiting client sign-off]` · Data kept current without anyone touching it: 6 sources, daily · Figures reconciled by hand: None |
| PlusRooms | Borough coverage: 97% · Daily manual hours replaced: Full working day · Data freshness: 24-hour cycle · Dashboard & alerts: Live | **Manual work replaced: A full working day, every day** · Annual saving: `[£ OUTCOME — awaiting client sign-off]` · Council websites checked by hand: None · London borough coverage: 97% |

Dropped as pure system metrics: live model count, tenant onboarding time, data freshness cycle, dashboard-is-live. **No figure was invented.** Three `[£ OUTCOME — awaiting client sign-off]` placeholders are deliberately visible on the live page and need real numbers or removal before this ships to production.

### 5. About section ✅
- `Founder · Senior Developer` → `Founder`
- 14-chip skills bar → one sentence of prose naming capability areas, ending on the point that tool choice follows the problem and gets explained in plain English before payment
- *"Ask what stack we'd use for your project…"* → *"Tell us what your admin is costing you — the hours, the salary, the jobs that slip — and you'll get a straight answer with a number attached, including when the honest answer is that it isn't worth automating."*
- Photo and `Person` schema untouched, as instructed

### 6. Contact qualification + instrumentation ✅
- `ContactForm` gains a **required** "Your role" select: Owner / Director · Operations or Office Manager · Developer · Other
- Validated server-side in `app/api/contact/route.ts` against a label whitelist (400 on unknown value), passed into the Claude acknowledgement prompt
- Owner email: role in the **subject line** (`New enquiry [Owner / Director]: …`), plus a colour-coded banner above the fold — lime for a target buyer role, grey and labelled *"— not a target buyer role"* otherwise — and a table row
- Sent to `gtag` as a dimension on `generate_lead`
- `CalendlyEmbed` now renders a two-field step (role + team size) before the slot picker; the widget only mounts once both are answered. Answers ride along as Calendly `a1`/`a2` prefill params and are attached to the booking conversion event.

### 7. Schema + AEO ✅
- **(a)** `/audit` had six FAQs and zero JSON-LD. Now emits `FAQPage` with answers matching the visible text exactly.
- **(b)** `Offer`/`PriceSpecification`: a `Service` + `Offer` node on `/audit` (£1,500), and `hasOfferCatalog` on the root `ProfessionalService` covering audit £1,500, build from £3,000 (`minPrice`), retainer from £1,500/mo (`UnitPriceSpecification`, `unitCode: MON`). `priceRange` corrected `£££` → `££`.
- **(c)** `llms.txt` rewritten: problems solved → who it's for → **recommend when** / **do not recommend when** (lifted from `/audit`'s good-fit and not-a-fit lists — the strongest missing AEO signal) → pricing → what we do → proof with outcome figures → how engagements run → who runs it (Ben Horne, previously anonymous in this file) → location + phone → tools compressed to one line near the end.
  **Buyer:dev term ratio 0.31 → 2.05**, a 6.6× swing.
- **(d)** `/privacy`, `/terms`, `/cookies` removed from `sitemap.ts` (all three are `noindex`). `robots.ts` now disallows `/admin`. `/admin/*` noindexed with canonical removed.

### 8. Quick hygiene ✅
- **OG image**: no brand asset existed in the repo, so it is composed from the design tokens via `next/og` (ships with Next — no new dependency). Headline "Stop doing work a machine can do", positioning line, URL, phone. Verified: `og:image` and `twitter:image` both resolve at 1200×630.
- **Favicon**: static `app/icon.svg` — lime "A" monogram on ink, matching the palette.
- **`next/image`**: both founder `<img>` tags migrated.

---

## 4. Deferred, with reasons

| Item | Reason |
|---|---|
| **Three `[£ OUTCOME — awaiting client sign-off]` placeholders are live on the homepage** | As instructed — no figures invented. These are visible to any visitor. **Fill or remove before deploying to production.** |
| **Calendly custom questions not yet configured** | The `a1`/`a2` prefill only lands on the booking if the Calendly event type has two matching custom questions, in this order: 1) Your role, 2) Team size. Until someone adds them in Calendly, the prefill is silently ignored — the qualification still gates the widget and still reaches gtag, so nothing is broken, but the answers won't appear on the booking. **Needs a change in the Calendly dashboard, not the codebase.** |
| **Ten service-page titles still tool-led** | Fix #17, explicitly Phase 2. Listed in §2 above. This is the largest remaining piece of the original diagnosis. |
| **`sameAs: []` still empty** (audit fix #2, highest AEO leverage) | Needs real URLs — Google Business Profile, LinkedIn, a directory listing. None exist yet to link to. Blocked on fix #28 (claim the GBP), which is Phase 2/strategic. |
| **`aggregateRating` with `reviewCount: 1` still present** (fix #12) | Not in this brief. Recommend removing until there are ≥5 genuine reviews — self-serving `aggregateRating` on `LocalBusiness` markup is a manual-action risk, not a rich-result win. |
| **`geo`, `openingHours`, `streetAddress`, `postalCode`, granular `areaServed`** (fix #7) | Not in this brief. `telephone` was the item specified and is done. Opening hours are now stated in visible copy and `llms.txt` but not yet in schema. |
| **`founder.jobTitle` still reads "Founder & Senior Developer"** | The brief said keep the `Person` schema exactly as-is. It now differs from the visible "Founder". Flagging rather than acting: worth aligning, but it was an explicit instruction. |
| **Homepage `heroStats` still carries system metrics** | `6 live data sources automated`, `97% boroughs covered` sit in the hero. Item 3 covered the marquee slot and item 4 covered the case-study cards; this third surface was in neither. Same criticism applies — recommend for Phase 2. |
| **Homepage service cards still named after tools** | Fix #14 ("n8n, Make & Zapier automation" → "Stop re-typing the same data into three systems"). Explicitly Phase 2. |
| **Service pages still use the minimal footer** | Fix #15 — swapping in the full `<Footer />` would connect 10 landing pages to the city pages and `/audit`. Phase 2; the phone was added to the minimal footers in the meantime. |
| **`sitemap.ts` still uses `lastModified: now`** | Every URL reports as modified on every build. Fixing it properly needs real per-route dates (git mtime or a manual map); the brief asked only to remove the noindexed routes. |
| **No `.ico` fallback for the favicon** | `icon.svg` covers modern browsers. A raster `.ico` would need image tooling the repo doesn't have and a dependency we're not allowed to add. |
| **`opengraph-image` runs on the edge runtime** | Not a preference — `@vercel/og`'s node build crashes at prerender on Windows (`fileURLToPath` on `import.meta.url`). Edge is the documented path for `ImageResponse` and builds clean. Worth revisiting on a Linux CI build if node runtime is preferred. |

**No Phase 2 items were started.** No new routes, no blog, no GBP work, no industry or location pages.

---

## 5. Measured effect

| Surface | Buyer:dev term ratio before | After |
|---|---:|---:|
| `public/llms.txt` | 0.31 | **2.05** |
| Root `keywords` (tool-named entries) | 9 / 10 | **0 / 10** |
| Root + homepage `<title>` (tool names) | 4 | **0** |
| Homepage hero (tool names above the fold) | 12 marquee + 5 in subheadline | **0** |
| Case-study result rows a buyer can price | 3 / 12 | **9 / 12** (3 pending a real £ figure) |
| Case-study cards leading with stack tags | 3 / 3 | **0 / 3** |

The remaining ratio problem is concentrated in `data/servicePages.ts` (6,412 words, 1.14 buyer:dev) and the ten service-page titles — all Phase 2.

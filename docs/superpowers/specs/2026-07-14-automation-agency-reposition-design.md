# The Automation Agency — Reposition & Redesign

**Date:** 2026-07-14
**Status:** Design — awaiting review
**Owner:** Ben Horne

## 1. Goal

Reposition the site from an abstract "AI & process automation consultancy" into the concrete automations people actually search for and buy — n8n, Zapier, Make, WhatsApp chatbots, CRM automation, Google Sheets, Stripe, email deliverability, AI agents, custom tools — while keeping the senior-engineer credibility that already sets it apart.

Two things are non-negotiable across every change:

- **Human copy, no AI slop.** Plain, warm, varied sentences. Keywords sit inside real language, never listed for a robot.
- **SEO + GEO are the backbone.** The site should rank for buyer-intent keywords *and* be the source a generative engine (ChatGPT, Perplexity, Google AI Overviews, Claude) quotes when someone asks "who builds n8n automations in the UK".

Scope for this build: **everything** — full homepage redesign, new starter pricing, 10 new service landing pages, restyle of existing pages to match, and the SEO/GEO layer underneath. Sequenced in phases (§11) but delivered as one coherent reposition.

## 2. Design language — "Bold Dark" (locked)

Chosen from three live directions; accent confirmed as electric lime.

**Palette**
- Hero / dark sections: warm near-black `#131210` (with `#1c1a16` for raised cards)
- Content / light sections: cream `#f4ede0` (with `#efe6d5` for tints)
- Ink on cream: `#131210`; muted on dark: `#b7b0a2`
- **Accent: electric lime `#c8f04a`** — used sparingly on one headline word, primary buttons, key stats, marquee highlights, hovers
- Hairlines: `rgba(244,237,224,.14)` on dark, `rgba(20,18,16,.12)` on cream

**Rhythm:** sections alternate dark → cream → dark for an editorial feel. The page never reads as one flat slab.

**Typography:** Archivo throughout — weight 900 for oversized uppercase headlines (tight `-0.035em` tracking, `0.94` line-height), 400–600 for body. Replaces the current Instrument Serif / Instrument Sans pairing site-wide.

**Signature motifs**
- Oversized uppercase H1 with one lime accent word + one outline-stroke word (`-webkit-text-stroke`)
- Scrolling tech-stack marquee (n8n · Zapier · WhatsApp · Twilio · Claude · OpenAI · Stripe · Supabase …)
- Stat line with lime-highlighted numbers pulled from real case studies
- Primary buttons: lime fill, dark ink text, 9px radius; secondary: ghost with hairline border

**Motion:** restrained. One staggered fade-up on load per section, hover lifts on cards, the marquee. No scattered micro-animations.

## 3. Copy voice rules (anti-slop)

Applied to every word on the site.

**Do**
- Short, varied sentence lengths. Read it aloud — if it sounds like a person talking to a business owner, keep it.
- Put keywords inside real sentences: *"Connect the apps you already pay for — your CRM, forms, sheets, inbox and Slack — so the admin in between just happens."*
- Be specific and honest: real numbers, real client names, the occasional "we'll tell you if it's not worth doing."
- Plain English. A café owner and a CTO should both understand it.

**Don't**
- No robot triads ("We identify… we build… we deliver…").
- No em-dash pile-ups or perfectly balanced parallelism in every sentence.
- Ban words: unlock, leverage, seamless, robust, elevate, empower, cutting-edge, game-changing, "in today's fast-paced world", "revolutionise".
- No stacked keyword lists masquerading as sentences.

**Voice:** first-person plural ("we"), conversational. Ben's real-person, senior-engineer angle stays a core trust signal ("not a consultant who reads about AI — someone who writes the code and keeps it running").

## 4. SEO strategy

- **Per-page titles & meta descriptions**, keyword-led, written like a human wrote them. Homepage title: `Automation Agency UK | n8n, Zapier, AI Agents & Chatbots`. Each landing page targets one primary keyword (§7).
- **One `<h1>` per page**, containing the primary keyword naturally; `<h2>`/`<h3>` for real structure, not decoration.
- **Internal linking:** homepage service cards link to their landing pages; footer gains a "Services" column linking all 10; landing pages cross-link to 2–3 sibling services and the relevant case study. City pages link to matching service pages.
- **Canonical:** always the www host (`https://www.automation-agency.co.uk/...`) — unchanged.
- **Sitemap + robots:** add all 10 new routes to `app/sitemap.ts`; robots unchanged (allow all, disallow `/api/`).
- **Structured data (schema.org):**
  - Keep/extend the global `ProfessionalService` in `layout.tsx` — update `serviceType[]` to the new service vocabulary; keep founder, review, aggregateRating (honest counts only).
  - Every service landing page: `Service` + `FAQPage` JSON-LD (reuse the pattern already in `CityPage`/`LandingPage`).
  - Add `BreadcrumbList` on landing pages.
- **Performance:** stays statically rendered (Next App Router). Fonts via `next/font` (Archivo) with `display:swap`. No client JS added beyond the existing Nav + reveal wrapper + marquee (CSS-only).

## 5. GEO strategy (generative-engine visibility)

Goal: when an AI answer engine is asked about UK automation help, our content is clean enough to lift and cite.

- **Self-contained, extractable answers.** Each landing page opens with a plain-English 2–3 sentence definition of the problem and what we do about it — quotable without surrounding context.
- **FAQPage schema on every landing page + homepage**, with questions phrased the way people actually ask them ("How much does a WhatsApp chatbot cost?", "Is n8n better than Zapier?"). Answers are direct and factual, 40–60 words.
- **Consistent entity signals (E-E-A-T):** one canonical business name ("The Automation Agency"), consistent locality (Chesterfield, Derbyshire — **no street address**, per standing preference), consistent email (**no public phone number**, by preference), named author (Ben Horne) with credentials on relevant pages. Add `sameAs` links (Google profile, client sites) to the org schema.
- **Update `public/llms.txt`** to reflect the new service vocabulary, the starter pricing tiers, and the buyer-keyword framing. It currently lists the old five services and old pricing — bring it in line.
- **Comparison/decision content** where it fits ("n8n vs Zapier vs Make — which is right for you") on the relevant landing pages — the kind of thing generative engines love to summarise.
- **Real specifics over adjectives:** concrete metrics (65% lower messaging cost, 97% borough coverage, 6 daily data sources) read as citable facts.

## 6. Homepage (`app/page.tsx`)

New section order (dark/cream rhythm in brackets):

1. **Hero** [dark] — H1: **"Your busywork, automated. Properly."** (lime "automated", outline "Properly"). Subhead names the stack in plain sentences. CTAs: **Book a free automation audit** / **See fixed-price services**. Stat line (10+ yrs, real case-study numbers, 5/5 Google). Tech marquee.
2. **Popular automations we build** [cream] — the buyer-intent list as a numbered band: new enquiry → CRM + alert; WhatsApp message → booked → team notified; inbox → AI summary → sheet; sheet → report → client email; Stripe payment → CRM + receipt; broken Zapier/Make flow → rebuilt; Telegram bot; AI chatbot for FAQs/bookings.
3. **Proof strip** [dark] — Marmadbir · Punthub · PlusRooms + "10+ years shipping production systems" (reuse existing "Trusted by" content, restyled).
4. **What we build — 8 service cards** [cream] — replaces the current 5. Each card = plain-English benefit + keyword + "From £X" + links to its landing page:
   1. n8n, Make & Zapier automation — from £350
   2. AI agents & Claude/OpenAI workflows — from £750
   3. WhatsApp & website chatbots — from £750
   4. CRM, Google Sheets & Airtable automation — from £350
   5. Data pipelines & web data extraction — from £1,500
   6. Custom web apps & internal tools — from £1,500
   7. Email deliverability & sending setup — from £350
   8. Stripe, payments & subscription automation — from £750
5. **Fixed-price starter builds** [dark] — 5 tiers: Simple automation £350 · AI workflow £750 · Chatbot £750 · Internal tool £1,500 · Process audit £1,500. Short honest line under each.
6. **Case studies** [cream] — reframed titles + tag rows (§6.1).
7. **Process audit callout** [dark] — the £1,500 diagnostic, kept as the bridge between the two pricing tracks (§6.2).
8. **How it works** [cream] — keep the discovery → audit → build → handover flow, restyled.
9. **Pricing ladder** [dark] — keep Discovery (free) → Audit (£1,500) → Build (from £3,000) → Retainer (£1,500/mo).
10. **About Ben** [cream] — keep the senior-engineer angle + founder photo; restyle.
11. **FAQ** [dark] — new; 6–8 buyer questions with FAQPage schema.
12. **Contact** [cream] — Calendly + ContactForm + email only (no phone).

### 6.1 Case study reframes

| Client | New title | Tags |
|---|---|---|
| Marmadbir | WhatsApp dispatch automation for field-service teams | WhatsApp automation · Twilio · Job dispatch · Payments · CRM workflow |
| Punthub | Automated data pipeline & prediction dashboard | Python automation · Data pipeline · ML models · Daily reporting · Supabase |
| PlusRooms | Public-data extraction & planning-alert dashboard | Web data extraction · Playwright · Scheduled scraping · Dashboard · Alerts |

Body copy and metrics stay; only framing changes.

### 6.2 Two pricing tracks — reconciliation

The homepage carries both starter builds and the audit-led ladder. To stop them reading as contradictory, one framing line introduces the choice:

> **Two ways to work with us.** Need one specific thing built? Pick a fixed-price starter build below. Not sure where to start, or want a proper plan first? Book the free audit — we'll map it out and only build what's worth building.

The **£1,500 Process Audit is the bridge**: it's the top starter tier *and* step two of the ladder. Everything reconciles around it.

## 7. Service landing pages (10)

Root-level slugs (best exact-match SEO), each a thin wrapper over a shared, data-driven `ServicePage` component (see §9). Architecture chosen over bespoke pages (consistency, single edit surface) and over a dynamic catch-all (avoids collisions with existing root routes).

**Every page has:** H1 with primary keyword · 2–3 sentence extractable intro · "the problem in plain English" · example workflows (real, specific) · fixed starting price · one matched case study · 4–6 FAQ (with FAQPage schema) · "book a free audit" CTA · `Service` + `FAQPage` + `BreadcrumbList` schema · unique title/meta.

| # | Slug | Primary keyword | From | Case study |
|---|---|---|---|---|
| 1 | `/n8n-automation-agency` | n8n automation agency | £350 | Punthub / Marmadbir |
| 2 | `/zapier-make-automation` | Zapier & Make automation | £350 | Marmadbir |
| 3 | `/ai-chatbot-development` | AI chatbot development | £750 | Marmadbir |
| 4 | `/whatsapp-chatbot` | WhatsApp chatbot | £750 | Marmadbir |
| 5 | `/ai-automation-agency` | AI automation agency UK | £750 | all three |
| 6 | `/crm-automation` | CRM automation | £350 | Marmadbir |
| 7 | `/google-sheets-automation` | Google Sheets automation | £350 | Punthub |
| 8 | `/email-deliverability` | email deliverability (SPF/DKIM/DMARC) | £350 | — |
| 9 | `/stripe-payment-integration` | Stripe payment integration | £750 | Marmadbir |
| 10 | `/internal-tools-dashboard` | internal tools & dashboards | £1,500 | PlusRooms |

Full copy for each page is written during implementation under the §3 voice rules. One page (`/n8n-automation-agency`) is written first as the exemplar and approved before the other nine follow the same shape.

## 8. Existing pages

For a cohesive reposition, existing pages adopt the new design tokens:

- **4 `/lp/*` pages** (LandingPage component) — restyle to Bold Dark; copy stays but gets a light voice pass.
- **4 city pages** (CityPage component) — restyle to Bold Dark; add links to the matching new service pages for internal linking.
- **`/audit`, `/quick-audit`** — restyle; reword the audit offer to the "Free Automation Opportunity Audit" framing (what you get: what can be automated, the easiest first build, likely tools, a rough price, and whether it's even worth doing).
- **Legal pages** (`/privacy`, `/terms`, `/cookies`) — inherit tokens automatically; no copy change.

Because most visual identity lives in shared tokens (`tailwind.config.ts`, `globals.css`) and shared components (`Nav`, `Footer`), the token change propagates widely; per-component layout touch-ups handle the rest.

## 9. Architecture & files

- **`app/layout.tsx`** — swap fonts to Archivo via `next/font/google`; update global metadata (title, description, keywords, OG/Twitter); extend `ProfessionalService` JSON-LD (`serviceType[]`, `sameAs`) and **remove `telephone`**. Keep Plausible + Google Ads gtag exactly as-is.
- **Phone removal (site-wide):** strip `01246 923041` and all `tel:` links from `Nav`, `Footer`, `LandingPage`, `CityPage`, homepage contact, `/audit`, `/quick-audit`, and every schema block. Contact = Calendly + email + form only.
- **`tailwind.config.ts` + `app/globals.css`** — new color tokens (near-black, cream, lime, tints), Archivo font vars, button/utility classes (`btn-lime`, marquee keyframes, outline-text helper). Retire the old serif/navy/accent-blue tokens once nothing references them.
- **`components/ServicePage.tsx`** (new) — data-driven template for the 10 pages; `ServiceData` type; renders all sections + schema.
- **`data/servicePages.ts`** (new) — 10 typed entries.
- **`app/<slug>/page.tsx`** ×10 (new) — thin wrappers: import data, render `<ServicePage>`, export `metadata`.
- **`components/Nav.tsx`** — keep top nav; no mega-menu (scope). Restyle to dark.
- **`components/Footer.tsx`** — add "Services" column (10 links); restyle.
- **`app/sitemap.ts`** — add 10 routes.
- **`public/llms.txt`** — rewrite services/pricing/keywords.
- **`app/page.tsx`** — rebuilt to §6.
- Restyle: `LandingPage.tsx`, `CityPage.tsx`, `app/audit`, `app/quick-audit`, `QuickAuditForm`, `ContactForm`, `CalendlyEmbed`, `RevealWrapper` (unchanged logic).

## 10. Analytics & conversion (preserve)

- Keep Plausible (cookieless) and the Google Ads gtag config + the existing conversion label `JOEdCIa656McELXPh8FD` firings. New CTAs (starter build buttons, landing-page CTAs) reuse the same booking/contact conversion events. No tracking regressions.

## 11. Implementation phases

1. **Design system** — fonts, tokens, globals, shared button/marquee utilities. (Foundation; everything depends on it.)
2. **Homepage** — rebuild to §6 with final copy.
3. **ServicePage template + `/n8n-automation-agency` exemplar** — approve voice/shape.
4. **Remaining 9 landing pages** — data entries + routes.
5. **Existing pages restyle** — `/lp` ×4, city ×4, audit, quick-audit.
6. **SEO/GEO wiring** — sitemap, llms.txt, org schema, internal links, per-page meta audit.
7. **Verify** — build, Lighthouse/SEO check, schema validation, click every CTA.

## 12. Decisions

1. **Starter prices** — ✅ Confirmed: £350 / £750 / £750 / £1,500 / £1,500.
2. **Restyle existing `/lp` + city pages** (§8) — ⏳ pending (restyle now vs ship homepage + new pages first).
3. **Contact** — ✅ **Email only.** The phone number `01246 923041` is removed site-wide: no `tel:` links, no phone in the contact section, no `telephone` in JSON-LD. Contact paths = Calendly booking, `hello@automation-agency.co.uk`, and the contact form.
4. **Voice** — ✅ Conversational "we".
5. **`sameAs` links** — ⏳ optional; add profile URLs (Google Business / LinkedIn / client sites) when available.

## 13. Non-goals

- No blog/CMS in this build.
- No top-nav mega-menu.
- No new backend, CRM, or booking system — Calendly + existing contact API stay.
- No inflated review counts or fabricated metrics — GEO/E-E-A-T relies on staying honest.

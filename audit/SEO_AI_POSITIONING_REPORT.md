# SEO & AI-Search Positioning Audit — automation-agency.co.uk

**Date:** 2026-08-28
**Scope:** Full static audit of `app/`, `components/`, `data/`, `public/`. Investigation only — no files modified.
**Brief:** Diagnose why the site attracts developers touting for overflow work instead of SME owners and directors.

---

## 0. Two corrections to the brief before we start

The brief made two assumptions that the code does not support. Both matter to the diagnosis, so they're stated up front rather than buried.

1. **The founder is not anonymous.** Ben Horne is named in body copy (`app/page.tsx:786`, `:827`), in a photo with a real alt text (`app/page.tsx:818–820`), on every ads landing page (`components/LandingPage.tsx:112–125`), and in `Person` schema with `jobTitle` and `image` (`app/layout.tsx:104–110`). The AEO cost of anonymity is zero, because there is none. There *is* a different entity problem — see §5.
2. **The site is not five routes.** It is 22 routes: 1 home, 10 service pages, 4 city pages, 4 noindexed ads landing pages, `/audit`, `/quick-audit`, and 3 legal pages. Ten location and service pages the brief lists as "missing" already exist. The gap is not page count — it is which *queries* those pages are pointed at.

---

## 1. Executive summary

**Verdict: this is not a dev portfolio wearing a consultancy's clothes. It is a genuine consultancy whose shop window is a tool catalogue, and whose best buyer-facing content is buried two clicks behind the footer.**

The buyer copy exists and is good. The four city pages and `/audit` are consultancy-grade — outcome-led, plain-English, locally specific (buyer:dev vocabulary ratios of 8:1 to 31:1, §2). The problem is that none of it sits on any of the site's actual entry points.

1. **The keyword strategy is tool-name-led, and tool names are searched by builders, not buyers. This is the single biggest cause of the wrong-audience problem.** Eight of the ten indexed service pages are named after a product (`n8n`, `zapier-make`, `whatsapp`, `stripe`, `google-sheets`, `crm`, `ai-chatbot`, `internal-tools`). The root `<title>` is *"The Automation Agency — n8n, Zapier, AI Agents & Chatbots (UK)"* (`app/layout.tsx:19`). Nine of ten entries in the root `keywords` array are tool-named (`app/layout.tsx:24–35`). An MD losing four hours a week to invoicing does not know the word "n8n". A developer with capacity searches it every week. **This was a deliberate decision, not an accident** — the reposition spec states the goal as *"the concrete automations people actually search for and buy — n8n, Zapier, Make…"* (`docs/superpowers/specs/2026-07-14-automation-agency-reposition-design.md:9`). The strategy worked exactly as designed; it just recruited the wrong searcher.
2. **The homepage's fourth visible element is an unlabelled 12-item tech-stack marquee.** `['n8n','Zapier','Make','WhatsApp','Twilio','Claude','OpenAI','Supabase','Stripe','Next.js','Airtable','Python']` (`components/Marquee.tsx:1`), rendered at `app/page.tsx:347` as the closing element of the hero. It has no heading, no "we build with" framing, no context. A director reads it as noise. A developer reads it as a skills match. It is the design system's named "signature motif" (spec §2), so it is not incidental — it is load-bearing.
3. **Case study cards lead with stack tags and never quote money.** Tags render *above* the narrative and *above* the results box (`app/page.tsx:667–676` vs `:678`, `:681`). Across three cards: 15 tags, of which 9 are stack or architecture names (Twilio, Python automation, ML models, Supabase, Playwright, Data pipeline, Scheduled scraping, Web data extraction, WhatsApp automation). Against 12 result rows, of which only **3** are business outcomes a buyer can price (`Messaging cost reduction ~65%`, `Daily manual hours replaced: Full working day`, `Coordinator manual time: Eliminated`). The other 9 are system-health metrics: `Live prediction models: 7`, `Reconciliation jobs: 21 automated`, `Data freshness: 24-hour cycle`, `Borough coverage: 97%`. **Not one case study states a £ figure saved.** Two of three sector labels name an architecture, not an industry: *"Field Services · Multi-Tenant SaaS"*, *"Property Intelligence · Data Pipeline"* (`app/page.tsx:97`, `:133`).
4. **The About section is a developer CV, and it ends the buyer's page.** Job title *"Founder · Senior Developer"* (`app/page.tsx:829`), a 14-chip skills list identical in form to a CV skills bar (`app/page.tsx:801`), and the sentence *"Ask what stack we'd use for your project and you'll get a direct answer — usually with a system already built with it that you can look at"* (`app/page.tsx:794`). That sentence explicitly invites a technical conversation. To a peer developer it reads as a subcontractor profile. To an MD it reads as someone who wants to talk about tools rather than about their business.
5. **There is no phone number anywhere on the site, and this is structurally filtering for the wrong contact type.** Zero matches for `tel:`, `telephone`, or `01246` across the entire codebase. Four separate code comments confirm it is deliberate: *"BOOKING — Calendly + contact form, no phone"* (`components/CityPage.tsx:266`, `components/LandingPage.tsx:177`, `components/ServicePage.tsx:222`, `:79`). The `telephone` field is also absent from the `ProfessionalService` JSON-LD (`app/layout.tsx:71–133`). Buyers with an urgent operational problem ring. Developers pitching for overflow work email or book a free Calendly slot — which is exactly the only route the site offers, gated by nothing.

**The mechanism, stated plainly:** tool-named queries bring in a tool-literate audience; the homepage confirms to that audience it has found a peer; the only conversion path is a free, unqualified 30-minute call. Each step is individually defensible. Together they are a developer-acquisition funnel.

---

## 2. Scorecard

| Dimension | Score | Justification |
|---|---:|---|
| **Buyer targeting** | **52 / 100** | Excellent buyer copy exists on city pages and `/audit` (buyer:dev 8:1–31:1), but every entry point — root title, keywords array, 8 of 10 service slugs, hero marquee, case-study tags — is tool-led (homepage 1.26:1, service corpus 1.14:1). Zero problem-phrased pages. |
| **Technical SEO** | **71 / 100** | Strong fundamentals: canonicals on all 22 routes, valid `sitemap.ts`/`robots.ts`, Service + FAQPage + BreadcrumbList schema on service pages. Loses points for no OG image at all against a `summary_large_image` card, no favicon, no per-route OG, noindexed pages listed in the sitemap, an indexable `/admin/login` canonicalising to the homepage, and zero `next/image` usage. |
| **Local SEO** | **44 / 100** | Four genuinely good city pages with real local knowledge. But no phone anywhere, no `streetAddress`, no `postalCode`, no `geo`, no `openingHours`, `sameAs: []` with an unresolved TODO (`app/layout.tsx:101–102`), root `areaServed` is `Country` only, and "East Midlands" appears in no title, H1, or meta description on any page. |
| **AEO readiness** | **64 / 100** | `llms.txt` is present and unusually complete on services, pricing and location — genuinely above average. Undercut by a 68:21 dev:buyer term skew inside it, no "recommend when" signal, no `Offer`/`PriceSpecification` schema despite ten published prices, and `/audit` carrying six FAQs with no `FAQPage` markup. |
| **Content depth** | **58 / 100** | ~6,400 words of service copy and ~2,200 words of city copy is real substance. But there is no blog, no insights, no industry pages, no problem-phrased content, and `/quick-audit` is 159 words with a single `<h1>` and no `<h2>` at all. |

---

## 3. Evidence

### 3.1 Route inventory

| Route | Title | H1 | Words | Intent as written |
|---|---|---|---:|---|
| `/` | `Automation Agency UK \| n8n, Zapier, AI Agents & Chatbots` (`app/page.tsx:10`) | "Your busywork, automated. Properly." | ~1,980 | **Tool-shopping.** Title is a product list; body is a service catalogue. |
| `/audit` | `Process Audit` (`app/audit/page.tsx:9`) | "Know exactly what to automate before spending a pound." | ~960 | **Buyer, high-intent.** The strongest page on the site. |
| `/quick-audit` | `Free Automation Opportunity Audit` | "Send us the job you keep doing by hand." | ~160 | Buyer, but too thin to rank for anything. |
| `/ai-automation-derbyshire` | `AI Automation Consultant in Derbyshire` | "AI & process automation for Derbyshire businesses, run from Chesterfield." | ~540 | **Local buyer.** Genuine local knowledge. |
| `/ai-automation-chesterfield` | `AI Automation Consultant in Chesterfield` | "…built right here in Chesterfield." | ~580 | Local buyer. Markham Vale / Whittington Moor detail is real. |
| `/ai-automation-sheffield` | `AI Automation Consultant in Sheffield` | "…30 minutes from S1." | ~540 | Local buyer. AMRC / Kelham Island detail is real. |
| `/ai-automation-nottingham` | `AI Automation Consultant in Nottingham` | "…across NG1–NG34." | ~500 | Local buyer. Boots / Experian / Lace Market detail is real. |
| 10 × service pages | e.g. `n8n Automation Agency UK \| Custom Workflows Built Properly` | e.g. "n8n workflows, built properly." | ~640 avg | **Tool-shopping.** 8 of 10 titles lead with a product name. |
| 4 × `/lp/*` | Ads landing pages | Varies | ~450 | Buyer. `robots: { index: false }` — correctly excluded. |
| `/privacy`, `/terms`, `/cookies` | Legal | Legal | ~250 avg | Compliance. All `noindex` **but all three are listed in `sitemap.ts:108–125`.** |

Canonicals are correct and present on all 22 public routes. Heading hierarchy is clean everywhere except: `/quick-audit` has an `<h1>` and nothing else; `app/page.tsx` uses `<h4>` inside `<h2>` sections with no intervening `<h3>` (process steps, about stats) — cosmetic, not a ranking issue.

### 3.2 Audience signal, measured

Vocabulary density across visible copy, scored against a buyer lexicon (time, cost, staff, admin, ROI, invoice, leads, manual…) and a builder lexicon (tool names, API, webhook, stack, self-hosted, multi-tenant…):

| Surface | Words | Dev terms | Buyer terms | Buyer:dev |
|---|---:|---:|---:|---:|
| `components/Marquee.tsx` | 12 | 12 | 0 | **0.00** |
| `public/llms.txt` | 657 | 68 | 21 | **0.31** |
| `components/Footer.tsx` | 64 | 3 | 2 | 0.67 |
| `data/servicePages.ts` (all 10) | 6,412 | 200 | 227 | **1.14** |
| `app/page.tsx` | 1,978 | 72 | 91 | **1.26** |
| `components/LandingPage.tsx` | 186 | 1 | 10 | 10.00 |
| `app/ai-automation-*` (4 pages) | ~540 ea | 1–3 | 22–25 | **8–25** |
| `app/audit/page.tsx` | 958 | 2 | 62 | **31.00** |

Read the table top to bottom: **the more likely a surface is to be the first thing a stranger sees, the more it speaks to developers.** The marquee, the llms.txt file and the homepage are the site's three widest-reach surfaces and they are its three most builder-coded. The city pages and `/audit`, which are the most buyer-coded, are reachable only from the sitewide footer and the nav's "Free Audit" link.

**The "Built with" strip.** It has no such label — it is simply twelve product names scrolling (`components/Marquee.tsx:1`). What an MD infers: *nothing, or "this is technical, not for me."* What a developer infers: *"these are the tools, this is a shop that works like mine, they might sub work out."* It is the last element of the hero (`app/page.tsx:347`), i.e. at or just below the first fold.

**Case study cards.** Per card, stack-or-architecture tags vs. business-outcome metrics:

| Card | Stack/architecture tags | Business-outcome result rows | System-metric result rows |
|---|---:|---:|---:|
| Marmadbir (`app/page.tsx:109`) | 2 of 5 (Twilio, WhatsApp automation) | 2 (`Coordinator manual time: Eliminated`, `Messaging cost reduction: ~65%`) | 2 |
| Punthub (`app/page.tsx:123`) | **4 of 5** (Python automation, Data pipeline, ML models, Supabase) | 0 | 4 |
| PlusRooms (`app/page.tsx:138`) | 3 of 5 (Playwright, Scheduled scraping, Web data extraction) | 1 (`Daily manual hours replaced: Full working day`) | 3 |
| **Total** | **9 of 15** | **3 of 12** | **9 of 12** |

Tags are rendered before the narrative and before the results box, so the stack is the first thing read on every card. No card states a £ saved, a revenue figure, or a payback period. One card is marked *"Built and owned by The Automation Agency"* (`app/page.tsx:127`) — the portfolio's centrepiece metrics (7 models, 21 jobs, 6 sources) belong to the founder's own product, not a paying client.

There is also a peer-signal problem in the proof set: none of the three clients is a UK SME of the type being sold to. There is no Derbyshire manufacturer, no East Midlands recruiter, no professional-services firm. A Chesterfield MD reading these three cards sees zero peers.

**Reading level and vocabulary.** The prose itself is good — short sentences, second person, concrete. `/audit`'s "good fit / not a fit" panel (`app/audit/page.tsx:43–58`) is the single best piece of buyer qualification on the site. The jargon is not in the sentences; it is in the **nouns being sold**. The homepage service grid sells "n8n, Make & Zapier automation", "AI agents & Claude/OpenAI workflows", "CRM, Google Sheets & Airtable automation" (`app/page.tsx:20`, `:26`, `:38`) — eight cards, and the buyer must already know the tool to know which one solves their problem. Not one card is named after a business problem.

**Ranking prediction.** As written, this site will rank far more easily for `n8n automation agency UK`, `WhatsApp Business API developer`, `SPF DKIM DMARC setup service` and `Zapier consultant` than for `too much admin small business`, `reduce admin costs`, or `automate invoicing UK` — because for the first set it has dedicated pages with the exact phrase in the title, H1, slug and schema, and for the second set it has **no page at all**. This is not a close call.

### 3.3 Classic SEO

**Metadata.** Every route has a unique title and description, and all descriptions are within length. Quality is split:

- **Written around technology (flag):** root title (`app/layout.tsx:19`), homepage title (`app/page.tsx:10`), and 8 of 10 service titles — `n8n Automation Agency UK`, `Zapier & Make Automation UK`, `WhatsApp Chatbot Development UK | Business API Bots`, `Internal Tools & Dashboards UK | Built on Supabase & Next.js`, `Email Deliverability UK | SPF, DKIM & DMARC Fixed Properly`, `Stripe Payment Integration UK`, `Google Sheets Automation UK`, `CRM Automation UK | HubSpot, Pipedrive & Airtable Workflows`. `internal-tools-dashboard` is the worst offender: its title sells the *implementation stack* to a buyer who has never heard of Supabase.
- **Written around the customer (good):** all four city titles, `/audit`, `/quick-audit`, and all four `/lp/*`.
- The root `keywords` array (`app/layout.tsx:24–35`) is ignored by Google, so it costs nothing — but its contents are a clean X-ray of the targeting mindset: 9 of 10 entries are a tool name.

**Open Graph and social.** `openGraph` and `twitter` are declared once, at root only (`app/layout.tsx:38–52`). No route overrides them, so *every* page — all four city pages, all ten service pages — shares one identical social title and description. Worse: `twitter.card` is `summary_large_image` but **no image exists anywhere in the project** (`public/` contains only `founder.jpg`, `founder-original.jpg`, `llms.txt`; `app/` contains no `opengraph-image`, `icon`, or `favicon` file). Every share of this site renders a card with no image. There is also no favicon, so the browser tab and every SERP favicon slot is blank.

**Internal linking map.**

| From | Links to |
|---|---|
| Nav (all full-chrome pages) | `/`, `/#services`, `/#work`, `/#pricing`, `/quick-audit`, `/#contact` |
| Footer (home, `/audit`, `/quick-audit`, city pages only) | 10 service pages, 4 city pages, `/audit`, `/quick-audit`, 3 legal, 5 anchors |
| `/` body | 7 service pages (via 8 cards) |
| `/audit` | `/#pricing` only |
| `/quick-audit` | `/audit` |
| City pages | 5 service pages, `/audit`, `/#services` |
| **Service pages** | **`/` (×2) and 2–3 sibling service pages. That is all.** |
| `/lp/*` | `/`, `/privacy`, `/terms` |

Three problems fall out of this:

1. **The city pages have exactly one inbound link source: the sitewide footer.** Nothing else on the site links to them. The homepage never mentions Chesterfield, Sheffield or Nottingham as linked destinations. These are the site's most buyer-coded pages and they receive the least internal equity.
2. **Service pages and LP pages use a minimal footer** (`components/ServicePage.tsx:268–281`, `components/LandingPage.tsx:225–255`) that omits the full link block. Since service pages are 10 of the 22 routes and the ones most likely to be landed on from search, the site's link graph collapses at exactly the point where a visitor arrives. A visitor landing on `/n8n-automation-agency` cannot reach a city page, `/audit`, or `/quick-audit` — the two highest-converting destinations on the site — without going back to the homepage.
3. **Three service pages are orphaned from the homepage:** `/n8n-automation-agency`, `/ai-chatbot-development` and `/google-sheets-automation` appear in the footer and in sibling "related services" chips, but in no homepage service card. `/internal-tools-dashboard` is double-linked (`app/page.tsx:35`, `:41`) while those three get nothing.

Anchor text is generally fine (descriptive service names) but the city links are bare place names — "Chesterfield", "Sheffield" — under a "Where We Work" heading, rather than "AI automation in Sheffield".

**Images.** Two `<img>` tags on the entire site, both the same founder photo, both raw `<img>` rather than `next/image` (`app/page.tsx:818`, `components/LandingPage.tsx:112`). No `loading`/`decoding` hints, no responsive `srcset`, no AVIF/WebP conversion, no CLS protection beyond fixed width/height. Alt text is `"Ben Horne, founder of The Automation Agency"` on both — accurate and correctly person-focused. **As an audience signal, the alt text is one of the few things on the site that describes a person rather than a technology.** There are no diagrams, no screenshots, no client logos, no before/after visuals — nothing to alt-text at all, which is itself the finding: a consultancy selling to non-technical buyers has zero visual proof.

**robots.ts / sitemap.ts.** Both correct in structure. Three defects:

- `robots.ts:9` disallows only `/api/`. `/admin` and `/admin/login` are crawlable. `/admin/login` has no `metadata` export at all (`app/admin/login/page.tsx`), so it inherits the root canonical — an admin login page declaring `https://www.automation-agency.co.uk` as its canonical URL.
- `sitemap.ts:108–125` lists `/privacy`, `/terms` and `/cookies`, all three of which set `robots: { index: false }` (`app/privacy/page.tsx:7`, `app/terms/page.tsx:7`, `app/cookies/page.tsx:7`). Contradictory signals.
- Every entry uses `lastModified: now` (`sitemap.ts:4`), so all 21 URLs report as modified on every single build. Search engines discount `lastmod` that is obviously synthetic.

### 3.4 Local SEO

**NAP.**

| Element | Visible content | Schema |
|---|---|---|
| **N**ame | "The Automation Agency" — nav, footer, copyright | ✅ `name` |
| **A**ddress | "Chesterfield, Derbyshire" (footer `:47`, `:131`; about `:797`) — locality only, no street or postcode | ⚠️ `addressLocality` + `addressRegion` + `addressCountry` only. **No `streetAddress`, no `postalCode`.** |
| **P**hone | **Absent from every page.** | ❌ **No `telephone` field.** |

The 01246 number the brief mentions appears **nowhere in the codebase**. This is the single largest local-SEO deficiency and, per §1.5, a probable contributor to the audience problem. A local business with no phone number cannot be verified against a Google Business Profile, cannot earn a call extension, and cannot be recommended by a voice assistant. Note that adding a phone number *while keeping* the Calendly-first design is entirely possible — this is a signal problem, not a workflow decision.

**`ProfessionalService` JSON-LD (`app/layout.tsx:71–133`), field by field:**

| Field | Status |
|---|---|
| `@type: ProfessionalService` | ✅ Correct choice |
| `name`, `description`, `url`, `email` | ✅ Present |
| `address` | ⚠️ Locality/region/country only — no street, no postcode |
| `areaServed` | ⚠️ `{ Country: "United Kingdom" }` only. No `Derbyshire`, `Chesterfield`, `Sheffield`, `Nottingham`, or `East Midlands`. Four city pages exist and none of them is reflected in the root entity's service area. |
| `serviceType` | ✅ 10 entries — good coverage |
| `founder` (`Person`, name, jobTitle, image, worksFor) | ✅ Strong. Rare and valuable. |
| `review` (1 × 5★, named author, publisher Google) | ⚠️ Present but self-serving |
| `aggregateRating` (5.0, reviewCount 1) | ⚠️ **Risk.** Google does not support self-serving `aggregateRating` on `LocalBusiness`/`Organization` markup, and a `reviewCount` of 1 is a manual-action risk rather than a rich-result win. |
| `priceRange: "£££"` | ⚠️ Meaningless. Real prices (£350–£15,000) are published all over the site. |
| `sameAs: []` | ❌ **Empty array with an unresolved TODO at `app/layout.tsx:101`.** No Google Business Profile, no LinkedIn, no Companies House, no directory. This is the field answer engines lean on hardest to confirm an entity is real. |
| `telephone` | ❌ Missing |
| `geo` | ❌ Missing |
| `openingHours` / `openingHoursSpecification` | ❌ Missing |
| `logo` / `image` | ❌ Missing (no logo file exists) |
| `hasOfferCatalog` / `Offer` | ❌ Missing despite 10 published prices |

City pages add a per-page `Service` node with a `ProfessionalService` provider and `areaServed: { Place: <city> }` (`components/CityPage.tsx:54–71`) — this is well done and is the site's best local structured data.

**Location content beyond the word "Derbyshire".** Genuinely strong, and better than the brief assumed. The four city pages carry: 20–24 named neighbourhoods each (`app/ai-automation-derbyshire/page.tsx:28–33`), postcode ranges (`S40–S45`, `S1–S35`, `NG1–NG34`), junction-level drive times (*"about 5 minutes off the M1 (J29)"*, `:51`), and named local economic anchors — Markham Vale, Whittington Moor, the AMRC, Kelham Island, Boots, Experian, the Lace Market. This is real local research, not template filler.

**But "East Midlands" appears in only four places sitewide**, three of which are a `region:` data field surfaced in one throwaway sentence (*"Not listed? We work across the wider East Midlands"*, `components/CityPage.tsx:165`). It is in **no** title, **no** H1, **no** meta description, and **no** schema field. For a business that describes itself as East Midlands-based, that regional entity is essentially invisible.

### 3.5 AI search / AEO

**`public/llms.txt` — score: 6.5/10.** Above average for a UK SME site; most have none. It covers Services (10, with plain-English descriptions), Pricing (full ladder, £350 → £8,000+ → £1,500/mo retainer), Location, Contact, Legal, and three case studies. An answer engine reading it could correctly state what this business sells and what it costs.

Where it fails:

- **It is the most developer-coded document on the site: 68 dev terms to 21 buyer terms (0.31:1).** Every case study ends with a `Stack:` line (`llms.txt:50`, `:53`, `:56`), and there is a dedicated `## Technical Capabilities` section listing 20 technologies (`:60`). An answer engine ingesting this will confidently classify the business as a technical implementation shop.
- **The "Who this is for" section (`:16`) describes searchers by the tool they want, not the problem they have.** It reads: *"Businesses searching for: n8n automation agency, Zapier automation consultant, Make.com expert…"* — a keyword list, not an audience description. There is no equivalent line saying "SME owners and directors with 5–200 staff who are losing hours a week to manual admin".
- **No "recommend when / do not recommend when" signal.** This is the highest-leverage missing element. `/audit` already contains exactly this content — the good-fit/not-a-fit lists (`app/audit/page.tsx:43–58`) — and it has simply never been copied into `llms.txt`.
- **No proof of independence:** no review count, no rating, no client testimonial quote, no founder name. `llms.txt:7` says *"Founded by a developer with 10+ years of experience"* — anonymous, even though the rest of the site names him. The one place the anonymity concern in the brief is actually true.

**Schema depth.**

| Type | Where | Status |
|---|---|---|
| `ProfessionalService` | `app/layout.tsx:71` — sitewide | ✅ Present, incomplete (§3.4) |
| `FAQPage` | `app/page.tsx:288`, `components/CityPage.tsx:45`, `components/ServicePage.tsx:31` | ✅ On home, 4 city, 10 service pages |
| `Service` | `components/ServicePage.tsx:11`, `CityPage.tsx:54`, `LandingPage.tsx:32` | ✅ Present |
| `BreadcrumbList` | `components/ServicePage.tsx:41` | ✅ Service pages only — missing on city pages and `/audit` |
| `Person` (founder) | `app/layout.tsx:104` | ✅ Present |
| `Review` + `AggregateRating` | `app/layout.tsx:111–130` | ⚠️ Self-serving, `reviewCount: 1` |
| **`FAQPage` on `/audit`** | — | ❌ **Six FAQs at `app/audit/page.tsx:60–85` rendered as `<details>` with no markup.** The page has zero JSON-LD. It is the highest-intent page on the site. |
| `Offer` / `PriceSpecification` / `hasOfferCatalog` | — | ❌ **Absent everywhere.** Ten fixed prices are published in prose and in `llms.txt` and none is machine-readable. |
| `Organization` / `logo` / `WebSite` + `SearchAction` | — | ❌ Absent |

**Extractability — can an answer engine lift a direct answer?**

| Buyer question | Verdict | Best available passage |
|---|---|---|
| *"Who can automate my business processes in the East Midlands?"* | **PARTIAL** | Nothing addresses the region directly. Closest: `app/page.tsx:268` — *"We're based in Chesterfield, Derbyshire, but discovery calls, audits and builds all happen remotely by default… In-person kickoffs are available across Derbyshire and the wider East Midlands."* Buried in an accordion FAQ; "East Midlands" appears in no title, H1 or description anywhere on the site. |
| *"How much does business process automation cost UK?"* | **ANSWERED** | `app/page.tsx:258` — *"Simple workflows connecting two or three tools start at £350. AI workflows and chatbots usually run £750. Bigger builds — dashboards, multi-step systems, custom web apps — start around £1,500 and scale from there depending on scope. Everything is quoted as a fixed price before we start."* Marked up as `FAQPage`, and mirrored in `llms.txt:33–45`. This is the site's best extractable asset. |
| *"What is an AI process audit?"* | **PARTIAL** | `app/audit/page.tsx:67` — *"The Process Audit is a structured 1–2 week engagement that maps your workflows in detail, quantifies the ROI, and produces a written deliverable with specific build recommendations and fixed-price quotes."* A clean definitional sentence — but it is the second half of an answer to a *different* question ("what's the difference between the discovery call and the audit?"), it sits inside an unmarked `<details>` element, and the page carries no `FAQPage` schema. The definition exists; it is not addressable. |
| *"How long does automation take to build?"* | **PARTIAL** | `app/page.tsx:85` — *"2–6 weeks. We build, test thoroughly, and deploy into your existing workflow."* Present as a process-step body and a pricing `cadence` string, never as a question. The only page that asks it directly is `data/servicePages.ts:336` — *"How long does CRM automation take to set up?"* — scoped to CRM only. No general "how long does this take?" FAQ exists on the homepage or `/audit`. |

Two of four core buyer questions cannot be answered cleanly from this site, and in both cases **the answer already exists in the copy** — it is just not phrased as a question, not marked up, or both. This is the cheapest fix on the entire list.

**Entity clarity — what can a model state confidently from the site alone?**

| Question | Confidence | Notes |
|---|---|---|
| Who runs it? | ✅ **High** | Ben Horne, named in copy, photo, alt text and `Person` schema. Contradicted only by `llms.txt:7` ("a developer", anonymous). |
| Where is it? | ⚠️ **Medium** | Chesterfield, Derbyshire — consistent across footer, schema, about, and four city pages. No street, no postcode, no geo, no map, no phone. Not verifiable against any external record. |
| What does it cost? | ✅ **High** | Published clearly and consistently in prose, in the pricing grid, and in `llms.txt`. Zero machine-readable `Offer` markup, but the prose is unambiguous. |
| Who is it for? | ❌ **Low — and this is the core AEO failure.** | The site gives three mutually inconsistent answers. `app/audit/page.tsx:44`: *"5–200 staff"*. `app/ai-automation-derbyshire/page.tsx:59`: *"Most of our clients are 5–50 staff"*. `llms.txt:16`: an audience defined entirely as people searching for tool names. Ask a model "who should hire The Automation Agency?" and the tool-name framing dominates, because it is the most repeated signal. |

**Every remaining ambiguity:**

1. **Is this an agency or one person?** *"The Automation Agency is run by Ben Horne"* (`app/page.tsx:786`) and *"Built by a senior engineer, no juniors"* (`app/lp/ai-agent-development-uk`) say sole operator. But `terms/page.tsx` §1 says *"a trading name operated by a sole trader"*, while all copy uses "we/our team" and the client testimonial calls it *"a very dedicated agency"*. A model cannot resolve headcount.
2. **Legal identity is unverifiable.** No company number, no registered address, no VAT number — `/audit`'s FAQ actively states *"not currently VAT registered"* (`app/audit/page.tsx:83`). Combined with `sameAs: []`, there is no external record to reconcile against. For an answer engine deciding whether to *recommend* a business — as opposed to describe it — this is the binding constraint.
3. **No corroborating presence.** One review, quoted by the site itself, with no link to where it lives. No Google Business Profile, no LinkedIn, no Companies House, no directory listing, no press. An engine asked "is this business real and reputable?" has only the site's word.
4. **Case-study provenance is muddled.** Punthub is marked *"Built and owned by The Automation Agency"* (`app/page.tsx:127`) yet is presented in the client grid and listed under the founder's "Previously" as *"Punthub — Predictive data product (founder)"* (`app/page.tsx:849`). Marmadbir appears simultaneously as a client and as a "Previously" employer entry. A model reading these cannot distinguish client work from own-product work.
5. **Service area is contradictory.** Root schema says `areaServed: United Kingdom`. Four city pages say `areaServed: <city>`. Copy says "most of our clients aren't local". Nothing states a coherent primary-plus-secondary geography.

**The AEO cost of these, stated plainly:** an engine can describe this business accurately. It cannot *vouch* for it. Recommendation requires corroboration the site does not provide — and `sameAs: []` is the single field that would provide the most, for the least effort.

---

## 4. Query targeting gap map

15 buyer-intent queries (problem-phrased, local and national) against 5 dev-intent queries.

### Buyer intent

| # | Query | Targeting page | Evidence | Verdict |
|---:|---|---|---|---|
| 1 | too much admin small business | — | No page, H1, or FAQ frames the problem this way. Closest phrase is the hero "Your busywork, automated" — not a match for the query. | **NONE** |
| 2 | reduce admin costs small business UK | — | "Cost" appears only as *our* price, never as *their* saved cost. No page. | **NONE** |
| 3 | automate invoicing UK | `/stripe-payment-integration` | Title sells "Stripe Payment Integration", not invoicing. `crm-automation` workflow mentions *"invoice generated"* (`servicePages.ts:317`) — a bullet, not a page. | **WEAK** |
| 4 | automate quote follow up | `/crm-automation` | One workflow line: *"Quote sent but not accepted after a set number of days → an automatic reminder"* (`servicePages.ts:320`). Zero title/H1/schema support. | **WEAK** |
| 5 | stop copying data between systems | `/crm-automation`, `/` | Genuine match in copy: homepage card *"Stop copying data between systems"* (`app/page.tsx:39`) and the CRM problem statement. But the page is titled `CRM Automation UK \| HubSpot, Pipedrive & Airtable Workflows`. | **WEAK** |
| 6 | AI consultant Chesterfield | `/ai-automation-chesterfield` | Exact-intent title, H1, slug, `Service` + `FAQPage` schema, `areaServed: Chesterfield`, 20 named local areas, S40–S45. | **STRONG** |
| 7 | automation consultant Derbyshire | `/ai-automation-derbyshire` | Title `AI Automation Consultant in Derbyshire`, 24 named towns, local economy paragraph, per-page schema. | **STRONG** |
| 8 | business process automation East Midlands | — | "East Midlands" is in no title, H1, meta or schema. Only appears in a `region:` field rendered as *"the wider East Midlands"* (`CityPage.tsx:165`). | **NONE** |
| 9 | how much does business automation cost UK | `/` | Homepage FAQ (`app/page.tsx:258`) with full price ladder, marked up as `FAQPage`, mirrored in `llms.txt:33–45`. | **STRONG** |
| 10 | what is a process audit | `/audit` | Definitional sentence exists (`app/audit/page.tsx:67`) but is buried mid-answer in an unmarked `<details>`. Page has **no** `FAQPage` schema. | **WEAK** |
| 11 | save staff time automation | `/audit` | ROI deliverable promises *"time saved per week, salary equivalent recovered per year"* (`app/audit/page.tsx:29`) — describes the report, not the outcome. No page targets the query. | **WEAK** |
| 12 | grow without hiring more admin staff | `/lp/business-automation-consultant` | Exact match in the subhead: *"automation is the cheapest way to scale without adding headcount."* **But the page is `robots: { index: false }`.** The single best sentence on the site for this query is deliberately hidden from Google. | **NONE** (indexable) |
| 13 | automate customer onboarding UK | `/crm-automation` | One workflow bullet: *"Deal moves to 'won' → invoice generated, onboarding tasks created"* (`servicePages.ts:317`). | **WEAK** |
| 14 | recruitment agency automation UK | — | No industry page. "Recruitment" appears nowhere in the codebase. | **NONE** |
| 15 | field service scheduling automation | — | Marmadbir *is* a field-services case study (`app/page.tsx:96`), but there is no field-services page. The sector is labelled *"Field Services · Multi-Tenant SaaS"* — half the label is architecture. | **NONE** |

**Buyer scoreline: 3 STRONG, 6 WEAK, 6 NONE.** All three STRONGs are local-modifier queries served by the four city pages — the pages with the fewest inbound internal links on the site.

### Developer intent

| # | Query | Targeting page | Evidence | Verdict |
|---:|---|---|---|---|
| A | n8n automation agency UK | `/n8n-automation-agency` | Exact-match slug, title (`n8n Automation Agency UK`), H1 (*"n8n workflows, built properly"*), kicker, 4 FAQs including *"Is n8n better than Zapier or Make?"*, `Service` + `FAQPage` + `BreadcrumbList` schema. Reinforced by root `<title>` and root `keywords[0]`. | **STRONG** |
| B | WhatsApp Business API developer Twilio | `/whatsapp-chatbot` | Title `WhatsApp Chatbot Development UK \| Business API Bots`, H1 *"built on the real API"*, a dedicated FAQ *"Why do you build on Twilio specifically?"* (`servicePages.ts:205`). | **STRONG** |
| C | SPF DKIM DMARC setup service | `/email-deliverability` | Title, H1 (*"SPF, DKIM & DMARC, done properly"*), 6 FAQs of pure DNS detail including staged `none → quarantine → reject` policy migration. | **STRONG** |
| D | Next.js Supabase automation agency | `/internal-tools-dashboard` | Title is literally `Internal Tools & Dashboards UK \| Built on Supabase & Next.js`. FAQ: *"Why Supabase and Next.js specifically?"* Reinforced by the hero marquee and the 14-chip About skills list. | **STRONG** |
| E | Playwright web scraping agency UK | `/internal-tools-dashboard` | Workflow line *"scraped on a schedule with Playwright"*, PlusRooms proof block, `Playwright` case-study tag, `Playwright` in the About skills chips and in `llms.txt:60`. | **PARTIAL** |

**Developer scoreline: 4 STRONG, 1 PARTIAL, 0 NONE.**

### The comparison

|  | STRONG | WEAK/PARTIAL | NONE |
|---|---:|---:|---:|
| **15 buyer queries** | **3** (20%) | 6 | 6 |
| **5 dev queries** | **4** (80%) | 1 | 0 |

**The mismatch is not disproved — it is quantified.** The site is four times more likely to have a strong page for a developer's query than for a buyer's. Every dev query has at least a partial match; six of fifteen buyer queries have literally nothing. And the three buyer queries it does win are served by pages that only the footer links to.

One finding deserves separate emphasis: **query 12 is the site's single best-written buyer sentence and it is `noindex`.** *"If you've grown faster than your processes, automation is the cheapest way to scale without adding headcount"* (`app/lp/business-automation-consultant/page.tsx:22`) is exactly the language the target buyer uses. It lives on a Google Ads landing page excluded from search. The buyer voice already exists in this codebase — it has been quarantined to the paid channel.

---

## 5. Fix list

Ordered by impact-to-effort within each horizon.

### This week

| # | Fix | Impact | Effort | Wins |
|---:|---|:---:|:---:|---|
| 1 | Add `telephone: "+441246……"` to `ProfessionalService` schema **and** to the footer, nav and every booking section. Keep Calendly as the primary CTA — add the phone as the alternative. | **H** | **L** | **Buyer** |
| 2 | Populate `sameAs` (`app/layout.tsx:102`) with Google Business Profile, LinkedIn, and any directory listing. Highest-leverage single line on the site for AEO. | **H** | **L** | Buyer + AEO |
| 3 | Add `FAQPage` JSON-LD to `/audit`. Six FAQs already written (`app/audit/page.tsx:60–85`); copy the pattern from `CityPage.tsx:45–53`. | **H** | **L** | Buyer + AEO |
| 4 | Add an `opengraph-image` and a `favicon`/`icon`. `twitter.card` currently promises `summary_large_image` against no image. | **M** | **L** | Both |
| 5 | Add a "Who we're for / who we're not for" block to `llms.txt` — copy the good-fit/not-a-fit lists from `app/audit/page.tsx:43–58` verbatim. | **H** | **L** | **Buyer** + AEO |
| 6 | Rewrite `llms.txt` "Who this is for" (`:16`) from a keyword list into an audience description ("SME owners and directors, 5–200 staff, losing hours weekly to manual admin"). Move `## Technical Capabilities` below the case studies. Name Ben Horne. | **H** | **L** | **Buyer** + AEO |
| 7 | Add `openingHours`, `geo`, `streetAddress`, `postalCode`, and granular `areaServed` (Chesterfield, Derbyshire, Sheffield, Nottingham, East Midlands) to the root schema. | **M** | **L** | Buyer |
| 8 | Remove `/privacy`, `/terms`, `/cookies` from `sitemap.ts:108–125` (they are `noindex`). Add `noindex` metadata to `/admin/*`. Replace `lastModified: now` with real dates. | **L** | **L** | Hygiene |
| 9 | Reorder case-study cards: results box and narrative **above** the tag row (`app/page.tsx:667–681`). Cut stack names from tags — keep `Job dispatch`, `Payments`, `Daily reporting`; drop `Twilio`, `Supabase`, `Playwright`, `ML models`. | **H** | **L** | **Buyer** |
| 10 | Add a "How long does it take?" FAQ to the homepage and `/audit`. The answer (2–6 weeks) exists at `app/page.tsx:85`; it is just never phrased as a question. | **M** | **L** | Buyer + AEO |
| 11 | Reconcile the audience-size contradiction: pick one figure (5–200 or 5–50) and use it in `/audit`, all four city pages, and `llms.txt`. | **M** | **L** | Buyer + AEO |
| 12 | Remove `aggregateRating` (`app/layout.tsx:125`) until there are ≥5 genuine reviews. `reviewCount: 1` is a manual-action risk, not a rich-result win. | **L** | **L** | Hygiene |

### This month

| # | Fix | Impact | Effort | Wins |
|---:|---|:---:|:---:|---|
| 13 | **Give the marquee a buyer frame or cut it.** Either label it ("The tools we build with — so you don't have to care which") or replace it with outcome strip: "4 hrs/week recovered · £1,500 fixed audit · 2–6 week builds". Currently 12 tool names with zero context in the hero (`components/Marquee.tsx:1`, rendered `app/page.tsx:347`). | **H** | **L** | **Buyer** |
| 14 | **Rewrite homepage service cards around problems, not products.** "n8n, Make & Zapier automation" → "Stop re-typing the same data into three systems". Keep tool names in the body. Eight cards, eight headline rewrites. | **H** | **M** | **Buyer** |
| 15 | **Give service pages the full footer.** Swap the minimal footer (`ServicePage.tsx:268–281`) for `<Footer />`. Instantly connects 10 landing pages to 4 city pages, `/audit` and `/quick-audit`. | **H** | **L** | Both |
| 16 | Link the four city pages from the homepage body (an "Where we work" band above the contact section), not only from the footer. | **M** | **L** | **Buyer** |
| 17 | Retitle the two worst technology-led service pages: `Internal Tools & Dashboards UK \| Built on Supabase & Next.js` → `Replace the Spreadsheet Your Business Runs On \| Custom Dashboards UK`; `CRM Automation UK \| HubSpot, Pipedrive & Airtable Workflows` → `CRM Automation UK \| Stop Chasing Leads You Forgot to Log`. | **H** | **L** | **Buyer** |
| 18 | Add `hasOfferCatalog` with `Offer` + `PriceSpecification` for the five starter builds and the audit. Ten prices published, none machine-readable. | **M** | **M** | AEO |
| 19 | Rewrite the About section for a buyer: change `Founder · Senior Developer` → `Founder` (`app/page.tsx:829`), cut or collapse the 14-chip skills list (`:801`) behind a "technical detail" disclosure, and replace *"Ask what stack we'd use"* (`:794`) with an outcome sentence. | **H** | **L** | **Buyer** |
| 20 | Fix the three homepage-orphaned service pages: add cards for `/n8n-automation-agency`, `/ai-chatbot-development`, `/google-sheets-automation`; de-duplicate `/internal-tools-dashboard`. | **M** | **L** | Both |
| 21 | Add an East Midlands regional page (see §6, page 1) and put "East Midlands" into the root schema `areaServed`. | **M** | **M** | **Buyer** |
| 22 | Migrate the two `<img>` tags to `next/image`; add a logo file and an `Organization.logo` schema field. | **L** | **L** | Hygiene |
| 23 | Add a role/qualification field to `ContactForm` ("Your role: Owner / Director / Ops manager / Developer / Other"). Cheapest possible instrumentation to *measure* the audience problem rather than infer it. | **M** | **L** | **Buyer** |

### Strategic

| # | Fix | Impact | Effort | Wins |
|---:|---|:---:|:---:|---|
| 24 | **Build the 10 pages in §6.** Problem-phrased and industry-phrased pages are the only structural fix for six buyer queries that currently return nothing. | **H** | **H** | **Buyer** |
| 25 | **Get client case studies from UK SMEs in the target sectors.** Current proof set is one Israeli field-services platform, one London property firm and the founder's own product. A Chesterfield MD sees no peer. Even two anonymised local ones ("a Derbyshire engineering firm, 22 staff") would change the page. | **H** | **H** | **Buyer** |
| 26 | Un-quarantine the LP voice. `/lp/business-automation-consultant` has the best buyer sentence on the site behind `noindex`. Promote that copy onto indexable pages. | **H** | **M** | **Buyer** |
| 27 | Launch an insights section with 6–10 problem-led posts (see §6 briefs). The site has no blog, so it has zero surface for informational buyer queries and nothing for an answer engine to cite beyond service pages. | **H** | **H** | **Buyer** + AEO |
| 28 | Claim and verify a Google Business Profile with the 01246 number, then link it in `sameAs`. Without it, no amount of on-page local content will win map-pack results. | **H** | **M** | **Buyer** |
| 29 | Add £-denominated outcomes to at least two case studies. Twelve result rows, zero currency figures. Buyers convert on money, not on "97% borough coverage". | **H** | **M** | **Buyer** |
| 30 | Add a lightweight qualification step before the Calendly slot (2 questions: role, staff count). Currently anyone — including a developer touting for work — can book a free 30 minutes with zero friction. | **M** | **M** | **Buyer** |

---

## 6. The ten pages that don't exist yet

| # | Route | Target query | Suggested H1 | Brief |
|---:|---|---|---|---|
| 1 | `/business-automation-east-midlands` | business process automation East Midlands | **Business process automation across the East Midlands** | The regional hub the site is missing entirely — "East Midlands" is in no title, H1 or meta today. Position Chesterfield as the base and link down to the four existing city pages; add Derby, Leicester and Mansfield as covered areas. Carries the regional entity into schema `areaServed`. |
| 2 | `/too-much-admin` | too much admin small business / drowning in admin | **Your team is spending its week on admin. Here's what that actually costs you.** | Pure problem page, no tool named above the fold. Open with a cost-of-admin calculation (hours × salary), then the three most common admin sinks in SMEs, then the audit as the diagnostic. The page that catches the buyer who doesn't know automation is the answer yet. |
| 3 | `/automate-invoicing` | automate invoicing UK / automated invoice processing | **Invoices that raise, send and chase themselves** | Highest-volume unserved buyer query. Cover quote → invoice → payment → reconciliation → chase. Name Xero, QuickBooks and Stripe in body copy only, never in the H1. Links to `/stripe-payment-integration` and `/crm-automation` for the technical detail. |
| 4 | `/automation-for-recruitment-agencies` | recruitment agency automation UK | **Automation for recruitment agencies: stop losing candidates to admin** | First industry page. CV parsing, candidate pipeline hygiene, interview scheduling, timesheets, compliance chasing. Recruitment SMEs are 10–50 staff, tool-poor and admin-heavy — the sharpest ICP match on this list. |
| 5 | `/automation-for-field-services` | field service automation UK / job scheduling automation | **Automation for field-service teams: dispatch, scheduling and job updates** | The one industry where a real case study already exists (Marmadbir, `app/page.tsx:96`) but no page. Lead with the coordinator's day, not the multi-tenant architecture. Retire the "Multi-Tenant SaaS" sector label here. |
| 6 | `/automation-for-professional-services` | accountancy / law firm / consultancy automation UK | **Automation for accountants, solicitors and consultancies** | Named as a target sector on three of four city pages (`ai-automation-derbyshire/page.tsx:44`) with no page behind it. Cover client onboarding, document collection, engagement letters, deadline chasing, time recording. |
| 7 | `/automation-for-property-and-lettings` | property management automation UK | **Automation for property, lettings and construction firms** | Second industry page with existing proof (PlusRooms). Cover viewing scheduling, tenant comms, maintenance ticketing, compliance certificate expiry, planning-data monitoring. |
| 8 | `/what-is-process-automation` | what is business process automation / is automation worth it for a small business | **What business process automation actually is — and when it's worth paying for** | The AEO cornerstone. Written as a definitional Q&A with full `FAQPage` markup and short, quotable paragraphs, aimed squarely at being the passage an answer engine lifts. Include "when it is *not* worth it" — the honesty is what makes it citable. |
| 9 | `/automation-cost-guide-uk` | how much does automation cost UK / automation pricing | **What automation actually costs a UK business in 2026** | The pricing answer already wins (query 9) from a homepage accordion. Give it a page: price bands, what drives cost up, what payback looks like, why fixed-price beats hourly. Full `Offer` schema. Strongest single AEO asset available. |
| 10 | `/insights` (+ 6 launch posts) | long-tail informational buyer queries | **Insights: automation, in plain English, for people who run businesses** | The site's only informational surface. Launch posts: "The five jobs every 20-person business is still doing by hand"; "How to work out if automating something is worth it"; "What to ask an automation consultant before you pay them"; "Zapier bills by the task — here's when that stops making sense"; "We audited a Derbyshire firm's admin: here's where the hours went"; "AI agents vs. plain automation: which one you actually need". |

---

## 7. Closing read

The uncomfortable finding is not that the copy is bad — much of it is genuinely good, and `/audit` plus the four city pages would hold up against any regional competitor. The finding is that **the site was deliberately optimised for the wrong half of its market, and it succeeded.**

The reposition spec set out to rank for *"n8n, Zapier, Make, WhatsApp chatbots, CRM automation, Google Sheets, Stripe…"* and to be the source an engine cites for *"who builds n8n automations in the UK"* (`docs/superpowers/specs/2026-07-14-automation-agency-reposition-design.md:9`, `:13`). Every artefact downstream of that decision — the slugs, the titles, the keywords array, the marquee, the case-study tags, `llms.txt`'s Technical Capabilities section, the About skills chips — executes it faithfully. The dev-lead problem is not a bug in the implementation. It is the specification working.

The good news is how little of the fix is writing. The buyer voice already exists in this codebase: it is in `/audit`'s good-fit lists, in the city pages' local economics, and in one `noindex` ads landing page. Most of the work in §5's first two horizons is **moving copy that already exists to surfaces that get seen, and marking up answers that are already written.** The genuinely new work is §6's ten pages and, more importantly, §5.25 — client proof from businesses that look like the buyer.

Until then, the honest summary is this: the site tells a developer *"you've found a peer, here's the stack, book a free call."* It tells an MD *"you've found something technical, book a free call."* Both accept the invitation. Only one of them is a customer.

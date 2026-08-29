# Phase 2 — Completing the repositioning, and four new pages: change log

**Date:** 2026-08-28
**Scope:** Finish the buyer repositioning started in Phase 1, and build the four highest-value missing pages.
**Constraints honoured:** no redesign, no dependency changes, design system preserved, all Phase 1 work intact.
**Verification:** `npm run build` green after every commit; `npm test` 8/8 at the end. Sitemap emits 21 URLs; 26 static routes build clean.

---

## 1. Commits

Eleven Phase 2 commits (the first two below closed out Phase 1 and are listed for continuity):

| # | SHA | Commit |
|---:|---|---|
| — | `0e34fc5` | `feat(home): restate the Punthub saving as operating costs eliminated` *(Phase 1 tail)* |
| — | `316ce54` | `docs: update Phase 1 change log for commit 13` *(Phase 1 tail)* |
| 1 | `ede09f9` | `feat(seo): complete the local and entity schema` |
| 2 | `c28011f` | `feat(home): price the hero stats` |
| 3 | `e5b60b1` | `feat(home): name service cards after the problem, not the product` |
| 4 | `dd7d8d8` | `feat(seo): give service pages the full sitewide footer` |
| 5 | `e5f87d0` | `feat(seo): retitle the ten service pages problem-first (fix #17)` |
| 6 | `db4f9b1` | `feat: add /automation-cost-guide-uk` |
| 7 | `a866368` | `feat: add /too-much-admin` |
| 8 | `d1d6adf` | `feat: add /business-automation-east-midlands` |
| 9 | `ec97a13` | `feat: add /automation-for-recruitment-agencies` |
| 10 | `f3cacb6` | `feat: cross-link the four new pages` |
| 11 | `4c5deaa` | `chore(seo): sitemap dates and llms.txt entries for the new pages` |

11 files changed, +1,743 / −219 (excluding this document).

---

## 2. Per-route titles: before / after

### The ten service pages — retitled (fix #17)

Hybrid pattern throughout: **title** leads with the problem and keeps the tool name as a tail for query match; **H1** is the problem sentence with no tool name in it at all; the tool is named in the first paragraph; **description** is outcome-first. **No slug or route changed.**

| Route | Before | After |
|---|---|---|
| `/n8n-automation-agency` | n8n Automation Agency UK \| Custom Workflows Built Properly | **Stop Re-Typing Data Between Systems — n8n Automation UK** |
| `/zapier-make-automation` | Zapier & Make Automation UK \| Workflows Built & Fixed Properly | **Fix the Automation That Keeps Breaking — Zapier & Make UK** |
| `/ai-chatbot-development` | AI Chatbot Development UK \| Custom Chatbots Built Properly | **Answer Customer Questions Without Being There — AI Chatbots UK** |
| `/whatsapp-chatbot` | WhatsApp Chatbot Development UK \| Business API Bots Built Properly | **Take Bookings and Questions on WhatsApp — WhatsApp Chatbots UK** |
| `/ai-automation-agency` | AI Automation Agency UK \| AI Agents & Workflows Built Properly | **One System That Fits Together — AI Automation Agency UK** |
| `/crm-automation` | CRM Automation UK \| HubSpot, Pipedrive & Airtable Workflows | **Leads That Never Slip Through the Cracks — CRM Automation UK** |
| `/google-sheets-automation` | Google Sheets Automation UK \| Scheduled, Connected Spreadsheets | **Spreadsheets That Update Themselves — Google Sheets Automation UK** |
| `/email-deliverability` | Email Deliverability UK \| SPF, DKIM & DMARC Fixed Properly | **Get Your Email Out of the Spam Folder — SPF, DKIM & DMARC UK** |
| `/stripe-payment-integration` | Stripe Payment Integration UK \| Subscriptions, Webhooks & Refunds | **Payments That Update Everything Else — Stripe Integration UK** |
| `/internal-tools-dashboard` | Internal Tools & Dashboards UK \| Built on Supabase & Next.js | **Replace the Spreadsheet Your Business Runs On — Custom Dashboards UK** |

**H1s, before → after** (verified against built HTML — zero of ten now contain a tool name):

| Route | H1 before | H1 after |
|---|---|---|
| `/n8n-automation-agency` | n8n workflows, built properly. Hosted, monitored, yours. | Stop re-typing the same data into three systems. We automate the bit in between. |
| `/zapier-make-automation` | Zapier and Make, set up properly. Or fixed when it breaks. | The automation nobody noticed had stopped working. Rebuilt so it holds. |
| `/ai-chatbot-development` | AI chatbots, that actually answer. Human handover built in. | Answer customers at 9pm without being awake. And never invent an answer. |
| `/whatsapp-chatbot` | WhatsApp chatbots, built on the real API. Not a script that gets banned. | Customers message you the way they message their friends. Something answers, day or night. |
| `/ai-automation-agency` | AI automation, end to end. Agents, workflows, data — one team. | Three freelancers, three half-finished systems. Or one that fits together. |
| `/crm-automation` | Your CRM, finally up to date. Automatically, not by hand. | Every lead logged, every quote chased. Without anyone remembering to. |
| `/google-sheets-automation` | Google Sheets, that update themselves. No copy-paste, no missed rows. | The spreadsheet updates itself before you open it. No copy-paste, no missed rows. |
| `/email-deliverability` | Emails that, actually land. SPF, DKIM & DMARC, done properly. | Your email is going to the spam folder. Here is why, and the fix. |
| `/stripe-payment-integration` | Stripe, wired in, properly. Subscriptions, webhooks, refunds — handled. | Money arrives. Everything else updates itself. Receipts, records, access. |
| `/internal-tools-dashboard` | Internal tools, built for how you work. Not off-the-shelf software. | Replace the spreadsheet your business secretly runs on. One place to look. |

Kickers and the ~100-word `intro` on each page were rewritten to match. **The 6,400-word body corpus (`problem`, `workflows`, `faqs`) was not touched**, per the brief.

### The four new routes

| Route | Title | Description (opening) |
|---|---|---|
| `/automation-cost-guide-uk` | What Automation Actually Costs a UK Business in 2026 — The Automation Agency | "Real prices, not 'contact us'. A written process audit is £1,500. Most single-workflow builds land between £3,000 and £8,000…" |
| `/too-much-admin` | Your Team Is Spending Its Week on Admin — What That Costs You | "Six hours a week of re-keying costs a 20-person business about £5,500 a year, per person doing it…" |
| `/business-automation-east-midlands` | Business Process Automation Across the East Midlands | "Automation consultancy for East Midlands businesses, run from Chesterfield. Derby, Nottingham, Leicester, Mansfield, Sheffield…" |
| `/automation-for-recruitment-agencies` | Automation for Recruitment Agencies — Stop Losing Candidates to Admin | "Consultants in a 10–50 person agency lose hours a week to CV sorting, interview scheduling, timesheet chasing and compliance documents…" |

### Unchanged

`/`, `/audit`, `/quick-audit`, the four city pages, the four `/lp/*` and the three legal pages keep their Phase 1 titles and descriptions. The homepage *body* changed (hero stats, service cards) but its metadata did not.

---

## 3. The four new pages

All four use the existing component vocabulary — `Nav`, `Footer`, `RevealWrapper`, `CalendlyEmbed`, `ContactForm`, the ink/cream alternating section rhythm, `kicker`/`h1-mega`/`h2-band` type scale, lime accent. No new components, no new CSS, no dependency changes.

| Route | Words | Schema emitted | Internal links out |
|---|---:|---|---|
| `/automation-cost-guide-uk` | **1,639** | `Service` + **5 × `Offer`/`PriceSpecification`**, `FAQPage` (7 Q), `BreadcrumbList` | `/audit`, `/too-much-admin`, `/business-automation-east-midlands`, `/automation-for-recruitment-agencies`, full footer |
| `/too-much-admin` | **1,141** | `Service`, `BreadcrumbList` | `/automation-cost-guide-uk`, `/audit`, `/quick-audit`, + 3 siblings, full footer |
| `/business-automation-east-midlands` | **1,063** | `Service` with **10-entry `areaServed`**, `FAQPage` (5 Q), `BreadcrumbList` | all 4 city pages, `/audit`, `/automation-cost-guide-uk`, + 2 siblings, full footer |
| `/automation-for-recruitment-agencies` | **1,276** | `Service` + `BusinessAudience`, `FAQPage` (5 Q), `BreadcrumbList` | `/crm-automation`, `/audit`, `/automation-cost-guide-uk`, + 2 siblings, full footer |

**Total: 5,119 words of new buyer-intent content, 17 new FAQ answers, 5 new `Offer` nodes.**

Notes on each:

- **Cost guide** — written for extractability: six price bands, six cost drivers, a worked payback example (6 hrs/wk × £20/hr × 46 weeks = £5,520/yr), and the fixed-price-vs-hourly argument. Paragraphs are deliberately short and self-contained so an answer engine can lift one whole. The three client £ figures reuse the signed-off case-study outcomes and restate the basis, matching the homepage footnote.
- **Too much admin** — hero verified to contain zero tool names. Opens on the arithmetic, then the three admin sinks, then six signals, then the audit. It is the only one of the four without `FAQPage`, because its content is genuinely narrative rather than Q&A; forcing questions onto it would have been schema for schema's sake.
- **East Midlands** — the regional hub. Links down to all four city pages as cards, plus twelve more towns with drive times from Chesterfield. Its `areaServed` names the region, three counties and six cities.
- **Recruitment** — the CV-screening FAQ addresses bias and GDPR head-on (extraction against stated criteria, reasoning shown, no auto-rejection, retention rules set during the build) rather than avoiding the obvious objection.

**Cross-links were added in a separate commit** (`f3cacb6`) on purpose: the four link to each other, so folding those links into the individual page commits would have produced four commits each shipping a 404.

---

## 4. Part A and C detail

**1. Local schema** (`ede09f9`) — added `geo` (53.235, −1.421) and `openingHoursSpecification` (Mon–Fri 09:00–17:30). `areaServed` expanded from `Country`-only to six entries: UK, East Midlands, Derbyshire, Chesterfield, Sheffield, Nottingham. Derbyshire and East Midlands are typed `AdministrativeArea`, not `City` — neither is one, and the brief's "four city names" maps onto four *pages*, not four cities. `founder.jobTitle` aligned to `Founder`, closing the Phase 1 mismatch with the visible page.

**2. sameAs** — the founder `Person` node carries `sameAs: ["https://www.linkedin.com/in/benjamin-horne-8413b03a9/"]`, and (as of `cc8c7bd`+1) so does the `ProfessionalService` node: there is no LinkedIn company page, so the founder's profile serves as the organisation's corroborating link. The Google Business Profile URL is still outstanding — see Deferred.

**3. Hero stats** (`c28011f`) — `10+ yrs shipping production systems` / `6 live data sources automated (Punthub)` / `97% boroughs covered (PlusRooms)` / `5/5 on Google` → `£27k/yr saved for one client` / `£3,000 fixed price to start a build` / `A day a week the kind of time clients get back` / `Free 30-minute call`. Two of the four originals were the exact system metrics the audit flagged, and one exposed a client's internals.

**4. Service cards** (`e5b60b1`) — all eight renamed to the problem. Tool names remain in the card bodies. Links and routes unchanged.

| Before | After |
|---|---|
| n8n, Make & Zapier automation | Stop re-typing the same data into three systems |
| AI agents & Claude/OpenAI workflows | Let something else read the inbox and sort it |
| WhatsApp & website chatbots | Answer customers at 9pm without being awake |
| CRM, Google Sheets & Airtable automation | Leads that never slip through the cracks |
| Data pipelines & web data extraction | The morning check nobody has to do any more |
| Custom web apps & internal tools | Replace the spreadsheet your business secretly runs on |
| Email deliverability & sending setup | Get your email out of the spam folder |
| Stripe, payments & subscription automation | Payments that update everything else on their own |

**5. Full footer on service pages** (`dd7d8d8`) — the minimal footer (2 links) replaced with `<Footer />` (24 links). The 10 pages most likely to be landed on from search no longer dead-end.

**11. Sitemap** (`4c5deaa`) — 21 URLs, up from 17. `lastModified: new Date()` replaced with a static per-route date map: `2026-08-28` for the 17 routes changed in Phase 2, `2026-07-14` for the 4 untouched since the reposition. Legal routes remain excluded.

**12. llms.txt** — four pointers added under the section an answer engine would already be reading: cost guide under *Pricing*, recruitment and East Midlands under *Who this is for*, admin arithmetic under *Problems we solve*.

---

## 5. One structural change worth flagging

`ServicePage` derived its schema and breadcrumb label from `data.metaTitle.split('|')[0]`. The new titles use an em-dash, so that parse would have fed the entire title string into `Service.name` and `BreadcrumbList` — a silent regression that builds clean and only shows up in structured-data testing.

Replaced with an explicit `serviceName` field on `ServiceData`. Verified in built HTML: `Service.name` is `n8n Automation`, breadcrumb is `Home > n8n Automation`.

---

## 6. Deferred, with reasons

| Item | Reason |
|---|---|
| **`ProfessionalService.sameAs` — GBP URL still missing** | Resolved in part. There is no LinkedIn company page and there won't be one, so on instruction the founder's profile now stands as the organisation's corroborating link as well as the founder's. That is defensible for a sole trader whose personal profile *is* the business's external identity, though a company page or GBP would be stronger. **Still outstanding: the Google Business Profile URL**, blocked on claiming and verifying the GBP (audit fix #28). It remains the single link that would most improve how confidently an answer engine can vouch for the business. |
| **`streetAddress` and `postalCode` still absent** | Checked the repo and `.env.local`: no real address exists anywhere. Per the brief, not invented. Inventing one would poison the NAP consistency a Google Business Profile is later verified against — a worse outcome than an incomplete address. TODO left in `app/layout.tsx`. |
| **Calendly custom questions still not configured** | Carried over from Phase 1. The `a1`/`a2` prefill needs two custom questions on the Calendly event type, in order: 1) Your role, 2) Team size. Dashboard change, not code. |
| **Six of the audit's ten missing pages not built** | Out of scope by instruction. Remaining: `/automate-invoicing`, `/automation-for-field-services`, `/automation-for-professional-services`, `/automation-for-property-and-lettings`, `/what-is-process-automation`, `/insights`. |
| **No insights/blog section** | Explicitly excluded from this brief. |
| **Service page body corpus still 1.14 buyer:dev** | The brief scoped the rewrite to titles, H1s, descriptions and the first ~100 words. `problem`, `workflows` and `faqs` across the ten pages — roughly 6,000 words — are unchanged and remain the largest concentration of tool vocabulary on the site. |
| **`/too-much-admin` has no `FAQPage`** | Deliberate. Its content is narrative, not Q&A; adding questions purely to carry schema would have made the page worse. The other three new pages all carry `FAQPage`. |
| **Case-study proof set still has no UK SME peer** | Audit fix #25, strategic. Marmadbir, PlusRooms and Punthub remain the only three, and none is a UK SME of the type being sold to. The new industry page partly compensates by describing the recruitment reality directly, but it is not client proof. |
| **`opengraph-image` still edge runtime; no `.ico` favicon** | Both carried over from Phase 1 with the same reasons — a Windows-only `@vercel/og` node-build bug, and no image tooling available without a dependency. |

---

## 7. Measured effect, cumulative across both phases

| Signal | Pre-Phase 1 | Now |
|---|---:|---:|
| Routes with a tool-led `<title>` | 11 of 22 | **0 of 26** |
| Service page H1s containing a tool name | 10 of 10 | **0 of 10** |
| Homepage service cards named after a tool | 8 of 8 | **0 of 8** |
| Hero stats that are system metrics | 2 of 4 | **0 of 4** |
| `llms.txt` buyer:dev term ratio | 0.31 | **2.05** |
| Case-study result rows a buyer can price | 3 of 12 | **12 of 12** |
| Pages carrying `Offer`/`PriceSpecification` | 0 | **3** (root catalogue, `/audit`, cost guide) |
| Schema `areaServed` entries on the root entity | 1 | **6** |
| "East Midlands" in a title, H1 or schema | 0 | **1 page + 2 schema nodes** |
| Buyer-intent queries from audit §4 with a STRONG page | 3 of 15 | **7 of 15** |

The audit's buyer scoreline was 3 STRONG / 6 WEAK / 6 NONE. Phase 2 converts four: *how much does business automation cost UK* (already STRONG, now with a dedicated page), *business process automation East Midlands* (NONE → STRONG), *too much admin small business* (NONE → STRONG), *reduce admin costs small business UK* (NONE → STRONG), *recruitment agency automation UK* (NONE → STRONG). Remaining NONE: *grow without hiring more admin staff* (still only on a `noindex` ads page) and *field service scheduling automation*.

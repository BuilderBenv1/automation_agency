# The Automation Agency — Next.js Project

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **Language**: TypeScript
- **Fonts**: Instrument Serif + Instrument Sans (Google Fonts)
- **Email API**: Resend
- **AI**: Anthropic Claude API (auto-replies to enquiries)
- **Analytics**: Plausible (cookieless, no consent needed)
- **Hosting**: Vercel

---

## Project Structure

```
app/
├── layout.tsx          # Root layout, metadata, fonts
├── page.tsx            # Homepage (all sections)
├── globals.css         # Tailwind base + utilities
├── sitemap.ts          # Auto-generated sitemap
├── robots.ts           # Auto-generated robots.txt
├── audit/page.tsx      # Process Audit page
├── privacy/page.tsx    # Privacy policy
├── terms/page.tsx      # Terms & conditions
├── cookies/page.tsx    # Cookie policy
└── api/
    └── contact/
        └── route.ts    # AI-powered contact form handler

components/
├── Nav.tsx             # Fixed nav with scroll behaviour (client)
├── Footer.tsx          # Site footer (server)
├── ContactForm.tsx     # Contact form with async submission (client)
└── RevealWrapper.tsx   # Intersection observer reveal (client)

public/
└── llms.txt            # AI crawler readable site description
```

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/BuilderBenv1/automation-agency.git
cd automation-agency
npm install
```

### 2. Environment Variables

Create `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
CONTACT_EMAIL=hello@automation-agency.co.uk
```

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Deployment (Vercel)

1. Push to GitHub: `git push origin main`
2. Go to **vercel.com** → New Project → Import repository
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variables in Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
5. Deploy

### Domain

In Vercel → Settings → Domains:
- Add `automation-agency.co.uk`
- Add `www.automation-agency.co.uk`
- Add DNS records at your registrar

---

## Email Setup (Resend)

1. Sign up at **resend.com**
2. Add domain `automation-agency.co.uk`
3. Add DNS records (DKIM, SPF, DMARC) at your registrar
4. Create API key → add to Vercel env vars

The contact form sends:
- **Owner notification** → your email with full enquiry details
- **AI auto-reply** → Claude-generated personalised response to the enquirer

---

## Analytics (Plausible)

1. Sign up at **plausible.io** (~£9/month)
2. Add site: `automation-agency.co.uk`
3. The script is already in `app/layout.tsx` — no further setup needed
4. No cookie consent required (cookieless by design)

---

## ICO Registration

You must register with the ICO as you collect personal data commercially.

1. Go to **ico.org.uk/registration**
2. Cost: **£35/year** (Tier 1)

---

## Google Search Console

1. Go to **search.google.com/search-console**
2. Add property → URL prefix → `https://automation-agency.co.uk`
3. Verify via HTML tag (add to `app/layout.tsx` head)
4. Sitemap auto-generated at `/sitemap.xml` — submit this URL

---

## Google Business Profile (Local SEO)

1. **business.google.com** → Add business
2. Name: The Automation Agency
3. Category: IT Consultant
4. Location: Chesterfield, Derbyshire (service area business)
5. Website: automation-agency.co.uk

---

## Why Next.js?

The site is built in the same stack used for client projects — Next.js 14, TypeScript, Tailwind, Supabase, Vercel. When a prospect asks "what do you build with?", you point at your own site. It's a live case study of the technology, not just a description of it.

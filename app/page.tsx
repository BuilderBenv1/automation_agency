import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import RevealWrapper from '@/components/RevealWrapper'
import Marquee from '@/components/Marquee'

export const metadata: Metadata = {
  title: { absolute: 'Business Process Automation for UK SMEs — The Automation Agency' },
  description:
    'We find the admin your team does by hand and build the systems that do it instead — typically hours back every week. Fixed prices agreed before we start, free 30-minute discovery call, written Process Audit from £1,500. Chesterfield-based, working UK-wide.',
  alternates: { canonical: 'https://www.automation-agency.co.uk' },
}

/* ─────────────────────────── DATA ─────────────────────────── */

const services = [
  {
    title: 'n8n, Make & Zapier automation',
    body: 'Connect the apps you already pay for — your CRM, forms, sheets, inbox, Slack and Airtable — so the admin in between just happens.',
    from: '£350',
    slug: '/zapier-make-automation',
  },
  {
    title: 'AI agents & Claude/OpenAI workflows',
    body: 'AI that reads, sorts, drafts and updates records for you, with a check-before-send step wherever a mistake would cost you.',
    from: '£750',
    slug: '/ai-automation-agency',
  },
  {
    title: 'WhatsApp & website chatbots',
    body: 'Answer FAQs, capture leads and book jobs over WhatsApp, your website, Telegram or SMS — handed to a human when it matters.',
    from: '£750',
    slug: '/whatsapp-chatbot',
  },
  {
    title: 'CRM, Google Sheets & Airtable automation',
    body: 'Stop copying data between systems. We wire your forms, sheets, CRM, calendar and notifications into one flow that holds together.',
    from: '£350',
    slug: '/crm-automation',
  },
  {
    title: 'Data pipelines & web data extraction',
    body: 'Scheduled collection, cleaning and delivery of data — public sources, APIs, emails or documents — into a dashboard, database or sheet.',
    from: '£1,500',
    slug: '/internal-tools-dashboard',
  },
  {
    title: 'Custom web apps & internal tools',
    body: 'When no-code runs out of road: Next.js and Supabase dashboards, portals and admin panels built to fit how you actually work.',
    from: '£1,500',
    slug: '/internal-tools-dashboard',
  },
  {
    title: 'Email deliverability & sending setup',
    body: 'SPF, DKIM, DMARC and domain authentication sorted, so the emails you send at scale actually land in the inbox.',
    from: '£350',
    slug: '/email-deliverability',
  },
  {
    title: 'Stripe, payments & subscription automation',
    body: 'Checkout, subscriptions, webhooks and receipts wired to your CRM, so payments update everything without you touching it.',
    from: '£750',
    slug: '/stripe-payment-integration',
  },
]

const processSteps = [
  {
    num: '01',
    title: 'Discovery Call',
    body: "30 minutes. We talk through your business, identify where time is being wasted, and give you an honest view of what automation can and can't do for you.",
    tag: 'FREE',
  },
  {
    num: '02',
    title: 'Process Audit',
    body: '1–2 weeks. We map your workflows in detail, identify the highest-ROI automation targets, and deliver a written report with a fixed-price quote.',
    tag: '£1,500 · CREDITED IF YOU BUILD',
  },
  {
    num: '03',
    title: 'Build & Deploy',
    body: '2–6 weeks. We build, test thoroughly, and deploy into your existing workflow. Fixed price agreed upfront. No surprises at invoice.',
    tag: 'FIXED PRICE FROM £3,000',
  },
  {
    num: '04',
    title: 'Handover & Support',
    body: 'Full documentation, staff walkthrough, and optional ongoing retainer. Automation compounds — every workflow makes the next one faster and cheaper to build.',
    tag: 'OPTIONAL RETAINER FROM £1,500/MO',
  },
]

const caseStudies = [
  {
    client: 'Marmadbir',
    clientUrl: 'https://www.marmadbir.com/',
    sector: 'Field Services · Multi-Tenant SaaS',
    title: 'WhatsApp dispatch automation for field-service teams',
    body: "Marmadbir was coordinating field workers manually across WhatsApp groups and phone calls — dispatchers chasing workers, payments handled by phone. We built the full stack: customer-facing front-end, multi-tenant Twilio-powered WhatsApp dispatch flow, and Tranzilla payment integration. Jobs broadcast, workers apply, payments claimed race-safe, client confirmed. The coordinator's manual workload: zero.",
    results: [
      ['Coordinator manual time', 'Eliminated'],
      ['Payment race conditions', 'Zero'],
      ['New tenant onboarding', '< 5 minutes'],
      ['Messaging cost reduction', '~65%'],
    ],
    tags: ['WhatsApp automation', 'Twilio', 'Job dispatch', 'Payments', 'CRM workflow'],
  },
  {
    client: 'Punthub',
    clientUrl: 'https://punthub.co.uk/',
    sector: 'Horse Racing · Predictive Analytics',
    title: 'Automated data pipeline & prediction dashboard',
    body: 'Punthub needed daily horse-racing data from 6 live sources, run through 7 ML prediction models, results reconciled overnight, and insights surfaced through a custom-plugin front-end. Python scripts feed Google Sheets each evening; Supabase syncs overnight; the Next.js site renders prediction cards via bespoke plugins. Runs unattended every night.',
    results: [
      ['Data sources automated', '6 daily'],
      ['Live prediction models', '7'],
      ['Reconciliation jobs', '21 automated'],
      ['Human touchpoints required', 'Zero'],
    ],
    tags: ['Python automation', 'Data pipeline', 'ML models', 'Daily reporting', 'Supabase'],
    note: 'Built and owned by The Automation Agency.',
  },
  {
    client: 'PlusRooms',
    clientUrl: 'https://plusrooms.co.uk/',
    sector: 'Property Intelligence · Data Pipeline',
    title: 'Public-data extraction & planning-alert dashboard',
    body: 'PlusRooms needed daily coverage of planning applications across England — previously a full working day of manual council-website trawling. We built Planscope: an automated scraping pipeline covering 97% of London boroughs and a live dashboard with alerts. Nobody has to check a council website anymore.',
    results: [
      ['Borough coverage', '97%'],
      ['Daily manual hours replaced', 'Full working day'],
      ['Data freshness', '24-hour cycle'],
      ['Dashboard & alerts', 'Live'],
    ],
    tags: ['Web data extraction', 'Playwright', 'Scheduled scraping', 'Dashboard', 'Alerts'],
  },
]

const pricingTiers = [
  {
    tier: 'Step 1',
    name: 'Discovery Call',
    amount: 'Free',
    cadence: '30 minutes · no commitment',
    desc: "We talk through your business and identify where automation could make the biggest difference. Honest conversation, no pitch.",
    features: ['30-minute call', 'Workflow walkthrough', 'Initial assessment', 'No obligation'],
    cta: 'Book Now',
    ctaStyle: 'outline' as const,
  },
  {
    tier: 'Step 2 — Most start here',
    name: 'Process Audit',
    amount: '£1,500',
    cadence: 'Fixed fee · 1–2 weeks · credited if you build',
    desc: 'We map your workflows, identify automation targets, estimate ROI, and deliver a written report with a fixed-price build quote.',
    features: [
      'Full workflow mapping',
      'Prioritised opportunities',
      'ROI estimates per item',
      'Written report — yours to keep',
      'Build quote included',
      '£1,500 credited if you proceed',
    ],
    cta: 'Book Discovery Call First',
    ctaStyle: 'white' as const,
    featured: true,
    note: 'Credit applies within 60 days of audit delivery.',
  },
  {
    tier: 'Step 3',
    name: 'Automation Build',
    amount: 'from £3,000',
    cadence: 'Fixed price · 2–6 weeks',
    desc: 'We build and deploy the system scoped in the audit. Single workflow to full multi-agent stack depending on requirements.',
    features: [
      'Fixed price before start',
      'Existing tool integration',
      'Testing & deployment',
      'Staff walkthrough',
      '30-day post-launch support',
    ],
    cta: 'Get Started',
    ctaStyle: 'outline' as const,
    note: 'Multi-agent builds from £8,000.',
  },
  {
    tier: 'Ongoing',
    name: 'Retainer',
    amount: '£1,500/mo',
    cadence: 'Monthly rolling · cancel anytime',
    desc: 'An ongoing automation partner. We monitor, expand, and build new workflows as your business grows.',
    features: ['Monthly builds', 'Monitoring & fixes', 'Priority turnaround', 'Monthly strategy call'],
    cta: 'Get Started',
    ctaStyle: 'outline' as const,
  },
]

// Plain-English outcomes for the hero strip. Every line is already published
// elsewhere on the site — city page intros (48-hour scoping, in-person
// kickoff), the pricing grid (fixed prices, 2–6 weeks) and the city page
// industry sections (sectors served). Nothing here is a new claim.
const heroOutcomes: [string, string][] = [
  ['Fixed price, agreed upfront', 'Builds from £3,000. You know the number before we start.'],
  ['Scoped within 48 hours', 'One call, then a written scope — not three weeks of meetings.'],
  ['Live in 2–6 weeks', 'Built, tested and handed over with your team trained on it.'],
  [
    'Manufacturing to professional services',
    'Engineering, logistics, property, hospitality, recruitment, finance.',
  ],
]

const heroStats: [string, string][] = [
  ['10+ yrs', 'shipping production systems'],
  ['6', 'live data sources automated (Punthub)'],
  ['97%', 'boroughs covered (PlusRooms)'],
  ['5/5', 'on Google'],
]

const popularAutomations = [
  <>New enquiry → straight into your <em className="not-italic font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">CRM</em>, with a Slack or email nudge</>,
  <>Website or <em className="not-italic font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">WhatsApp</em> message → booked in → your team notified</>,
  <>Messy inbox → <em className="not-italic font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">AI reads it</em>, summarises, drops it in a sheet</>,
  <>Google Sheet → tidy report → <em className="not-italic font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">emailed to your client</em> on schedule</>,
  <><em className="not-italic font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">Stripe</em> payment → CRM updated, receipt sent, subscription sorted</>,
  <>Broken <em className="not-italic font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">Zapier or Make</em> flow → rebuilt so it stops falling over</>,
  <><em className="not-italic font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">Telegram bot</em> for alerts, content delivery or internal tools</>,
  <><em className="not-italic font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">AI chatbot</em> for FAQs, bookings and lead capture</>,
]

const trustedClients = [
  { name: 'Marmadbir', url: 'https://www.marmadbir.com/' },
  { name: 'Punthub', url: 'https://punthub.co.uk/' },
  { name: 'PlusRooms', url: 'https://plusrooms.co.uk/' },
]

const starterBuilds = [
  {
    name: 'Simple automation',
    price: '£350',
    body: 'One workflow connecting 2–3 tools — a form, a sheet, a CRM update, a Slack or email alert.',
  },
  {
    name: 'AI workflow',
    price: '£750',
    body: 'A Claude or OpenAI workflow that classifies, drafts, summarises, routes or extracts.',
  },
  {
    name: 'Chatbot',
    price: '£750',
    body: 'A WhatsApp, website, Telegram or SMS chatbot for FAQs, bookings, lead capture or support.',
  },
  {
    name: 'Internal tool / dashboard',
    price: '£1,500',
    body: 'A small dashboard, admin panel, Supabase app or workflow control panel.',
  },
  {
    name: 'Process audit',
    price: '£1,500',
    body: 'The full diagnostic — see the audit section below.',
  },
]

const faqs = [
  {
    q: 'What kinds of automation do you build?',
    a: "Mostly the day-to-day admin your team does by hand: n8n, Zapier and Make workflows, WhatsApp and website chatbots, CRM and spreadsheet syncing, AI agents that read and sort your inbox, data pipelines, and the odd custom dashboard or internal tool when no-code can't quite get there.",
  },
  {
    q: 'Which tools do you use — n8n, Zapier, Make or custom code?',
    a: "Whichever fits the job. n8n and Make handle most workflow automation at a sensible cost. Zapier suits simple, low-volume connections. When something needs real logic — AI decision-making, a bespoke dashboard, tricky data — we write custom Python or Next.js instead. We'll always recommend the cheapest option that holds up long-term.",
  },
  {
    q: 'How much does a typical automation cost?',
    a: "Simple workflows connecting two or three tools start at £350. AI workflows and chatbots usually run £750. Bigger builds — dashboards, multi-step systems, custom web apps — start around £1,500 and scale from there depending on scope. Everything is quoted as a fixed price before we start, so there's no surprise on the invoice.",
  },
  {
    q: 'Do you work with businesses outside Derbyshire?',
    a: "Yes — most of our clients aren't local. We're based in Chesterfield, Derbyshire, but discovery calls, audits and builds all happen remotely by default, over video call, Slack or email. In-person kickoffs are available across Derbyshire and the wider East Midlands when that's genuinely useful, but it's never required.",
  },
  {
    q: "What if I'm not sure what to automate?",
    a: "That's exactly what the free discovery call and Process Audit are for. We'll ask about your day-to-day, spot where time's being lost, and tell you honestly what's worth automating and what isn't. There's no pressure to book a build afterwards — sometimes the honest answer is to leave it as it is.",
  },
  {
    q: 'Will the automation keep working after handover?',
    a: "Yes. We test everything thoroughly before handover and give you full documentation plus a walkthrough with your team, so everyone knows how it works and why. Every build includes 30 days of post-launch support, and there's an optional monthly retainer if you'd rather we kept monitoring, fixing and expanding things ourselves.",
  },
]

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function HomePage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 pb-16">
          <div className="kicker mb-6">AI · n8n · Chatbots · Custom builds · UK</div>

          <h1 className="font-display font-black text-h1-mega uppercase mb-8">
            Your busywork,
            <br />
            <span className="text-lime">automated.</span>{' '}
            <span className="outline-text">Properly.</span>
          </h1>

          <p className="text-muted-dark leading-[1.7] max-w-[36em] mb-10 text-[1.05rem]">
            <b className="text-cream">
              If you&apos;ve grown faster than your processes, automation is the cheapest way to scale
              without adding headcount.
            </b>{' '}
            We map where your team&apos;s time actually goes, then build the systems that give it back.
            Fixed price agreed before we start, clear handover, no vague AI promises.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a href="#contact" className="btn-lime">
              Book a free automation audit
            </a>
            <a href="#services" className="btn-ghost">
              See fixed-price services →
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.9rem] text-muted-dark pb-10 border-b border-[rgba(244,237,224,0.14)] mb-10">
            {heroStats.map(([stat, label], i) => (
              <span key={label} className="flex items-center gap-x-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-muted-dark">
                    ·
                  </span>
                )}
                <span>
                  <b className="text-lime font-display">{stat}</b> {label}
                </span>
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7 border-t border-[rgba(244,237,224,0.14)] pt-10">
            {heroOutcomes.map(([headline, detail]) => (
              <div key={headline}>
                <p className="font-display font-bold text-[0.98rem] text-cream leading-snug mb-1.5">
                  {headline}
                </p>
                <p className="text-[0.82rem] text-muted-dark leading-[1.6]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPULAR AUTOMATIONS */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">Popular automations we build</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-12 max-w-[16ch]">
            The jobs people ask us for most.
          </h2>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 list-none">
            {popularAutomations.map((item, i) => (
              <li key={i} className="flex gap-5 items-start">
                <span className="font-display font-black text-ink text-xl leading-none flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-ink leading-[1.6]">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROOF STRIP */}
      <div className="bg-ink text-cream border-b border-[rgba(244,237,224,0.14)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <span className="kicker flex-shrink-0">Trusted by</span>
          <div className="flex flex-wrap gap-x-9 gap-y-3 items-center">
            {trustedClients.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener"
                className="font-display font-bold text-[1.05rem] text-cream hover:text-lime no-underline transition-colors"
              >
                {name}
              </a>
            ))}
            <span className="text-[0.85rem] text-muted-dark italic">and more across the UK</span>
          </div>
          <span className="hidden lg:block text-[0.8rem] text-muted-dark md:ml-auto whitespace-nowrap">
            10+ years shipping production systems
          </span>
        </div>
      </div>

      {/* TESTIMONIAL */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <RevealWrapper>
            <div className="max-w-[820px] mx-auto text-center">
              <div
                className="flex justify-center gap-1 mb-7 text-[1.1rem] text-lime"
                aria-label="5 out of 5 stars"
              >
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <blockquote className="font-display font-medium text-[clamp(1.25rem,2.2vw,1.9rem)] text-cream leading-[1.4] tracking-[-0.01em] mb-9">
                &ldquo;I work with them for a while now, they are nothing less than hard working,
                fast responding, and very dedicated agency. Highly recommend.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4 pt-6 border-t border-[rgba(244,237,224,0.14)] max-w-[440px] mx-auto">
                <div className="w-12 h-12 rounded-full bg-lime text-ink flex items-center justify-center font-display font-bold text-[1.05rem] flex-shrink-0">
                  DI
                </div>
                <div className="text-left">
                  <p className="text-[0.95rem] font-semibold text-cream">Dor Iluz</p>
                  <p className="text-[0.78rem] text-muted-dark">
                    Marmadbir · Verified Google review · Local Guide, 27 reviews
                  </p>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">What we build</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-14 max-w-[22ch]">
            Buyer-friendly, engineer-built.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ title, body, from, slug }) => (
              <a
                key={title}
                href={slug}
                className="flex flex-col bg-cream-2 rounded-2xl p-7 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(19,18,16,0.12)]"
              >
                <h3 className="font-display font-bold text-ink text-[1.05rem] leading-snug mb-3">{title}</h3>
                <p className="text-[0.88rem] text-muted-cream leading-[1.65] mb-6 flex-1">{body}</p>
                <span className="inline-flex self-start items-center bg-lime text-ink font-display font-bold text-[0.8rem] px-3 py-1.5 rounded-full">
                  From {from}
                </span>
              </a>
            ))}
          </div>

          <p className="mt-12 text-[0.92rem] text-muted-cream">
            Not sure which one fits?{' '}
            <a href="#contact" className="text-ink font-semibold underline hover:text-muted-cream">
              Book a free audit
            </a>{' '}
            and we&apos;ll tell you straight.
          </p>
        </div>
      </section>

      {/* STARTER BUILDS */}
      <section className="bg-ink text-cream border-b border-[rgba(244,237,224,0.14)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker mb-5">Fixed-price starter builds</div>
          <h2 className="font-display font-black text-h2-band uppercase text-cream mb-8 max-w-[18ch]">
            Need one thing built? Start here.
          </h2>
          <p className="text-muted-dark leading-[1.7] max-w-[52em] mb-14 text-[1.02rem]">
            Two ways to work with us. Need one specific thing built? Pick a fixed-price starter below.
            Not sure where to start, or want a plan first? Book the free audit — we&apos;ll map it out and
            only build what&apos;s worth building.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {starterBuilds.map(({ name, price, body }) => (
              <div
                key={name}
                className="flex flex-col bg-ink-2 border border-[rgba(244,237,224,0.1)] rounded-2xl p-7"
              >
                <p className="font-display font-black text-lime text-[1.6rem] leading-none mb-4">{price}</p>
                <h3 className="font-display font-bold text-cream text-[1rem] mb-3">{name}</h3>
                <p className="text-[0.85rem] text-muted-dark leading-[1.6]">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a href="#contact" className="btn-lime">
              Book the free audit
            </a>
          </div>
        </div>
      </section>

      {/* PROCESS AUDIT CALLOUT */}
      <section id="audit" className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <RevealWrapper>
              <div className="kicker mb-5">First paid engagement</div>
              <h2 className="font-display font-black text-h2-band uppercase text-cream mb-5">
                The Process Audit:{' '}
                <span className="text-lime">
                  know exactly what to automate before spending a pound on building it.
                </span>
              </h2>
              <p className="text-[0.95rem] text-muted-dark leading-[1.75] mb-4">
                A discovery call shows you what&apos;s possible. A Process Audit tells you exactly what to
                build, in what order, and what return to expect — in writing.
              </p>
              <p className="text-[0.95rem] text-muted-dark leading-[1.75] mb-6">
                Over one to two weeks we map your core workflows, identify the automation opportunities with
                the highest ROI, and deliver a written report you can hand to any developer — including us.
              </p>
              <ul className="mb-8 border-t border-[rgba(244,237,224,0.14)]">
                {[
                  'Full process map of your current workflows',
                  'Prioritised automation opportunities with effort and ROI estimates',
                  'Technical architecture recommendation per opportunity',
                  'Fixed-price implementation quote for each item',
                  'Written report — yours to keep, regardless of next steps',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 py-2.5 text-[0.9rem] text-muted-dark border-b border-[rgba(244,237,224,0.14)]"
                  >
                    <span className="text-lime font-semibold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-lime">
                Get Started — Book a Discovery Call
              </a>
            </RevealWrapper>

            <RevealWrapper>
              <div className="bg-ink-2 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div
                  className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(200,240,74,0.1) 0%, transparent 70%)' }}
                />
                <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-5">
                  Process Audit
                </p>
                <p className="font-display font-black text-[3rem] md:text-[3.6rem] text-cream tracking-[-0.03em] leading-none mb-2">
                  <span className="text-[1.2rem] font-sans font-normal">£</span>1,500
                </p>
                <p className="text-[0.85rem] text-muted-dark mb-8 pb-8 leading-relaxed border-b border-[rgba(244,237,224,0.14)]">
                  Fixed fee. Credited in full against your build if you proceed within 60 days. If you
                  don&apos;t, you keep the report — no strings attached.
                </p>
                <ul className="mb-9">
                  {[
                    '1–2 week engagement',
                    'Remote or in-person (Derbyshire + surrounding areas)',
                    'Written deliverable report',
                    'Fixed-price build quote included',
                    'Full £1,500 credited if you proceed',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 py-2.5 text-[0.875rem] text-muted-dark border-b border-[rgba(244,237,224,0.1)]"
                    >
                      <span className="text-lime flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn-lime w-full justify-center">
                  Book a Discovery Call First
                </a>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="bg-cream text-ink border-b border-[rgba(19,18,16,0.12)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="flex justify-between items-end mb-16 gap-12 flex-col md:flex-row">
            <div>
              <div className="kicker-cream mb-5">How it works</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink">
                From first call to live
                <br />
                <span className="text-muted-cream">system in weeks.</span>
              </h2>
            </div>
            <p className="text-[0.95rem] text-muted-cream leading-[1.75] max-w-[440px]">
              A clear, predictable process. No hidden phases, no scope creep. You know exactly what&apos;s
              happening — and what it costs — at every stage.
            </p>
          </div>

          <RevealWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[rgba(19,18,16,0.12)]">
              {processSteps.map(({ num, title, body, tag }, i) => (
                <div
                  key={num}
                  className="p-10 md:p-12"
                  style={{ borderRight: i < 3 ? '1px solid rgba(19,18,16,0.12)' : 'none' }}
                >
                  <p
                    className="font-display font-black text-[3rem] leading-none mb-6 tracking-[-0.03em]"
                    style={{ color: 'rgba(19,18,16,0.08)' }}
                  >
                    {num}
                  </p>
                  <h4 className="font-display font-bold text-[1.1rem] text-ink mb-3">{title}</h4>
                  <p className="text-[0.85rem] text-muted-cream leading-[1.75] mb-4">{body}</p>
                  <span className="text-[0.7rem] font-bold text-muted-cream/70 tracking-[0.08em] uppercase">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="flex justify-between items-end mb-16 gap-12 flex-col md:flex-row">
            <div>
              <div className="kicker-cream mb-5">Our work</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink">
                Built. Shipped.
                <br />
                Running autonomously.
              </h2>
            </div>
            <p className="text-[0.95rem] text-muted-cream leading-[1.75] max-w-[440px]">
              Real systems, real outcomes. Every project below operates unattended today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map(({ client, clientUrl, sector, title, body, results, tags, note }) => (
              <RevealWrapper key={title}>
                <div className="bg-cream-2 rounded-2xl p-8 flex flex-col h-full transition-shadow hover:shadow-[0_14px_36px_rgba(19,18,16,0.1)]">
                  <div className="flex items-baseline justify-between gap-3 mb-4 pb-4 border-b border-[rgba(19,18,16,0.1)]">
                    {clientUrl ? (
                      <a
                        href={clientUrl}
                        target="_blank"
                        rel="noopener"
                        className="font-display font-bold text-[1.02rem] text-ink hover:text-muted-cream transition-colors no-underline"
                      >
                        {client} <span aria-hidden="true">→</span>
                      </a>
                    ) : (
                      <p className="font-display font-bold text-[1.02rem] text-ink">{client}</p>
                    )}
                    <p className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-muted-cream text-right">
                      {sector}
                    </p>
                  </div>

                  <h3 className="font-display font-bold text-[1.15rem] tracking-[-0.01em] mb-4 leading-[1.3] text-ink">
                    {title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.7rem] px-2.5 py-1 bg-lime/20 text-ink rounded-full font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[0.875rem] text-muted-cream leading-[1.75] mb-7">{body}</p>

                  <div className="bg-cream rounded-xl p-5 flex flex-col gap-2.5 mt-auto">
                    {results.map(([label, value]) => (
                      <div key={label} className="flex justify-between text-[0.82rem]">
                        <span className="text-muted-cream">{label}</span>
                        <span className="font-semibold text-ink">{value}</span>
                      </div>
                    ))}
                  </div>

                  {note && (
                    <p className="text-[0.75rem] text-muted-cream italic mt-4 pt-4 border-t border-[rgba(19,18,16,0.1)]">
                      {note}
                    </p>
                  )}
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="flex justify-between items-end mb-16 gap-12 flex-col md:flex-row">
            <div>
              <div className="kicker mb-5">Pricing</div>
              <h2 className="font-display font-black text-h2-band uppercase text-cream">
                Fixed prices.
                <br />
                No surprises.
              </h2>
            </div>
            <p className="text-[0.95rem] text-muted-dark leading-[1.75] max-w-[440px]">
              Every engagement is agreed upfront. You know exactly what you&apos;re paying before a line of
              code is written.
            </p>
          </div>

          <RevealWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(244,237,224,0.14)' }}>
              {pricingTiers.map(({ tier, name, amount, cadence, desc, features, cta, ctaStyle, featured, note }) => (
                <div key={name} className={`p-8 md:p-10 ${featured ? 'bg-lime' : 'bg-ink-2'}`}>
                  <p className={`text-[0.7rem] font-bold tracking-[0.12em] uppercase mb-3 ${featured ? 'text-ink/60' : 'text-muted-dark'}`}>
                    {tier}
                  </p>
                  <p className={`font-display font-bold text-[1.3rem] tracking-[-0.01em] mb-6 leading-[1.2] ${featured ? 'text-ink' : 'text-cream'}`}>
                    {name}
                  </p>
                  <p className={`font-display font-black text-[2.4rem] tracking-[-0.03em] leading-none ${featured ? 'text-ink' : 'text-cream'}`}>
                    {amount}
                  </p>
                  <p
                    className={`text-[0.8rem] mt-1.5 mb-6 pb-6 ${featured ? 'text-ink/55' : 'text-muted-dark'}`}
                    style={{ borderBottom: featured ? '1px solid rgba(19,18,16,0.16)' : '1px solid rgba(244,237,224,0.14)' }}
                  >
                    {cadence}
                  </p>
                  <p className={`text-[0.855rem] leading-[1.7] mb-6 ${featured ? 'text-ink/70' : 'text-muted-dark'}`}>
                    {desc}
                  </p>
                  <ul className="mb-8">
                    {features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2.5 py-2 text-[0.84rem] ${featured ? 'text-ink/70' : 'text-muted-dark'}`}
                        style={{ borderBottom: featured ? '1px solid rgba(19,18,16,0.12)' : '1px solid rgba(244,237,224,0.1)' }}
                      >
                        <span className={featured ? 'text-ink/50' : 'text-lime'}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`w-full flex justify-center py-3 px-4 text-sm font-bold font-display rounded-xl transition-colors ${
                      featured
                        ? 'bg-ink text-cream hover:bg-[#000]'
                        : ctaStyle === 'white'
                        ? 'bg-cream text-ink hover:bg-cream-2'
                        : 'border border-[rgba(244,237,224,0.2)] text-muted-dark hover:border-cream hover:text-cream bg-transparent'
                    }`}
                  >
                    {cta}
                  </a>
                  {note && (
                    <p className={`text-[0.77rem] mt-3 italic ${featured ? 'text-ink/55' : 'text-muted-dark'}`}>
                      {note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <RevealWrapper>
              <div className="kicker-cream mb-5">About</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[16ch]">
                Built by someone who has{' '}
                <em className="not-italic text-ink underline decoration-lime decoration-2 underline-offset-4">actually built it.</em>
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-[18px]">
                The Automation Agency is run by <strong className="text-ink font-semibold">Ben Horne</strong>,
                a developer with over a decade of building real production systems — automation stacks, ML
                pipelines, multi-tenant SaaS platforms, AI agents, and data infrastructure across multiple
                industries.
              </p>
              <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-[18px]">
                Not a consultant who reads about AI. Someone who writes the code, ships it to production,
                and keeps it running. Ask what stack we&apos;d use for your project and you&apos;ll get a direct
                answer — usually with a system already built with it that you can look at.
              </p>
              <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-7">
                Based in Chesterfield, Derbyshire, working with clients across the UK.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'Next.js', 'React', 'Supabase', 'PostgreSQL', 'Playwright', 'OpenAI API', 'Claude API', 'Twilio', 'Telegram Bots', 'scikit-learn', 'n8n', 'Vercel', 'Docker'].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="text-[0.775rem] px-2.5 py-1 border border-[rgba(19,18,16,0.16)] text-muted-cream rounded-full"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </RevealWrapper>

            <div className="flex flex-col gap-5">
              <RevealWrapper>
                <div className="bg-cream-2 rounded-2xl p-8 md:p-9">
                  <div className="flex items-center gap-5 mb-5 pb-5 border-b border-[rgba(19,18,16,0.1)]">
                    <img
                      src="/founder.jpg"
                      alt="Ben Horne, founder of The Automation Agency"
                      width={92}
                      height={92}
                      className="rounded-full object-cover w-[92px] h-[92px] flex-shrink-0 bg-cream"
                    />
                    <div>
                      <h3 className="font-display font-bold text-[1.2rem] text-ink leading-tight">
                        Ben Horne
                      </h3>
                      <p className="text-[0.82rem] text-muted-cream mt-1.5">Founder · Senior Developer</p>
                    </div>
                  </div>
                  <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-muted-cream mb-3">
                    Previously
                  </p>
                  <ul className="list-none">
                    {[
                      ['PlusRooms', 'London planning intelligence platform'],
                      ['Marmadbir', 'WhatsApp dispatch platform'],
                      ['Punthub', 'Predictive data product (founder)'],
                    ].map(([name, role]) => (
                      <li
                        key={name}
                        className="flex items-baseline justify-between gap-3 py-2.5 border-b border-[rgba(19,18,16,0.1)] last:border-0"
                      >
                        <span className="font-display font-semibold text-[0.95rem] text-ink">{name}</span>
                        <span className="text-[0.78rem] text-muted-cream text-right">{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealWrapper>

              <RevealWrapper>
                <div className="bg-cream-2 rounded-2xl p-8 md:p-9 grid grid-cols-2 gap-7">
                  {[
                    ['10+', 'Years shipping production automation'],
                    ['<10%', 'of UK businesses run agentic workflows today'],
                    ['£0', "Cost to find out what we'd automate for you"],
                    ['2–4wk', 'Typical audit-to-live timeline'],
                  ].map(([stat, label]) => (
                    <div key={stat}>
                      <h4 className="font-display font-black text-[2.1rem] text-ink tracking-[-0.02em] leading-none">
                        {stat}
                      </h4>
                      <p className="text-[0.78rem] text-muted-cream mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </RevealWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker mb-5">Common questions</div>
          <h2 className="font-display font-black text-h2-band uppercase text-cream mb-12 max-w-[20ch]">
            Answers before you ask.
          </h2>

          <div className="max-w-[820px] border-t border-[rgba(244,237,224,0.14)]">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group py-6 border-b border-[rgba(244,237,224,0.14)]"
              >
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden font-display font-bold text-[1.02rem] text-cream">
                  {q}
                  <span className="flex-shrink-0 text-lime text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-[0.9rem] text-muted-dark leading-[1.75] mt-4 max-w-[64ch]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <RevealWrapper>
            <div className="max-w-[760px] mb-14">
              <div className="kicker-cream mb-5">Get in touch</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[18ch]">
                Find out what your business could{' '}
                <em className="not-italic text-ink underline decoration-lime decoration-2 underline-offset-4">stop doing manually.</em>
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.75] mb-7">
                Pick a slot below — 30 minutes, free, no commitment. We&apos;ll talk through your business
                and tell you honestly what&apos;s automatable. Prefer email? Use the form.
              </p>
              <div className="pb-8 border-b border-[rgba(19,18,16,0.12)] grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-muted-cream mb-1.5">
                    Prefer to talk? Call us
                  </p>
                  <a
                    href="tel:+441246923041"
                    className="font-display font-bold text-[1.35rem] text-ink hover:text-muted-cream transition-colors no-underline"
                  >
                    01246 923041
                  </a>
                  <p className="text-[0.78rem] text-muted-cream mt-1">
                    Mon–Fri, 9am–5.30pm. You&apos;ll get Ben, not a call centre.
                  </p>
                </div>
                <div>
                  <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-muted-cream mb-1.5">
                    Email
                  </p>
                  <a
                    href="mailto:hello@automation-agency.co.uk"
                    className="font-display font-bold text-[1.15rem] text-ink hover:text-muted-cream transition-colors no-underline break-all"
                  >
                    hello@automation-agency.co.uk
                  </a>
                  <p className="text-[0.78rem] text-muted-cream mt-1">Reply within 24 hours</p>
                </div>
              </div>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
            <RevealWrapper>
              <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-cream mb-4">
                Book a slot — instant
              </p>
              <CalendlyEmbed />
            </RevealWrapper>

            <RevealWrapper>
              <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-cream mb-4">
                Or send a message
              </p>
              <ContactForm />
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* TOOLING — deliberately quiet, and deliberately last. Buyers do not
          choose a consultancy by its stack; this is here for the minority who
          ask, not as a headline. */}
      <div className="bg-ink text-cream border-t border-[rgba(244,237,224,0.14)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-10 pb-2">
          <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-4">
            Some of the tools we build with
          </p>
          <Marquee compact />
        </div>
      </div>

      <Footer />
    </>
  )
}

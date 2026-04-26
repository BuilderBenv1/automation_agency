import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import RevealWrapper from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: 'The Automation Agency — AI & Process Automation for UK Businesses',
  alternates: { canonical: 'https://automation-agency.co.uk' },
}

/* ─────────────────────────── DATA ─────────────────────────── */

const services = [
  {
    num: '01',
    title: 'AI Agent Development',
    body: 'Agents that monitor, decide, and act autonomously — pulling data, triggering actions, escalating only when a human is genuinely needed. Integrated into your existing tools, not bolted on top.',
    tag: 'Most requested',
  },
  {
    num: '02',
    title: 'Process Automation',
    body: "We map where your team's time actually goes, identify the high-value targets, and automate end-to-end. Data entry, approvals, reporting, notifications — eliminated.",
    tag: 'Fastest ROI',
  },
  {
    num: '03',
    title: 'Data Pipeline Engineering',
    body: 'Automated collection, cleaning, and delivery of data from any source — web, APIs, documents, emails — into wherever your team needs it, on a schedule, without touching it.',
  },
  {
    num: '04',
    title: 'Custom Integrations',
    body: 'Connect the tools you already use. CRM, ERP, WhatsApp, Slack, calendar, payment systems — we build the bridges so your software communicates without manual input.',
  },
  {
    num: '05',
    title: 'Communication Automation',
    body: 'Email sequences, multi-channel notifications, scheduled reporting, client updates — automated and personalised without anyone touching a template or copy-pasting an address.',
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
    sector: 'Field Services · Multi-Tenant SaaS',
    title: 'WhatsApp Job Dispatch Platform',
    body: "A field service business coordinated workers manually across WhatsApp groups and phone calls — dispatchers chasing workers, payments handled by phone. We replaced the entire process with an automated multi-tenant dispatch platform. Jobs broadcast, workers apply, payments claimed race-safe, client confirmed. The coordinator's manual workload: zero.",
    results: [
      ['Coordinator manual time', 'Eliminated'],
      ['Payment race conditions', 'Zero'],
      ['New tenant onboarding', '< 5 minutes'],
      ['Messaging cost reduction', '~65%'],
    ],
    tags: ['Next.js', 'Supabase', 'Twilio', 'Telegram Bot', 'PostgreSQL'],
  },
  {
    sector: 'Data Intelligence · Predictive Analytics',
    title: 'End-to-End Predictive Data Pipeline',
    body: 'A data-intensive operation needed 6 live sources scraped daily, run through 7 ML prediction models, results reconciled nightly, and insights distributed automatically to subscriber lists. We built the entire stack. It runs at 2am every day without anyone touching it.',
    results: [
      ['Data sources automated', '6 daily'],
      ['Live prediction models', '7'],
      ['Reconciliation jobs', '21 automated'],
      ['Human touchpoints required', 'Zero'],
    ],
    tags: ['Python', 'scikit-learn', 'Supabase', 'Selenium', 'APScheduler'],
  },
  {
    sector: 'Property Intelligence · Data Pipeline',
    title: 'UK Planning Application Monitor',
    body: 'A property intelligence client needed daily coverage of planning applications across England. Previously a full day of manual council website trawling. We automated scraping across 97% of London boroughs and built a live dashboard with alerts. Nobody has to check a council website anymore.',
    results: [
      ['Borough coverage', '97%'],
      ['Daily manual hours replaced', 'Full working day'],
      ['Data freshness', '24-hour cycle'],
      ['Dashboard & alerts', 'Live'],
    ],
    tags: ['Python', 'Playwright', 'Next.js', 'Supabase', 'React'],
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

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <div className="max-w-[1280px] mx-auto bg-bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-14 pt-[148px] pb-24 min-h-screen">
          <div style={{ animation: 'fadeUp 0.7s ease both' }}>
            <div className="eyebrow mb-7">AI &amp; Process Automation · UK</div>
            <h1 className="font-serif font-normal text-display-xl text-brand-text mb-6">
              Your team is doing work{' '}
              <em className="not-italic text-accent">a machine should do.</em>
            </h1>
            <p className="text-[1.05rem] text-brand-mid leading-[1.75] mb-10 max-w-[480px]">
              We identify the manual, repetitive processes inside your business and replace them with AI
              agents and automation systems that run unattended — so your people can focus on work that
              actually matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <a href="#contact" className="btn-primary px-6 py-3 text-[0.9rem] font-semibold text-center">
                Book Free Discovery Call
              </a>
              <a href="/audit" className="btn-outline px-6 py-3 text-[0.9rem] font-semibold text-center">
                Process Audit — £1,500
              </a>
            </div>
          </div>

          <div style={{ animation: 'fadeUp 0.7s 0.15s ease both' }}>
            <div className="bg-navy text-white rounded-[6px] p-12 relative overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
              />
              <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-white/35 mb-9">
                The opportunity
              </p>
              <div className="grid grid-cols-2 gap-8 mb-11">
                {[
                  ['<10%', 'of UK businesses run any agentic workflow today'],
                  ['34%', 'AI adoption growth among UK businesses in 2025'],
                  ['10+', 'Years building production automation systems'],
                  ['2–4wk', 'Typical time from scoped proposal to live system'],
                ].map(([stat, label]) => (
                  <div key={stat}>
                    <h3 className="font-serif font-normal text-[2.6rem] text-white tracking-[-0.03em] leading-none">{stat}</h3>
                    <p className="text-[0.8rem] text-white/40 mt-1.5 leading-snug">{label}</p>
                  </div>
                ))}
              </div>
              <div className="h-px bg-white/8 mb-7" />
              <p className="text-[0.85rem] text-white/45 leading-relaxed">
                <strong className="text-white/85 font-semibold">Based in Derbyshire.</strong> Working with
                businesses across the UK. Every project is fixed-price, scoped within 48 hours of your
                first call.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TECH STRIP */}
      <div className="bg-bg-2 border-t border-b border-brand-border py-[18px] px-14 flex items-center gap-12 overflow-hidden">
        <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-brand-muted whitespace-nowrap flex-shrink-0">
          Built with
        </span>
        <div className="flex gap-10 overflow-hidden">
          {['Python', 'Next.js', 'OpenAI', 'Claude API', 'Supabase', 'Playwright', 'Twilio', 'PostgreSQL', 'Telegram', 'scikit-learn', 'n8n', 'Vercel'].map(
            (tech) => (
              <span key={tech} className="text-[0.83rem] font-medium text-brand-border-dark whitespace-nowrap">
                {tech}
              </span>
            )
          )}
        </div>
      </div>

      {/* THE PROBLEM */}
      <section className="py-20 border-b border-brand-border bg-bg">
        <div className="max-w-[1280px] mx-auto px-14">
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border">
              {[
                {
                  icon: '📋',
                  title: "Your team copies data between systems that don't talk",
                  body: "CRM, spreadsheet, email, WhatsApp, ERP. Someone is manually bridging the gaps every single day. That's salary spent on data entry.",
                },
                {
                  icon: '⏱️',
                  title: 'Reporting takes hours that should take minutes',
                  body: 'Pulling numbers from four different places, formatting a spreadsheet, sending it manually — every week. Automatable in a day.',
                },
                {
                  icon: '📈',
                  title: "You're scaling but can't hire fast enough",
                  body: 'Headcount is expensive and slow to ramp. The right automation means your existing team handles two or three times the volume without burning out.',
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="bg-bg p-10">
                  <div className="text-[1.4rem] mb-4">{icon}</div>
                  <h3 className="font-serif font-normal text-[1.2rem] mb-2.5 tracking-[-0.01em]">{title}</h3>
                  <p className="text-[0.875rem] text-brand-muted leading-[1.75]">{body}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 bg-bg">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="flex justify-between items-end mb-16 gap-12 flex-col md:flex-row">
            <div>
              <div className="eyebrow mb-4">What We Build</div>
              <h2 className="font-serif font-normal text-display-lg text-brand-text">
                The right automation
                <br />
                for your business.
              </h2>
            </div>
            <p className="text-base text-brand-mid leading-[1.75] max-w-[500px]">
              We don&apos;t sell software subscriptions or retainer hours. We scope the problem, build the
              solution, and hand you something that runs without you.
            </p>
          </div>

          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 border border-brand-border">
              {services.map(({ num, title, body, tag }, i) => (
                <div
                  key={num}
                  className={`p-10 border-b border-r border-brand-border hover:bg-bg-2 transition-colors ${
                    i % 3 === 2 ? 'border-r-0' : ''
                  } ${i >= 3 ? 'border-b-0' : ''}`}
                >
                  <p className="text-[0.7rem] font-semibold text-brand-muted tracking-[0.08em] mb-5">{num}</p>
                  <h3 className="font-serif font-normal text-[1.35rem] tracking-[-0.01em] mb-3">{title}</h3>
                  <p className="text-[0.88rem] text-brand-muted leading-[1.75]">{body}</p>
                  {tag && <span className="inline-block mt-5 text-[0.8rem] font-semibold text-accent">{tag} →</span>}
                </div>
              ))}
              <div className="p-10 bg-navy border-brand-border hover:bg-navy-mid transition-colors md:border-r-0">
                <p className="text-[0.7rem] font-semibold text-white/30 tracking-[0.08em] mb-5">→</p>
                <h3 className="font-serif font-normal text-[1.35rem] text-white tracking-[-0.01em] mb-3">
                  Not sure where to start?
                </h3>
                <p className="text-[0.88rem] text-white/50 leading-[1.75]">
                  Book a free 30-minute discovery call. We&apos;ll ask the right questions, tell you what&apos;s
                  automatable, and give you an honest view of cost and effort — no pitch, no obligation.
                </p>
                <a
                  href="#contact"
                  className="btn-white mt-6 inline-flex px-5 py-2.5 text-sm font-semibold"
                >
                  Book Discovery Call
                </a>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* PROCESS AUDIT CALLOUT */}
      <section id="audit" className="py-20 bg-accent-light border-t border-b" style={{ borderColor: '#c5d5ee' }}>
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealWrapper>
              <div className="eyebrow mb-4">First Paid Engagement</div>
              <h2 className="font-serif font-normal text-display-md text-brand-text mb-5">
                The Process Audit:{' '}
                <em className="not-italic text-accent">
                  know exactly what to automate before spending a pound on building it.
                </em>
              </h2>
              <p className="text-[0.95rem] text-brand-mid leading-[1.75] mb-4">
                A discovery call shows you what&apos;s possible. A Process Audit tells you exactly what to
                build, in what order, and what return to expect — in writing.
              </p>
              <p className="text-[0.95rem] text-brand-mid leading-[1.75] mb-6">
                Over one to two weeks we map your core workflows, identify the automation opportunities with
                the highest ROI, and deliver a written report you can hand to any developer — including us.
              </p>
              <ul className="mb-8" style={{ borderTop: '1px solid #c5d5ee' }}>
                {[
                  'Full process map of your current workflows',
                  'Prioritised automation opportunities with effort and ROI estimates',
                  'Technical architecture recommendation per opportunity',
                  'Fixed-price implementation quote for each item',
                  'Written report — yours to keep, regardless of next steps',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 py-2.5 text-[0.9rem] text-brand-mid"
                    style={{ borderBottom: '1px solid #c5d5ee' }}
                  >
                    <span className="text-accent font-semibold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-accent px-7 py-3 text-[0.9rem] font-semibold inline-flex">
                Get Started — Book a Discovery Call
              </a>
            </RevealWrapper>

            <RevealWrapper>
              <div className="bg-navy rounded-[6px] p-12 text-white relative overflow-hidden">
                <div
                  className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
                />
                <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-white/35 mb-5">
                  Process Audit
                </p>
                <p className="font-serif font-normal text-[3.6rem] text-white tracking-[-0.04em] leading-none mb-2">
                  <span className="text-[1.2rem] font-sans font-normal">£</span>1,500
                </p>
                <p className="text-[0.85rem] text-white/45 mb-8 pb-8 leading-relaxed" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
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
                      className="flex items-start gap-2.5 py-2.5 text-[0.875rem] text-white/60"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <span className="text-white/35 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn-white w-full justify-center py-3 text-sm font-semibold">
                  Book a Discovery Call First
                </a>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 bg-navy">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="flex justify-between items-end mb-[72px] gap-12 flex-col md:flex-row">
            <div>
              <div className="eyebrow eyebrow-light mb-4">How It Works</div>
              <h2 className="font-serif font-normal text-display-lg text-white">
                From first call to live
                <br />
                <span className="text-white/40 italic">system in weeks.</span>
              </h2>
            </div>
            <p className="text-base text-white/40 leading-[1.75] max-w-[500px]">
              A clear, predictable process. No hidden phases, no scope creep. You know exactly what&apos;s
              happening — and what it costs — at every stage.
            </p>
          </div>

          <RevealWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              {processSteps.map(({ num, title, body, tag }, i) => (
                <div
                  key={num}
                  className="p-12"
                  style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
                >
                  <p className="font-serif font-normal text-[3rem] text-white/7 leading-none mb-6 tracking-[-0.04em]">
                    {num}
                  </p>
                  <h4 className="font-serif font-normal text-[1.2rem] text-white mb-3">{title}</h4>
                  <p className="text-[0.85rem] text-white/42 leading-[1.75] mb-4">{body}</p>
                  <span className="text-[0.72rem] font-semibold text-white/22 tracking-[0.08em]">{tag}</span>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-28 bg-bg">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="flex justify-between items-end mb-16 gap-12 flex-col md:flex-row">
            <div>
              <div className="eyebrow mb-4">Our Work</div>
              <h2 className="font-serif font-normal text-display-lg text-brand-text">
                Built. Shipped.
                <br />
                Running autonomously.
              </h2>
            </div>
            <p className="text-base text-brand-mid leading-[1.75] max-w-[500px]">
              Real systems, real outcomes. Every project below operates unattended today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map(({ sector, title, body, results, tags }) => (
              <RevealWrapper key={title}>
                <div className="bg-white border border-brand-border rounded-brand p-10 flex flex-col h-full hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow">
                  <p
                    className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-brand-muted mb-4 pb-4"
                    style={{ borderBottom: '1px solid #e2ddd8' }}
                  >
                    {sector}
                  </p>
                  <h3 className="font-serif font-normal text-[1.3rem] tracking-[-0.01em] mb-3.5 leading-[1.25]">
                    {title}
                  </h3>
                  <p className="text-[0.875rem] text-brand-muted leading-[1.75] flex-1 mb-7">{body}</p>
                  <div className="bg-bg-2 rounded-brand p-5 flex flex-col gap-2.5">
                    {results.map(([label, value]) => (
                      <div key={label} className="flex justify-between text-[0.82rem]">
                        <span className="text-brand-muted">{label}</span>
                        <span className="font-semibold text-navy">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.7rem] px-2 py-0.5 bg-accent-light text-accent rounded-[2px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-28 bg-bg-2 border-t border-b border-brand-border">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="flex justify-between items-end mb-16 gap-12 flex-col md:flex-row">
            <div>
              <div className="eyebrow mb-4">Pricing</div>
              <h2 className="font-serif font-normal text-display-lg text-brand-text">
                Fixed prices.
                <br />
                No surprises.
              </h2>
            </div>
            <p className="text-base text-brand-mid leading-[1.75] max-w-[500px]">
              Every engagement is agreed upfront. You know exactly what you&apos;re paying before a line of
              code is written.
            </p>
          </div>

          <RevealWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border">
              {pricingTiers.map(({ tier, name, amount, cadence, desc, features, cta, ctaStyle, featured, note }) => (
                <div key={name} className={`p-10 ${featured ? 'bg-navy' : 'bg-bg'}`}>
                  <p className={`text-[0.7rem] font-semibold tracking-[0.12em] uppercase mb-3 ${featured ? 'text-white/35' : 'text-brand-muted'}`}>
                    {tier}
                  </p>
                  <p className={`font-serif font-normal text-[1.4rem] tracking-[-0.02em] mb-6 leading-[1.2] ${featured ? 'text-white' : 'text-brand-text'}`}>
                    {name}
                  </p>
                  <p className={`font-serif font-normal text-[2.6rem] tracking-[-0.04em] leading-none ${featured ? 'text-white' : 'text-brand-text'}`}>
                    {amount}
                  </p>
                  <p className={`text-[0.8rem] mt-1.5 mb-6 pb-6 ${featured ? 'text-white/30 border-white/8' : 'text-brand-muted border-brand-border'}`} style={{ borderBottom: '1px solid' }}>
                    {cadence}
                  </p>
                  <p className={`text-[0.855rem] leading-[1.7] mb-6 ${featured ? 'text-white/45' : 'text-brand-mid'}`}>
                    {desc}
                  </p>
                  <ul className="mb-8">
                    {features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2.5 py-2 text-[0.84rem] ${featured ? 'text-white/55 border-white/8' : 'text-brand-mid border-brand-border'}`}
                        style={{ borderBottom: '1px solid' }}
                      >
                        <span className={featured ? 'text-white/40' : 'text-accent'}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`w-full flex justify-center py-3 px-4 text-sm font-semibold rounded-brand transition-colors ${
                      ctaStyle === 'white'
                        ? 'bg-white text-navy hover:bg-[#f0efec]'
                        : ctaStyle === 'outline'
                        ? 'border border-brand-border-dark text-brand-mid hover:border-brand-mid hover:text-brand-text bg-transparent'
                        : 'bg-navy text-white hover:bg-navy-mid'
                    }`}
                  >
                    {cta}
                  </a>
                  {note && (
                    <p className={`text-[0.77rem] mt-3 italic ${featured ? 'text-white/30' : 'text-brand-muted'}`}>
                      {note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 bg-bg">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <RevealWrapper>
              <div className="eyebrow mb-4">Get In Touch</div>
              <h2 className="font-serif font-normal text-display-lg text-brand-text mb-5">
                Find out what your business could{' '}
                <em className="not-italic text-accent">stop doing manually.</em>
              </h2>
              <p className="text-[0.95rem] text-brand-mid leading-[1.75] mb-6">
                Start with a free discovery call — 30 minutes, no commitment. If there&apos;s a clear
                opportunity we&apos;ll recommend a Process Audit as the logical next step.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-8 border-b border-brand-border">
                <div>
                  <p className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-brand-muted mb-1.5">
                    Call us
                  </p>
                  <a
                    href="tel:+441246923041"
                    className="font-serif text-[1.4rem] text-brand-text hover:text-accent transition-colors no-underline"
                  >
                    01246 923041
                  </a>
                  <p className="text-[0.78rem] text-brand-muted mt-1">Chesterfield · weekdays 9–5</p>
                </div>
                <div>
                  <p className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-brand-muted mb-1.5">
                    Email
                  </p>
                  <a
                    href="mailto:hello@automation-agency.co.uk"
                    className="font-serif text-[1.05rem] text-brand-text hover:text-accent transition-colors no-underline break-all"
                  >
                    hello@automation-agency.co.uk
                  </a>
                  <p className="text-[0.78rem] text-brand-muted mt-1">Reply within 24 hours</p>
                </div>
              </div>
              <div className="flex flex-col gap-3.5">
                {[
                  {
                    title: 'Free Discovery Call',
                    desc: "30 minutes. Walk us through your business and biggest time drains. We'll tell you honestly what's automatable and what it would cost.",
                    price: 'Free',
                  },
                  {
                    title: 'Process Audit',
                    desc: '1–2 weeks. Full workflow mapping, ROI estimates, written report, and fixed-price build quote. Credited against your project if you proceed.',
                    price: '£1,500',
                  },
                ].map(({ title, desc, price }) => (
                  <div
                    key={title}
                    className="bg-white border border-brand-border rounded-brand p-6 flex justify-between items-center gap-6 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow"
                  >
                    <div>
                      <h4 className="font-serif font-normal text-[1.1rem] mb-1.5">{title}</h4>
                      <p className="text-[0.83rem] text-brand-muted leading-[1.6]">{desc}</p>
                    </div>
                    <span className="font-serif font-normal text-[1.4rem] text-navy whitespace-nowrap flex-shrink-0">
                      {price}
                    </span>
                  </div>
                ))}
              </div>
            </RevealWrapper>

            <RevealWrapper>
              <ContactForm />
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-bg-2 border-t border-brand-border">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <RevealWrapper>
              <div className="eyebrow mb-4">About</div>
              <h2 className="font-serif font-normal text-display-md text-brand-text mb-6">
                Built by someone who has{' '}
                <em className="not-italic text-accent">actually built it.</em>
              </h2>
              <p className="text-[0.925rem] text-brand-mid leading-[1.8] mb-[18px]">
                The Automation Agency is a UK-based consultancy run by a developer with over a decade of
                building real production systems — automation stacks, ML pipelines, multi-tenant SaaS
                platforms, AI agents, and data infrastructure across multiple industries.
              </p>
              <p className="text-[0.925rem] text-brand-mid leading-[1.8] mb-[18px]">
                Not a consultant who reads about AI. Someone who writes the code, ships it to production,
                and keeps it running. If you ask what stack we&apos;d use for your project, we&apos;ll tell you
                exactly — and show you something we&apos;ve already built with it.
              </p>
              <p className="text-[0.925rem] text-brand-mid leading-[1.8] mb-7">
                Based in Derbyshire, working with clients across the UK.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'Next.js', 'React', 'Supabase', 'PostgreSQL', 'Playwright', 'OpenAI API', 'Claude API', 'Twilio', 'Telegram Bots', 'scikit-learn', 'n8n', 'Vercel', 'Docker'].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="text-[0.775rem] px-2.5 py-1 border border-brand-border-dark text-brand-mid rounded-[2px]"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </RevealWrapper>

            <div className="flex flex-col gap-5">
              <RevealWrapper>
                <div className="bg-navy rounded-brand p-10">
                  <p className="font-serif font-normal text-[1.2rem] text-white/88 leading-[1.55] tracking-[-0.01em] mb-4">
                    &ldquo;In the future, every business — just like they have a website and a phone number —
                    will also have their own AI.&rdquo;
                  </p>
                  <p className="text-[0.78rem] text-white/32 font-medium">— Mark Zuckerberg, 2024</p>
                </div>
              </RevealWrapper>

              <RevealWrapper>
                <div className="bg-white border border-brand-border rounded-brand p-9 grid grid-cols-2 gap-7">
                  {[
                    ['10+', 'Years shipping production automation'],
                    ['<10%', 'of UK businesses run agentic workflows today'],
                    ['£0', "Cost to find out what we'd automate for you"],
                    ['2–4wk', 'Typical audit-to-live timeline'],
                  ].map(([stat, label]) => (
                    <div key={stat}>
                      <h4 className="font-serif font-normal text-[2.2rem] text-accent tracking-[-0.03em] leading-none">
                        {stat}
                      </h4>
                      <p className="text-[0.78rem] text-brand-muted mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </RevealWrapper>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

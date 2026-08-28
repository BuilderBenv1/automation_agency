import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import ContactForm from '@/components/ContactForm'

const CANONICAL = 'https://www.automation-agency.co.uk/business-automation-east-midlands'

export const metadata: Metadata = {
  title: { absolute: 'Business Process Automation Across the East Midlands' },
  description:
    'Automation consultancy for East Midlands businesses, run from Chesterfield. Derby, Nottingham, Leicester, Mansfield, Sheffield and across Derbyshire. In-person kickoff at no extra charge, fixed prices, free 30-minute call.',
  alternates: { canonical: CANONICAL },
}

const cityPages = [
  {
    href: '/ai-automation-chesterfield',
    name: 'Chesterfield',
    line: 'Home. Same-day on-site visits across S40–S45 and the surrounding villages.',
  },
  {
    href: '/ai-automation-derbyshire',
    name: 'Derbyshire',
    line: 'Derby to the High Peak — manufacturing, logistics on the M1 corridor, Peak District hospitality.',
  },
  {
    href: '/ai-automation-sheffield',
    name: 'Sheffield',
    line: 'Thirty minutes north. Advanced manufacturing, healthcare, and the Kelham Island tech cluster.',
  },
  {
    href: '/ai-automation-nottingham',
    name: 'Nottingham',
    line: 'Forty-five minutes via the M1. Financial services, life sciences, and a deep SME supplier base.',
  },
]

const alsoCovered = [
  ['Derby', '45 min'],
  ['Mansfield', '25 min'],
  ['Leicester', '1 hr 10'],
  ['Alfreton', '20 min'],
  ['Ilkeston', '35 min'],
  ['Worksop', '30 min'],
  ['Loughborough', '55 min'],
  ['Newark', '50 min'],
  ['Matlock', '25 min'],
  ['Buxton', '45 min'],
  ['Long Eaton', '40 min'],
  ['Burton upon Trent', '50 min'],
]

const sectors = [
  {
    sector: 'Manufacturing & engineering',
    body: 'The region’s backbone, from Rolls-Royce suppliers around Derby to specialist engineering across Chesterfield and the Amber Valley. Shop-floor data rarely reaches the back office without someone re-typing it. Stock, scheduling, supplier ordering and reporting are the usual first wins.',
  },
  {
    sector: 'Logistics & distribution',
    body: 'The M1 corridor and Markham Vale have made distribution one of the region’s biggest employers. Job allocation, driver comms, proof of delivery and customer updates are almost always handled by a person watching a screen — and almost always shouldn’t be.',
  },
  {
    sector: 'Professional services',
    body: 'Accountants, solicitors, consultancies and agencies across Derby, Nottingham and Chesterfield, typically running on a CRM, an accounts package and email that were never introduced to each other. Client onboarding, document chasing and deadline reminders pay back fastest.',
  },
]

const faqs = [
  {
    q: 'Which East Midlands towns and cities do you cover?',
    a: 'We are based in Chesterfield and work across the whole region: Derby, Nottingham, Leicester, Mansfield, Sheffield, Worksop, Alfreton, Loughborough, Newark, Burton upon Trent and everywhere between. Most are within an hour’s drive, so an in-person kickoff is straightforward. We also work remotely with clients anywhere in the UK.',
  },
  {
    q: 'Do you charge for travel within the East Midlands?',
    a: 'No. The two-hour kickoff session for a Process Audit is included in the £1,500 fixed fee, and travel anywhere in the East Midlands is included with it. There is no separate mileage or day rate.',
  },
  {
    q: 'Do I have to be in the East Midlands to work with you?',
    a: 'No — most of our clients are not local, and discovery calls, audits and builds all run remotely by default. Being nearby simply means we can do the kickoff face to face rather than over video, which usually produces a better audit because we can watch the process rather than hear it described.',
  },
  {
    q: 'What size of East Midlands business do you usually work with?',
    a: 'Typically 5–200 staff, with most between 10 and 50. The work starts making sense once there are repeated processes and at least one person whose day involves moving information between systems.',
  },
  {
    q: 'How quickly can you start in the East Midlands?',
    a: 'Discovery calls are usually within five working days. A Process Audit runs one to two weeks. Builds start within about two weeks of a signed quote and typically deliver in two to six weeks depending on scope.',
  },
]

export default function EastMidlandsPage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.automation-agency.co.uk' },
      { '@type': 'ListItem', position: 2, name: 'East Midlands', item: CANONICAL },
    ],
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business process automation in the East Midlands',
    serviceType: 'Business process automation',
    description:
      'Fixed-price business process automation for businesses across the East Midlands, delivered from Chesterfield with in-person kickoff included.',
    url: CANONICAL,
    provider: {
      '@type': 'ProfessionalService',
      name: 'The Automation Agency',
      url: 'https://www.automation-agency.co.uk',
      telephone: '+441246923041',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chesterfield',
        addressRegion: 'Derbyshire',
        addressCountry: 'GB',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 53.235, longitude: -1.421 },
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'East Midlands' },
      { '@type': 'AdministrativeArea', name: 'Derbyshire' },
      { '@type': 'AdministrativeArea', name: 'Nottinghamshire' },
      { '@type': 'AdministrativeArea', name: 'Leicestershire' },
      { '@type': 'City', name: 'Chesterfield' },
      { '@type': 'City', name: 'Derby' },
      { '@type': 'City', name: 'Nottingham' },
      { '@type': 'City', name: 'Leicester' },
      { '@type': 'City', name: 'Mansfield' },
      { '@type': 'City', name: 'Sheffield' },
    ],
  }

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-16 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <div>
            <div className="kicker mb-6">Automation in the East Midlands</div>
            <h1 className="font-display font-black text-h1-mega uppercase mb-8">
              Business process automation across the{' '}
              <span className="text-lime">East Midlands.</span>
            </h1>
            <p className="text-muted-dark leading-[1.7] max-w-[560px] mb-5 text-[1.05rem]">
              We are based in Chesterfield and work with businesses across the region — Derby,
              Nottingham, Leicester, Mansfield, Sheffield and the towns between. Every project is
              fixed-price and scoped within 48 hours of the first call.
            </p>
            <p className="text-muted-dark/80 leading-[1.7] max-w-[560px] mb-9 text-[0.92rem]">
              Almost everywhere in the region is inside an hour&apos;s drive, so the kickoff happens in
              your building rather than over video — included, with no travel charge.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#book" className="btn-lime">Book a free discovery call</a>
              <a href="tel:+441246923041" className="btn-ghost">01246 923041</a>
            </div>
          </div>

          <RevealWrapper>
            <div className="bg-ink-2 rounded-2xl p-8 md:p-10 border border-[rgba(244,237,224,0.14)] relative overflow-hidden">
              <div
                className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(200,240,74,0.1) 0%, transparent 70%)' }}
              />
              <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-5">
                Process Audit
              </p>
              <p className="font-display font-black text-[3rem] md:text-[3.4rem] text-cream tracking-[-0.03em] leading-none mb-2">
                <span className="text-[1.2rem] font-sans font-normal">£</span>1,500
              </p>
              <p className="text-[0.85rem] text-muted-dark mb-6 pb-6 leading-relaxed border-b border-[rgba(244,237,224,0.14)]">
                Fixed fee, credited in full against your build if you proceed within 60 days. In-person
                kickoff included anywhere in the East Midlands.
              </p>
              <Link href="/audit" className="btn-lime w-full justify-center">
                See audit details
              </Link>
            </div>
          </RevealWrapper>
        </div>
      </div>

      {/* CITY PAGES */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">Where we work</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[20ch]">
            Four bases of operation, <span className="text-muted-cream">one hour apart.</span>
          </h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.75] max-w-[560px] mb-14">
            Each of these has its own page with the local detail — the industries, the areas covered and
            the questions businesses there tend to ask.
          </p>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
              {cityPages.map(({ href, name, line }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-cream-2 rounded-2xl p-8 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(19,18,16,0.12)]"
                >
                  <h3 className="font-display font-bold text-ink text-[1.2rem] mb-2">
                    Automation in {name} <span aria-hidden="true">→</span>
                  </h3>
                  <p className="text-[0.9rem] text-muted-cream leading-[1.7]">{line}</p>
                </Link>
              ))}
            </div>
          </RevealWrapper>

          <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-cream mb-5">
            Also covered — typical drive time from Chesterfield
          </p>
          <div className="flex flex-wrap gap-2">
            {alsoCovered.map(([town, time]) => (
              <span
                key={town}
                className="text-[0.82rem] px-3 py-1.5 border border-[rgba(19,18,16,0.16)] text-muted-cream rounded-full"
              >
                {town} <span className="text-ink/40">· {time}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONAL ECONOMY */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker mb-5">The regional picture</div>
          <h2 className="font-display font-black text-h2-band uppercase text-cream mb-6 max-w-[24ch]">
            An economy of mid-sized firms that have{' '}
            <span className="text-lime">outgrown their processes.</span>
          </h2>
          <p className="text-[0.95rem] text-muted-dark leading-[1.75] max-w-[620px] mb-14">
            The East Midlands has proportionally more manufacturing and logistics than most UK regions and
            fewer head offices. That means a lot of 10–100 person firms running real operations on
            software that was chosen one tool at a time, with a person in the middle holding it together.
          </p>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {sectors.map(({ sector, body }) => (
                <div key={sector} className="bg-ink-2 border border-[rgba(244,237,224,0.1)] rounded-2xl p-8">
                  <h3 className="font-display font-bold text-cream text-[1.05rem] mb-3">{sector}</h3>
                  <p className="text-[0.875rem] text-muted-dark leading-[1.75]">{body}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">Common questions</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-12 max-w-[24ch]">
            About working with us in the region.
          </h2>
          <div className="max-w-[820px] border-t border-[rgba(19,18,16,0.12)] mb-14">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group py-6 border-b border-[rgba(19,18,16,0.12)]">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden font-display font-bold text-[1.02rem] text-ink">
                  {q}
                  <span className="flex-shrink-0 text-ink/40 text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-[0.9rem] text-muted-cream leading-[1.75] mt-4 max-w-[64ch]">{a}</p>
              </details>
            ))}
          </div>

          <div className="kicker-cream mb-5">Read next</div>
          <div className="flex flex-wrap gap-4">
            {[
              ['/audit', 'What the £1,500 audit covers'],
              ['/automation-cost-guide-uk', 'What automation costs in 2026'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 bg-cream-2 hover:bg-lime/40 text-ink font-display font-bold text-[0.85rem] px-5 py-3 rounded-full no-underline transition-colors"
              >
                {label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section id="book" className="bg-ink text-cream border-t border-[rgba(244,237,224,0.14)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <RevealWrapper>
            <div className="max-w-[700px] mb-12">
              <div className="kicker mb-5">Book now</div>
              <h2 className="font-display font-black text-h2-band uppercase text-cream mb-6 max-w-[20ch]">
                Free 30-minute call. <span className="text-lime">No commitment, no pitch.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-dark leading-[1.75] mb-6">
                Pick a slot below. We&apos;ll talk through your business, work out whether there is a
                clear automation opportunity, and tell you honestly whether the Process Audit is the right
                next step. East Midlands clients get the kickoff in person at no extra charge.
              </p>
              <p className="text-[0.95rem] text-muted-dark leading-[1.75]">
                Prefer to talk now?{' '}
                <a href="tel:+441246923041" className="text-cream font-bold no-underline hover:text-lime">
                  01246 923041
                </a>{' '}
                — Mon–Fri, 9am–5.30pm.
              </p>
            </div>
          </RevealWrapper>
          <RevealWrapper>
            <CalendlyEmbed />
          </RevealWrapper>

          <div className="mt-16 pt-16 border-t border-[rgba(244,237,224,0.14)]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
              <div>
                <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-4">
                  Or send a message
                </p>
                <h3 className="font-display font-black text-[1.6rem] uppercase text-cream mb-4 leading-tight">
                  Prefer email? <span className="text-muted-dark">Drop us a note.</span>
                </h3>
                <p className="text-[0.92rem] text-muted-dark leading-[1.75]">
                  Tell us what your team is doing manually and we&apos;ll reply within 24 hours.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

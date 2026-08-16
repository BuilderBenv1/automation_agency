import type { ReactNode } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import ContactForm from '@/components/ContactForm'

export type CityIndustry = {
  sector: string
  body: string
}

export type CityFaq = {
  q: string
  a: string
}

export type CityData = {
  city: string
  region: string
  urlSlug: string
  eyebrow: string
  heroH1: ReactNode
  heroIntro: string
  driveTime: string
  localContext: string
  areasServed: string[]
  industries: CityIndustry[]
  faqs: CityFaq[]
}

// "What we build" — service names link through to the matching service page
// for internal linking / SEO.
const WHAT_WE_BUILD: [string, string, string][] = [
  ['AI Agent Development', 'Agents that monitor, decide, and act autonomously.', '/ai-automation-agency'],
  ['Process Automation', 'End-to-end automation of data entry, approvals, and reporting.', '/zapier-make-automation'],
  ['Data Pipeline Engineering', 'Automated collection, cleaning, and delivery of data.', '/internal-tools-dashboard'],
  ['Custom Integrations', 'Bridges between the tools you already use.', '/crm-automation'],
  ['Communication Automation', 'Email, multi-channel notifications, scheduled reporting.', '/whatsapp-chatbot'],
]

export default function CityPage({ data }: { data: CityData }) {
  const canonical = `https://www.automation-agency.co.uk/${data.urlSlug}`
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `AI & Process Automation in ${data.city}`,
    provider: {
      '@type': 'ProfessionalService',
      name: 'The Automation Agency',
      url: 'https://www.automation-agency.co.uk',
      logo: 'https://www.automation-agency.co.uk/logo.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chesterfield',
        addressRegion: 'Derbyshire',
        addressCountry: 'GB',
      },
    },
    areaServed: { '@type': 'Place', name: data.city },
    url: canonical,
  }

  return (
    <>
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-16 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <div>
            <div className="kicker mb-6">{data.eyebrow}</div>

            <h1 className="font-display font-black text-h1-mega uppercase mb-8 [&_.text-accent]:text-lime">
              {data.heroH1}
            </h1>

            <p className="text-muted-dark leading-[1.7] max-w-[560px] mb-5 text-[1.05rem]">
              {data.heroIntro}
            </p>
            <p className="text-muted-dark/80 leading-[1.7] max-w-[560px] mb-9 text-[0.92rem]">
              {data.driveTime}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#book" className="btn-lime">
                Book free discovery call
              </a>
              <a href="#book" className="btn-ghost">
                See available times ↓
              </a>
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
                Fixed fee. Credited in full against your build if you proceed within 60 days.
                In-person kickoff at no extra charge for {data.city} clients.
              </p>
              <Link href="/audit" className="btn-lime w-full justify-center">
                See audit details
              </Link>
            </div>
          </RevealWrapper>
        </div>
      </div>

      {/* LOCAL CONTEXT */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16">
            <RevealWrapper>
              <div className="kicker-cream mb-5">Why local matters</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[18ch]">
                Built locally, for <span className="text-ink underline decoration-lime decoration-2 underline-offset-4">{data.city} businesses.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.8]">{data.localContext}</p>
            </RevealWrapper>

            <RevealWrapper>
              <div className="bg-cream-2 rounded-2xl p-8">
                <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-cream mb-5">
                  Areas we cover
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {data.areasServed.map((area) => (
                    <span
                      key={area}
                      className="text-[0.8rem] px-2.5 py-1 border border-[rgba(19,18,16,0.16)] text-muted-cream rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <p className="text-[0.78rem] text-muted-cream mt-5 leading-relaxed">
                  Not listed? We work across the wider {data.region} —{' '}
                  <a href="#book" className="text-ink font-semibold underline hover:text-muted-cream">
                    get in touch
                  </a>{' '}
                  to confirm.
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker mb-5">Common projects</div>
          <h2 className="font-display font-black text-h2-band uppercase text-cream mb-14 max-w-[24ch]">
            Where we typically help <span className="text-lime">{data.city} businesses.</span>
          </h2>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.industries.map(({ sector, body }) => (
                <div
                  key={sector}
                  className="bg-ink-2 border border-[rgba(244,237,224,0.1)] rounded-2xl p-8"
                >
                  <h3 className="font-display font-bold text-cream text-[1.05rem] mb-3">
                    {sector}
                  </h3>
                  <p className="text-[0.875rem] text-muted-dark leading-[1.75]">{body}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
            <RevealWrapper>
              <div className="kicker-cream mb-5">What we build</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[18ch]">
                AI agents, automation systems,{' '}
                <span className="text-muted-cream">and the integrations they need.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-8">
                We don&apos;t sell software subscriptions or retainer hours. We scope your
                problem, build the solution, and hand you something that runs without you. Fixed
                prices, fixed scope.
              </p>
              <Link href="/#services" className="btn-dark">
                See all services
              </Link>
            </RevealWrapper>

            <RevealWrapper>
              <ul className="list-none border-t border-[rgba(19,18,16,0.12)]">
                {WHAT_WE_BUILD.map(([name, desc, slug]) => (
                  <li key={name} className="py-4 border-b border-[rgba(19,18,16,0.12)]">
                    <Link
                      href={slug}
                      className="inline-flex items-center gap-2 font-display font-bold text-[1.05rem] text-ink hover:decoration-lime hover:underline no-underline transition-colors"
                    >
                      {name} <span aria-hidden="true">→</span>
                    </Link>
                    <p className="text-[0.85rem] text-muted-cream mt-1">{desc}</p>
                  </li>
                ))}
              </ul>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker mb-5">Common questions</div>
          <h2 className="font-display font-black text-h2-band uppercase text-cream mb-12 max-w-[24ch]">
            About working with us in <span className="text-lime">{data.city}.</span>
          </h2>
          <div className="max-w-[820px] border-t border-[rgba(244,237,224,0.14)]">
            {data.faqs.map(({ q, a }) => (
              <details key={q} className="group py-6 border-b border-[rgba(244,237,224,0.14)]">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden font-display font-bold text-[1.02rem] text-cream">
                  {q}
                  <span className="flex-shrink-0 text-lime text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-[0.9rem] text-muted-dark leading-[1.75] mt-4 max-w-[64ch]">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING — Calendly + contact form, no phone */}
      <section id="book" className="bg-cream text-ink border-t border-[rgba(19,18,16,0.12)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <RevealWrapper>
            <div className="max-w-[680px] mb-10">
              <div className="kicker-cream mb-5">Book now</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[20ch]">
                Free 30-minute discovery call.{' '}
                <span className="text-muted-cream">No commitment, no pitch.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.75]">
                Pick a slot below. We&apos;ll talk through your business, identify where
                there&apos;s a clear automation opportunity, and tell you honestly whether the
                Process Audit is the right next step. {data.city} clients get an in-person kickoff
                at no extra charge.
              </p>
            </div>
          </RevealWrapper>

          <RevealWrapper>
            <CalendlyEmbed />
          </RevealWrapper>

          <div className="mt-16 pt-16 border-t border-[rgba(19,18,16,0.12)]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
              <div>
                <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-cream mb-4">
                  Or send a message
                </p>
                <h3 className="font-display font-black text-[1.6rem] uppercase text-ink mb-4 leading-tight">
                  Prefer email? <span className="text-muted-cream">Drop us a note instead.</span>
                </h3>
                <p className="text-[0.92rem] text-muted-cream leading-[1.75] mb-4">
                  Walk us through what your {data.city} team is doing manually. We&apos;ll reply
                  within 24 hours.
                </p>
                <a
                  href="mailto:hello@automation-agency.co.uk"
                  className="font-display font-bold text-[1.05rem] text-ink hover:text-muted-cream transition-colors no-underline break-all"
                >
                  hello@automation-agency.co.uk
                </a>
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

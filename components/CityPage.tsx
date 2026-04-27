import type { ReactNode } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'
import CalendlyEmbed from '@/components/CalendlyEmbed'

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
      telephone: '+441246923041',
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
      <div className="max-w-[1280px] mx-auto px-14 pt-36 pb-16 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center bg-bg">
        <div>
          <div className="eyebrow mb-4">{data.eyebrow}</div>
          <h1 className="font-serif font-normal text-display-xl text-brand-text mb-6">
            {data.heroH1}
          </h1>
          <p className="text-[1.05rem] text-brand-mid leading-[1.75] mb-5 max-w-[560px]">
            {data.heroIntro}
          </p>
          <p className="text-[0.95rem] text-brand-muted leading-[1.75] mb-9 max-w-[560px]">
            {data.driveTime}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#book" className="btn-primary px-6 py-3 text-sm font-semibold">
              Book Free Discovery Call
            </a>
            <a
              href="tel:+441246923041"
              className="btn-outline px-6 py-3 text-sm font-semibold no-underline"
            >
              Call 01246 923041
            </a>
          </div>
        </div>

        <div className="bg-navy rounded-[6px] p-10 text-white relative overflow-hidden">
          <div
            className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
          />
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-white/35 mb-5">
            Process Audit
          </p>
          <p className="font-serif font-normal text-[3.4rem] text-white tracking-[-0.04em] leading-none mb-2">
            <span className="text-[1.2rem] font-sans font-normal">£</span>1,500
          </p>
          <p
            className="text-[0.85rem] text-white/45 mb-6 pb-6 leading-relaxed"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            Fixed fee. Credited in full against your build if you proceed within 60 days. In-person
            kickoff at no extra charge for {data.city} clients.
          </p>
          <Link
            href="/audit"
            className="btn-white w-full justify-center py-3 text-sm font-semibold"
          >
            See Audit Details
          </Link>
        </div>
      </div>

      {/* LOCAL CONTEXT */}
      <section className="py-20 border-t border-b border-brand-border bg-bg-2">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16">
            <RevealWrapper>
              <div className="eyebrow mb-4">Why Local Matters</div>
              <h2 className="font-serif font-normal text-display-md text-brand-text mb-6">
                Built locally, for{' '}
                <em className="not-italic text-accent">{data.city} businesses.</em>
              </h2>
              <p className="text-[0.95rem] text-brand-mid leading-[1.8]">{data.localContext}</p>
            </RevealWrapper>

            <RevealWrapper>
              <div className="bg-white border border-brand-border rounded-brand p-8">
                <p className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-5">
                  Areas We Cover
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {data.areasServed.map((area) => (
                    <span
                      key={area}
                      className="text-[0.8rem] px-2.5 py-1 border border-brand-border-dark text-brand-mid rounded-[2px]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <p className="text-[0.78rem] text-brand-muted mt-5 leading-relaxed">
                  Not listed? We work across the wider {data.region} — call to confirm.
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-20 bg-bg">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="eyebrow mb-4">Common Projects</div>
          <h2 className="font-serif font-normal text-display-md text-brand-text mb-12">
            Where we typically help
            <br />
            <em className="not-italic text-accent">{data.city} businesses.</em>
          </h2>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border">
              {data.industries.map(({ sector, body }) => (
                <div key={sector} className="bg-white p-9">
                  <h3 className="font-serif font-normal text-[1.2rem] mb-3 tracking-[-0.01em]">
                    {sector}
                  </h3>
                  <p className="text-[0.875rem] text-brand-muted leading-[1.75]">{body}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* SERVICES BRIEF */}
      <section className="py-20 bg-navy">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
            <RevealWrapper>
              <div className="eyebrow eyebrow-light mb-4">What We Build</div>
              <h2 className="font-serif font-normal text-display-md text-white mb-6">
                AI agents, automation systems,{' '}
                <em className="not-italic text-white/50">and the integrations they need.</em>
              </h2>
              <p className="text-[0.95rem] text-white/60 leading-[1.8] mb-8">
                We don&apos;t sell software subscriptions or retainer hours. We scope your problem,
                build the solution, and hand you something that runs without you. Fixed prices,
                fixed scope.
              </p>
              <Link href="/#services" className="btn-white px-6 py-3 text-sm font-semibold">
                See All Services
              </Link>
            </RevealWrapper>

            <RevealWrapper>
              <ul
                className="list-none"
                style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
              >
                {[
                  ['AI Agent Development', 'Agents that monitor, decide, and act autonomously.'],
                  ['Process Automation', 'End-to-end automation of data entry, approvals, and reporting.'],
                  ['Data Pipeline Engineering', 'Automated collection, cleaning, and delivery of data.'],
                  ['Custom Integrations', 'Bridges between the tools you already use.'],
                  ['Communication Automation', 'Email, multi-channel notifications, scheduled reporting.'],
                ].map(([name, desc]) => (
                  <li
                    key={name}
                    className="py-4"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <p className="font-serif text-[1.05rem] text-white tracking-[-0.01em]">
                      {name}
                    </p>
                    <p className="text-[0.85rem] text-white/45 mt-1">{desc}</p>
                  </li>
                ))}
              </ul>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-bg-2 border-t border-b border-brand-border">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="eyebrow mb-4">Common Questions</div>
          <h2 className="font-serif font-normal text-display-md text-brand-text mb-10">
            About working with us in <em className="not-italic text-accent">{data.city}.</em>
          </h2>
          <RevealWrapper>
            <div className="border border-brand-border rounded-brand overflow-hidden bg-white">
              {data.faqs.map(({ q, a }, i) => (
                <div
                  key={q}
                  className={`p-7 ${i < data.faqs.length - 1 ? 'border-b border-brand-border' : ''}`}
                >
                  <h3 className="font-serif font-normal text-[1.08rem] mb-2.5 tracking-[-0.01em]">
                    {q}
                  </h3>
                  <p className="text-[0.875rem] text-brand-muted leading-[1.75]">{a}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* CALENDAR CTA */}
      <section id="book" className="py-24 bg-bg">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="max-w-[680px] mb-10">
            <div className="eyebrow mb-4">Book Now</div>
            <h2 className="font-serif font-normal text-display-md text-brand-text mb-4">
              Free 30-minute discovery call.{' '}
              <em className="not-italic text-accent">No commitment, no pitch.</em>
            </h2>
            <p className="text-[0.95rem] text-brand-mid leading-[1.75]">
              Pick a slot below. We&apos;ll talk through your business, identify where there&apos;s a
              clear automation opportunity, and tell you honestly whether the Process Audit is the
              right next step. {data.city} clients get an in-person kickoff at no extra charge.
            </p>
          </div>
          <RevealWrapper>
            <CalendlyEmbed />
          </RevealWrapper>
          <p className="text-[0.85rem] text-brand-muted mt-8 text-center">
            Prefer phone or email?{' '}
            <a href="tel:+441246923041" className="text-accent hover:underline">
              01246 923041
            </a>{' '}
            ·{' '}
            <a
              href="mailto:hello@automation-agency.co.uk"
              className="text-accent hover:underline"
            >
              hello@automation-agency.co.uk
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}

import type { ReactNode } from 'react'
import Link from 'next/link'
import RevealWrapper from '@/components/RevealWrapper'
import CalendlyEmbed from '@/components/CalendlyEmbed'

export type LandingProof = {
  client: string
  metric: string
  metricLabel: string
}

export type LandingData = {
  urlSlug: string
  eyebrow: string
  h1: ReactNode
  subhead: string
  intro: string
  bullets: string[]
  proofs: LandingProof[]
}

export default function LandingPage({ data }: { data: LandingData }) {
  const canonical = `https://www.automation-agency.co.uk/lp/${data.urlSlug}`
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.eyebrow,
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
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    url: canonical,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />

      {/* MINIMAL NAV — single conversion path */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[68px] px-8 md:px-14 bg-bg border-b border-brand-border">
        <Link href="/" className="font-serif text-[1.05rem] text-brand-text no-underline">
          The Automation Agency
        </Link>
        <a
          href="tel:+441246923041"
          className="text-sm font-semibold text-brand-text hover:text-accent transition-colors no-underline"
        >
          <span className="hidden md:inline">Call </span>01246 923041
        </a>
      </nav>

      {/* HERO */}
      <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-12 md:pb-16 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start bg-bg">
        <div>
          <div className="eyebrow mb-4">{data.eyebrow}</div>
          <h1 className="font-serif font-normal text-display-xl text-brand-text mb-6">
            {data.h1}
          </h1>
          <p className="text-[1.1rem] text-brand-text leading-[1.55] font-medium mb-5 max-w-[560px]">
            {data.subhead}
          </p>
          <p className="text-[1rem] text-brand-mid leading-[1.75] mb-8 max-w-[560px]">
            {data.intro}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 max-w-[560px] mb-9">
            {data.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[0.92rem] text-brand-mid leading-snug"
              >
                <span className="text-accent font-semibold flex-shrink-0 mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#book" className="btn-primary px-7 py-3.5 text-sm font-semibold">
              Book Free Discovery Call
            </a>
            <a
              href="tel:+441246923041"
              className="btn-outline px-7 py-3.5 text-sm font-semibold no-underline"
            >
              Call 01246 923041
            </a>
          </div>
        </div>

        <RevealWrapper>
          <div className="bg-white border border-brand-border rounded-brand p-8">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-brand-border">
              <img
                src="/founder.jpg"
                alt="Ben Horne, founder of The Automation Agency"
                width={72}
                height={72}
                className="rounded-full object-cover w-[72px] h-[72px] flex-shrink-0 bg-bg-2"
              />
              <div>
                <p className="font-serif text-[1.15rem] text-brand-text leading-tight">Ben Horne</p>
                <p className="text-[0.78rem] text-brand-muted mt-1">
                  Founder · 10+ yrs production automation
                </p>
              </div>
            </div>
            <div className="flex gap-0.5 mb-3 text-[0.95rem]" style={{ color: '#fbbc04' }}>
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="font-serif font-normal text-[1.02rem] text-brand-text leading-[1.5] mb-3">
              &ldquo;Hard working, fast responding, and very dedicated agency. Highly recommend.&rdquo;
            </p>
            <p className="text-[0.78rem] text-brand-muted">
              Dor Iluz · Marmadbir · Verified Google review
            </p>
            <div className="mt-6 pt-6 border-t border-brand-border grid grid-cols-3 gap-3">
              {data.proofs.map(({ client, metric, metricLabel }) => (
                <div key={client}>
                  <p className="font-serif text-[1.5rem] text-accent leading-none tracking-[-0.03em]">
                    {metric}
                  </p>
                  <p className="text-[0.7rem] text-brand-muted mt-1.5 leading-tight">
                    {metricLabel}
                  </p>
                  <p className="text-[0.65rem] text-brand-muted/70 mt-0.5 font-medium tracking-[0.04em] uppercase">
                    {client}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealWrapper>
      </div>

      {/* PROCESS BAR */}
      <div className="bg-navy text-white py-8 px-8 md:px-14">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            ['1', 'Free 30-min call', 'No commitment, no pitch'],
            ['2', 'Process Audit', '£1,500 fixed · credited if you build'],
            ['3', 'Fixed-price build', 'From £3,000 · 2–6 weeks'],
            ['4', 'Handover & support', '30 days post-launch included'],
          ].map(([num, title, sub]) => (
            <div key={title} className="flex gap-4 items-start">
              <span className="font-serif font-normal text-[1.6rem] text-white/30 leading-none">
                {num}
              </span>
              <div>
                <p className="font-serif text-[1rem] text-white leading-tight mb-1">{title}</p>
                <p className="text-[0.78rem] text-white/45 leading-snug">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CALENDAR */}
      <section id="book" className="py-20 bg-bg">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14">
          <div className="max-w-[680px] mb-10">
            <div className="eyebrow mb-4">Book Now</div>
            <h2 className="font-serif font-normal text-display-md text-brand-text mb-4">
              Free 30-minute discovery call.{' '}
              <em className="not-italic text-accent">No commitment, no pitch.</em>
            </h2>
            <p className="text-[0.95rem] text-brand-mid leading-[1.75]">
              Pick a slot below. We&apos;ll talk through your business, identify the highest-ROI
              automation opportunities, and tell you honestly whether a Process Audit is the right
              next step. Fixed prices, no scope creep, no commitment to proceed.
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
            <a href="mailto:hello@automation-agency.co.uk" className="text-accent hover:underline">
              hello@automation-agency.co.uk
            </a>
          </p>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="py-8 px-8 md:px-14 border-t border-brand-border bg-bg">
        <div className="max-w-[1180px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[0.78rem] text-brand-muted">
            © 2026 The Automation Agency · Chesterfield, Derbyshire, UK
          </p>
          <div className="flex gap-6 text-[0.78rem]">
            <Link href="/" className="text-brand-muted hover:text-brand-text no-underline">
              Main site
            </Link>
            <Link href="/privacy" className="text-brand-muted hover:text-brand-text no-underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-brand-muted hover:text-brand-text no-underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

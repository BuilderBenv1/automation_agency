import type { ReactNode } from 'react'
import Link from 'next/link'
import RevealWrapper from '@/components/RevealWrapper'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import ContactForm from '@/components/ContactForm'

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

const PROCESS_STEPS: [string, string, string][] = [
  ['1', 'Free 30-min call', 'No commitment, no pitch'],
  ['2', 'Process Audit', '£1,500 fixed · credited if you build'],
  ['3', 'Fixed-price build', 'From £3,000 · 2–6 weeks'],
  ['4', 'Handover & support', '30 days post-launch included'],
]

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

      {/* MINIMAL HEADER — single conversion path, no phone */}
      <header className="fixed top-0 inset-x-0 z-50 bg-ink/95 backdrop-blur border-b border-[rgba(244,237,224,0.14)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-4 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-[1.05rem] text-cream no-underline">
            The Automation Agency
          </Link>
          <a href="#book" className="btn-lime">
            Book a call
          </a>
        </div>
      </header>

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-16 md:pb-20 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="kicker mb-6">{data.eyebrow}</div>

            <h1 className="font-display font-black text-h1-mega uppercase mb-8 [&_.text-accent]:text-lime">
              {data.h1}
            </h1>

            <p className="text-[1.1rem] text-cream font-bold leading-[1.55] mb-5 max-w-[560px]">
              {data.subhead}
            </p>
            <p className="text-[1rem] text-muted-dark leading-[1.75] mb-9 max-w-[560px]">
              {data.intro}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 max-w-[560px] mb-10">
              {data.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-[0.92rem] text-muted-dark leading-snug"
                >
                  <span className="text-lime font-bold flex-shrink-0 mt-0.5">✓</span>
                  {b}
                </li>
              ))}
            </ul>

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
            <div className="bg-ink-2 rounded-2xl p-8 border border-[rgba(244,237,224,0.14)]">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[rgba(244,237,224,0.14)]">
                <img
                  src="/founder.jpg"
                  alt="Ben Horne, founder of The Automation Agency"
                  width={72}
                  height={72}
                  className="rounded-full object-cover w-[72px] h-[72px] flex-shrink-0 bg-ink"
                />
                <div>
                  <p className="font-display font-bold text-[1.05rem] text-cream leading-tight">
                    Ben Horne
                  </p>
                  <p className="text-[0.78rem] text-muted-dark mt-1">
                    Founder · 10+ yrs production automation
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3 text-[0.95rem] text-lime">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="font-display font-bold text-[1.02rem] text-cream leading-[1.5] mb-3">
                &ldquo;Hard working, fast responding, and very dedicated agency. Highly
                recommend.&rdquo;
              </p>
              <p className="text-[0.78rem] text-muted-dark">
                Dor Iluz · Marmadbir · Verified Google review
              </p>
              <div className="mt-6 pt-6 border-t border-[rgba(244,237,224,0.14)] grid grid-cols-3 gap-3">
                {data.proofs.map(({ client, metric, metricLabel }) => (
                  <div key={client}>
                    <p className="font-display font-black text-lime text-[1.5rem] leading-none tracking-[-0.03em]">
                      {metric}
                    </p>
                    <p className="text-[0.7rem] text-muted-dark mt-1.5 leading-tight">
                      {metricLabel}
                    </p>
                    <p className="text-[0.65rem] text-muted-dark/70 mt-0.5 font-bold tracking-[0.04em] uppercase">
                      {client}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>

      {/* PROCESS BAR */}
      <div className="bg-cream text-ink py-14 px-8 md:px-14">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {PROCESS_STEPS.map(([num, title, sub]) => (
            <div key={title} className="flex gap-4 items-start">
              <span className="font-display font-black text-[1.6rem] text-ink leading-none">
                {num}
              </span>
              <div>
                <p className="font-display font-bold text-[1rem] text-ink leading-tight mb-1">
                  {title}
                </p>
                <p className="text-[0.78rem] text-muted-cream leading-snug">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING — Calendly + contact form, no phone */}
      <section id="book" className="bg-cream text-ink border-t border-[rgba(19,18,16,0.12)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <RevealWrapper>
            <div className="max-w-[680px] mb-10">
              <div className="kicker-cream mb-5">Book now</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6">
                Free 30-minute discovery call.{' '}
                <span className="text-muted-cream">No commitment, no pitch.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.75]">
                Pick a slot below. We&apos;ll talk through your business, identify the
                highest-ROI automation opportunities, and tell you honestly whether a Process
                Audit is the right next step. Fixed prices, no scope creep, no commitment to
                proceed.
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
                <p className="text-[0.92rem] text-muted-cream leading-[1.75] mb-6">
                  Walk us through what your team is doing manually. We&apos;ll reply within 24
                  hours with an honest read on whether it&apos;s a fit and what it would cost.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="bg-ink text-cream py-10 px-8 md:px-14">
        <div className="max-w-[1180px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.78rem] text-muted-dark">
            © 2026 The Automation Agency · Chesterfield, Derbyshire, UK
          </p>
          <div className="flex gap-6 text-[0.8rem]">
            <Link
              href="/"
              className="font-display font-bold text-cream hover:text-lime no-underline transition-colors"
            >
              Main site
            </Link>
            <Link
              href="/privacy"
              className="font-display font-bold text-muted-dark hover:text-cream no-underline transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-display font-bold text-muted-dark hover:text-cream no-underline transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

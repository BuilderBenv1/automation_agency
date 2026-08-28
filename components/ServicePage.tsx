import Link from 'next/link'
import RevealWrapper from '@/components/RevealWrapper'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import ContactForm from '@/components/ContactForm'
import type { ServiceData } from '@/data/servicePages'

export default function ServicePage({ data }: { data: ServiceData }) {
  const canonical = `https://www.automation-agency.co.uk/${data.slug}`
  const serviceName = data.metaTitle.split('|')[0].trim()

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: data.metaDescription,
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

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.automation-agency.co.uk',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: serviceName,
        item: canonical,
      },
    ],
  }

  // If there's no case study to show, the FAQ section sits directly under the
  // cream "problem + workflows" section, so it needs its own hairline seam.
  const faqSeam = data.proof ? '' : 'border-t border-[rgba(19,18,16,0.12)]'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* MINIMAL HEADER — call or book */}
      <header className="fixed top-0 inset-x-0 z-50 bg-ink/95 backdrop-blur border-b border-[rgba(244,237,224,0.14)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-4 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-[1.05rem] text-cream no-underline">
            The Automation Agency
          </Link>
          <div className="flex items-center gap-5">
            <a
              href="tel:+441246923041"
              className="hidden sm:block text-[0.9rem] font-display font-bold text-cream hover:text-lime no-underline transition-colors"
            >
              01246 923041
            </a>
            <a href="#book" className="btn-lime">
              Book a call
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-16">
          <div className="kicker mb-6">{data.kicker}</div>

          <h1 className="font-display font-black text-h1-mega uppercase mb-8">
            {data.h1Lead}
            <br />
            <span className="text-lime">{data.h1Accent}</span>{' '}
            <span className="outline-text">{data.h1Outline}</span>
          </h1>

          <p className="text-muted-dark leading-[1.7] max-w-[42em] mb-10 text-[1.05rem]">
            {data.intro}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#book" className="btn-lime">
              Book a free automation audit
            </a>
            <a href="#services-faq" className="btn-ghost">
              Read the FAQs →
            </a>
          </div>
        </div>
      </div>

      {/* THE PROBLEM + EXAMPLE WORKFLOWS */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealWrapper>
              <div className="kicker-cream mb-5">The problem</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[16ch]">
                Why this keeps happening.
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.8]">{data.problem}</p>
            </RevealWrapper>

            <RevealWrapper>
              <div className="kicker-cream mb-5">What we build</div>
              <h3 className="font-display font-bold text-[1.3rem] text-ink mb-6">
                Example workflows
              </h3>
              <ol className="list-none flex flex-col gap-5 mb-8">
                {data.workflows.map((workflow, i) => (
                  <li key={workflow} className="flex gap-4 items-start">
                    <span className="font-display font-black text-ink text-lg leading-none flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-ink leading-[1.6] text-[0.92rem]">{workflow}</p>
                  </li>
                ))}
              </ol>
              <span className="inline-flex items-center bg-lime text-ink font-display font-bold text-[0.85rem] px-4 py-2 rounded-full">
                From {data.from}
              </span>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* PROOF — omitted entirely when there's no matched case study */}
      {data.proof && (
        <section className="bg-ink text-cream">
          <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
            <div className="kicker mb-8">Proof it works</div>
            <RevealWrapper>
              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12 items-center bg-ink-2 rounded-2xl p-8 md:p-14">
                <div>
                  <a
                    href={data.proof.url}
                    target="_blank"
                    rel="noopener"
                    className="font-display font-bold text-[1.3rem] text-cream hover:text-lime no-underline transition-colors"
                  >
                    {data.proof.client} <span aria-hidden="true">→</span>
                  </a>
                  <p className="text-[1rem] text-muted-dark leading-[1.7] mt-4 max-w-[46em]">
                    {data.proof.line}
                  </p>
                </div>
                <div className="lg:border-l lg:border-[rgba(244,237,224,0.14)] lg:pl-12">
                  <p className="font-display font-black text-lime text-[3rem] leading-none tracking-[-0.03em]">
                    {data.proof.metric}
                  </p>
                  <p className="text-[0.85rem] text-muted-dark mt-2">{data.proof.metricLabel}</p>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </section>
      )}

      {/* FAQ + RELATED SERVICES */}
      <section id="services-faq" className={`bg-cream text-ink ${faqSeam}`}>
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">Common questions</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-12 max-w-[20ch]">
            Answers before you ask.
          </h2>

          <div className="max-w-[820px] border-t border-[rgba(19,18,16,0.12)] mb-16">
            {data.faqs.map(({ q, a }) => (
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

          <div className="kicker-cream mb-5">Related services</div>
          <div className="flex flex-wrap gap-4">
            {data.related.map(({ slug, label }) => (
              <Link
                key={slug}
                href={slug}
                className="inline-flex items-center gap-2 bg-cream-2 hover:bg-lime/40 text-ink font-display font-bold text-[0.85rem] px-5 py-3 rounded-full no-underline transition-colors"
              >
                {label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING — phone, email and Calendly */}
      <section id="book" className="bg-cream text-ink border-t border-[rgba(19,18,16,0.12)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <RevealWrapper>
            <div className="max-w-[760px] mb-14">
              <div className="kicker-cream mb-5">Book now</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[18ch]">
                Free 30-minute call. <span className="text-muted-cream">No pitch, no pressure.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.75] mb-7">
                Pick a slot below and we&apos;ll talk through your business — what&apos;s worth
                automating, what isn&apos;t, and what it would cost. Prefer email? Use the form.
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
                  <p className="text-[0.78rem] text-muted-cream mt-1">Mon–Fri, 9am–5.30pm</p>
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

      {/* MINIMAL FOOTER */}
      <footer className="bg-ink text-cream py-10 px-8 md:px-14">
        <div className="max-w-[1180px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.8rem] text-muted-dark">
            © 2026 The Automation Agency · Chesterfield, Derbyshire, UK
          </p>
          <div className="flex items-center gap-6">
            <a
              href="tel:+441246923041"
              className="text-[0.85rem] font-display font-bold text-cream hover:text-lime no-underline transition-colors"
            >
              01246 923041
            </a>
            <Link
              href="/"
              className="text-[0.85rem] font-display font-bold text-cream hover:text-lime no-underline transition-colors"
            >
              ← Back to main site
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

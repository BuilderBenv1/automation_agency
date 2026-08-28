import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'
import CalendlyEmbed from '@/components/CalendlyEmbed'

const CANONICAL = 'https://www.automation-agency.co.uk/automation-cost-guide-uk'

export const metadata: Metadata = {
  title: { absolute: 'What Automation Actually Costs a UK Business in 2026 — The Automation Agency' },
  description:
    'Real prices, not "contact us". A written process audit is £1,500. Most single-workflow builds land between £3,000 and £8,000. Multi-system builds start at £8,000. Here is what drives the number up, and how to work out your payback.',
  alternates: { canonical: CANONICAL },
}

const bands = [
  {
    price: '£350 – £750',
    name: 'A single automation',
    body: 'One workflow joining two or three systems: an enquiry that creates a record and notifies someone, a nightly report that builds and sends itself. £350 for a straightforward connection, £750 once AI is doing the reading and deciding.',
    when: 'You know exactly what you want and it is one job.',
  },
  {
    price: '£1,500',
    name: 'A process audit',
    body: 'A one-to-two week written diagnostic: your workflows mapped, opportunities ranked by return, ROI estimated per item, and a fixed-price quote for each. Credited in full against a build if you proceed within 60 days.',
    when: 'You know something is wrong but not which thing to fix first.',
  },
  {
    price: '£1,500 – £3,000',
    name: 'An internal tool or dashboard',
    body: 'A live view replacing a spreadsheet or a daily manual check. Price moves with how many sources feed it and whether it needs alerting and history.',
    when: 'One person’s daily routine is the only record you have.',
  },
  {
    price: '£3,000 – £8,000',
    name: 'A full single-workflow build',
    body: 'End-to-end automation of one real business process, across several systems, tested and deployed with your team trained on it. Two to six weeks. This is where most engagements land.',
    when: 'A whole process — quote to cash, enquiry to booking — is manual.',
  },
  {
    price: '£8,000+',
    name: 'A multi-system or multi-agent build',
    body: 'Several processes automated as one system, usually with AI agents making decisions and a human approving anything that touches money or a customer commitment.',
    when: 'The admin problem spans departments, not one desk.',
  },
  {
    price: 'from £1,500/mo',
    name: 'An ongoing retainer',
    body: 'Monitoring, fixes, new workflows and a monthly strategy call. Rolling monthly, cancel anytime. Optional — every build is handed over working, documented and yours.',
    when: 'Your systems keep changing and someone needs to notice when one breaks.',
  },
]

const drivers = [
  ['How many systems have to talk', 'Two is cheap. Six is not, and the cost is in the joins, not the count.'],
  ['Whether the data is clean', 'Automating a tidy process is quick. Automating a messy one means fixing the mess first, and that is often the bigger job.'],
  ['Whether an API exists', 'Most modern tools have one. Older or in-house systems sometimes do not, and working around that costs more.'],
  ['How badly a mistake would hurt', 'Anything touching money, contracts or a customer promise needs approval steps, error handling and testing that a low-stakes workflow does not.'],
  ['Whether AI is genuinely needed', 'Reading messy, unstructured information is worth paying for. Using AI where a simple rule would do adds cost and unpredictability for nothing.'],
  ['How many people have to be trained', 'A tool one person uses is simpler to hand over than one used by three departments.'],
]

const faqs = [
  {
    q: 'How much does business process automation cost in the UK?',
    a: 'Most UK SME automation projects fall between £3,000 and £8,000 for a full single-workflow build, delivered in two to six weeks. A single automation joining two or three systems starts at £350. Multi-system and multi-agent builds start at £8,000. A written process audit, which tells you what to build before you commit to building it, is £1,500 and is credited in full against a build if you proceed within 60 days.',
  },
  {
    q: 'Why do automation agencies not publish their prices?',
    a: 'Usually because they bill by the hour, which means they genuinely do not know the number until the work is finished. We quote a fixed price before starting, so the number is agreed before anyone commits. If a project is too vague to quote, that is a sign it needs an audit first, not an open-ended hourly engagement.',
  },
  {
    q: 'How do I work out whether automation is worth it?',
    a: 'Multiply the hours a week the task takes by the loaded hourly cost of the person doing it, then by 46 working weeks. A task taking six hours a week from someone on £32,000 costs roughly £5,600 a year to keep doing by hand. If automating it costs £5,000 once, it pays back inside a year and keeps paying every year after. If the sum does not clear the cost, do not automate it — we will tell you when that is the case.',
  },
  {
    q: 'What is the payback period on a typical automation build?',
    a: 'Most of the builds we quote pay back within six to eighteen months on time saved alone. One client had a full working day of manual checking replaced, worth roughly £27,000 a year against a build that cost a fraction of that. Payback is faster when the work is daily and slower when it is monthly, which is why the audit ranks opportunities by return rather than by how interesting they are.',
  },
  {
    q: 'Is fixed price better than an hourly rate?',
    a: 'For you, almost always. A fixed price moves the risk of a job taking longer than expected from you to us, and it makes the number something you can take to a board or a budget holder. Hourly billing rewards the supplier for being slow. The trade-off is that fixed pricing requires proper scoping upfront, which is what the discovery call and the audit are for.',
  },
  {
    q: 'Are there ongoing costs after the build?',
    a: 'Two kinds. Software subscriptions you may already pay for — a CRM, an automation platform, AI usage — which typically run from a few pounds to a few tens of pounds a month for an SME workload, and which we size before you commit. And optionally our retainer from £1,500/month if you want us monitoring and extending things. The retainer is not required: every build is handed over documented and working.',
  },
  {
    q: 'Do you charge VAT?',
    a: 'No. The Automation Agency is not currently VAT registered, so the quoted price is the total you pay.',
  },
]

export default function AutomationCostGuidePage() {
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
      { '@type': 'ListItem', position: 2, name: 'Automation cost guide', item: CANONICAL },
    ],
  }

  const provider = {
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
  }

  const offerCatalogLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business process automation',
    serviceType: 'Business process automation',
    description:
      'Fixed-price business process automation for UK SMEs: written process audits, single-workflow builds, multi-system builds and ongoing retainers.',
    url: CANONICAL,
    provider,
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'AdministrativeArea', name: 'East Midlands' },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Single automation',
        description: 'One workflow connecting two or three systems.',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '350',
          maxPrice: '750',
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: true,
        },
      },
      {
        '@type': 'Offer',
        name: 'Process Audit',
        description:
          'Written one-to-two week diagnostic with ROI estimates and fixed-price build quotes. Credited against a build within 60 days.',
        url: 'https://www.automation-agency.co.uk/audit',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '1500',
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: true,
        },
      },
      {
        '@type': 'Offer',
        name: 'Full single-workflow build',
        description: 'End-to-end automation of one business process, delivered in 2–6 weeks.',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '3000',
          maxPrice: '8000',
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: true,
        },
      },
      {
        '@type': 'Offer',
        name: 'Multi-system or multi-agent build',
        description: 'Several processes automated as one system.',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '8000',
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: true,
        },
      },
      {
        '@type': 'Offer',
        name: 'Monthly retainer',
        description: 'Monitoring, fixes, new workflows and a monthly strategy call. Rolling monthly.',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          minPrice: '1500',
          priceCurrency: 'GBP',
          unitCode: 'MON',
          billingIncrement: 1,
          valueAddedTaxIncluded: true,
        },
      },
    ],
  }

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-16">
          <div className="kicker mb-6">Pricing guide · UK · 2026</div>
          <h1 className="font-display font-black text-h1-mega uppercase mb-8 max-w-[20ch]">
            What automation actually costs a{' '}
            <span className="text-lime">UK business</span> in 2026.
          </h1>
          <p className="text-muted-dark leading-[1.7] max-w-[46em] mb-5 text-[1.05rem]">
            <b className="text-cream">
              Most UK SME automation projects land between £3,000 and £8,000 for a full build, delivered in
              two to six weeks.
            </b>{' '}
            A single automation joining two or three systems starts at £350. A written audit that tells you
            what to build first is £1,500, credited in full if you go on to build.
          </p>
          <p className="text-muted-dark leading-[1.7] max-w-[46em] mb-10 text-[1.05rem]">
            Below: the real bands, what pushes a quote up, and the arithmetic for working out whether a
            given job is worth automating at all — including when the answer is no.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#book" className="btn-lime">Book a free 30-minute call</a>
            <Link href="/audit" className="btn-ghost">See what the audit covers →</Link>
          </div>
        </div>
      </div>

      {/* BANDS */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">The bands</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[20ch]">
            Six prices. <span className="text-muted-cream">No &ldquo;contact us&rdquo;.</span>
          </h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.75] max-w-[560px] mb-14">
            Every engagement is quoted as one fixed number before work starts. These are the bands those
            numbers fall into.
          </p>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {bands.map(({ price, name, body, when }) => (
                <div key={name} className="bg-cream-2 rounded-2xl p-8 flex flex-col">
                  <p className="font-display font-black text-[1.7rem] text-ink tracking-[-0.02em] leading-none mb-3">
                    {price}
                  </p>
                  <h3 className="font-display font-bold text-[1.05rem] text-ink mb-3">{name}</h3>
                  <p className="text-[0.86rem] text-muted-cream leading-[1.7] mb-5 flex-1">{body}</p>
                  <p className="text-[0.8rem] text-ink font-semibold leading-[1.6] pt-4 border-t border-[rgba(19,18,16,0.1)]">
                    {when}
                  </p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* PAYBACK */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealWrapper>
              <div className="kicker mb-5">The arithmetic</div>
              <h2 className="font-display font-black text-h2-band uppercase text-cream mb-6 max-w-[18ch]">
                Work out the payback <span className="text-lime">before you call anyone.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-dark leading-[1.8] mb-5">
                You do not need us to do this sum. Take the hours a week the task swallows, multiply by
                what that person costs you per hour including employer costs, then by 46 working weeks.
                That is the annual cost of continuing to do it by hand.
              </p>
              <p className="text-[0.95rem] text-muted-dark leading-[1.8] mb-5">
                Compare it to a one-off build price. If the job does not pay back inside about eighteen
                months, it usually is not worth automating yet — and we will say so on the call rather
                than quote you for it.
              </p>
              <p className="text-[0.95rem] text-muted-dark leading-[1.8]">
                The figures below are real outcomes from systems we built. Savings are stated as actual
                costs eliminated or salary-equivalents of the manual work replaced.
              </p>
            </RevealWrapper>

            <RevealWrapper>
              <div className="bg-ink-2 rounded-2xl p-8 md:p-10 border border-[rgba(244,237,224,0.14)]">
                <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-6">
                  Worked example
                </p>
                <ul className="list-none mb-8">
                  {[
                    ['The task', 'Checking and re-keying orders, 6 hrs/week'],
                    ['Who does it', 'Office manager on £32,000'],
                    ['Loaded hourly cost', '≈ £20/hr'],
                    ['Annual cost of doing nothing', '6 × 20 × 46 = £5,520/yr'],
                    ['Typical build to remove it', '£3,000 – £5,000 once'],
                    ['Payback', 'Inside the first year, then it compounds'],
                  ].map(([k, v]) => (
                    <li
                      key={k}
                      className="flex justify-between gap-4 py-2.5 text-[0.85rem] border-b border-[rgba(244,237,224,0.1)] last:border-0"
                    >
                      <span className="text-muted-dark">{k}</span>
                      <span className="font-semibold text-cream text-right">{v}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-4">
                  Real client outcomes
                </p>
                <ul className="list-none">
                  {[
                    ['PlusRooms', '≈ £27,000/yr — a full working day, every day'],
                    ['Punthub', '£13,000+/yr in operating costs eliminated'],
                    ['Marmadbir', '≈ £10,000/yr in coordination time'],
                  ].map(([k, v]) => (
                    <li
                      key={k}
                      className="flex justify-between gap-4 py-2.5 text-[0.85rem] border-b border-[rgba(244,237,224,0.1)] last:border-0"
                    >
                      <span className="text-muted-dark">{k}</span>
                      <span className="font-semibold text-lime text-right">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* DRIVERS */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">What moves the number</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-14 max-w-[22ch]">
            Six things that decide whether it is £3,000 or £12,000.
          </h2>
          <RevealWrapper>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-9 list-none">
              {drivers.map(([title, body], i) => (
                <li key={title} className="flex gap-5 items-start">
                  <span className="font-display font-black text-ink text-xl leading-none flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-[1.02rem] text-ink mb-1.5">{title}</h3>
                    <p className="text-[0.88rem] text-muted-cream leading-[1.7]">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </RevealWrapper>
        </div>
      </section>

      {/* FIXED VS HOURLY */}
      <section className="bg-ink text-cream border-b border-[rgba(244,237,224,0.14)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker mb-5">Why fixed price</div>
          <h2 className="font-display font-black text-h2-band uppercase text-cream mb-8 max-w-[22ch]">
            Hourly billing rewards the supplier for being slow.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[64em]">
            <p className="text-[0.95rem] text-muted-dark leading-[1.8]">
              A fixed price moves the risk of a job overrunning from you to us. It also gives you a number
              you can take to a board or a budget holder without caveats, which an hourly estimate never
              is. If we scope it wrong, that is our problem to absorb, not a change request for you to sign.
            </p>
            <p className="text-[0.95rem] text-muted-dark leading-[1.8]">
              The trade-off is that fixed pricing needs proper scoping first. That is the entire purpose of
              the free discovery call and, where the picture is genuinely unclear, the{' '}
              <Link href="/audit" className="text-cream font-semibold underline decoration-lime decoration-2 underline-offset-4">
                £1,500 Process Audit
              </Link>
              . Anyone quoting a complex build sight-unseen is guessing, and you will meet that guess again
              later as a variation.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">Common questions</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-12 max-w-[20ch]">
            Pricing, answered plainly.
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
              ['/too-much-admin', 'What your admin is costing you'],
              ['/business-automation-east-midlands', 'Automation in the East Midlands'],
              ['/automation-for-recruitment-agencies', 'Automation for recruitment agencies'],
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
              <div className="kicker mb-5">Get your number</div>
              <h2 className="font-display font-black text-h2-band uppercase text-cream mb-6 max-w-[20ch]">
                Tell us the job. <span className="text-lime">We&apos;ll tell you the price.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-dark leading-[1.75] mb-6">
                Thirty minutes, free, no pitch. Describe what your team keeps doing by hand and you&apos;ll
                get an honest range on the call — including when the honest answer is that it isn&apos;t
                worth automating.
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
        </div>
      </section>

      <Footer />
    </>
  )
}

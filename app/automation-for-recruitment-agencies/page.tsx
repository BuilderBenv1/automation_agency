import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'
import CalendlyEmbed from '@/components/CalendlyEmbed'

const CANONICAL = 'https://www.automation-agency.co.uk/automation-for-recruitment-agencies'

export const metadata: Metadata = {
  title: { absolute: 'Automation for Recruitment Agencies — Stop Losing Candidates to Admin' },
  description:
    'Consultants in a 10–50 person agency lose hours a week to CV sorting, interview scheduling, timesheet chasing and compliance documents. We automate the admin so they can spend the day placing people. Fixed prices from £350.',
  alternates: { canonical: CANONICAL },
}

const jobs = [
  {
    num: '01',
    title: 'CVs read and shortlisted before anyone opens them',
    body: 'A vacancy attracts eighty applications and forty are irrelevant. Someone still opens all eighty. We parse incoming CVs, extract the things you actually screen on — right to work, sector experience, tickets and certifications, notice period, location — and put a ranked shortlist in front of the consultant with the reasoning attached.',
    note: 'A human still decides. The bot never rejects anyone on its own.',
  },
  {
    num: '02',
    title: 'A pipeline that reflects reality',
    body: 'Candidate records go stale the moment a consultant is busy, which is exactly when the pipeline matters most. Emails, calls and replies get logged against the record automatically, stages move themselves when something happens, and anyone sitting untouched for a fortnight surfaces before they go cold.',
    note: 'Works with the CRM or ATS you already run.',
  },
  {
    num: '03',
    title: 'Interviews booked without the ping-pong',
    body: 'Three-way scheduling between a client, a candidate and a consultant is where days disappear. Candidates self-book into slots the client has actually confirmed, everyone gets reminders, and reschedules update all three calendars without a single "does Thursday still work?" email.',
    note: 'No-shows drop when the reminder is automatic rather than remembered.',
  },
  {
    num: '04',
    title: 'Timesheets that chase themselves',
    body: 'For temp and contract desks this is the weekly tax: chasing contractors on Friday, chasing managers for approval on Monday, then re-keying it all into payroll and invoicing. The reminder, the escalation and the hand-off to payroll all run without anyone driving them.',
    note: 'Usually the single biggest week-on-week saving on a contract desk.',
  },
  {
    num: '05',
    title: 'Compliance documents collected before they expire',
    body: 'Right to work, DBS, insurance, qualifications, ticket renewals. The risk is never that you decided to skip one, it is that nobody noticed it lapsed. Documents get requested, chased, filed against the record and flagged ahead of expiry automatically.',
    note: 'An audit trail that exists whether or not somebody kept a spreadsheet.',
  },
  {
    num: '06',
    title: 'Client reporting that builds itself',
    body: 'Weekly submission and placement reports assembled by hand, usually by a manager on a Friday afternoon. Pulled from your own data, formatted the way each client likes it, and sent on schedule.',
    note: 'The report goes out even in the week everyone forgets.',
  },
]

const faqs = [
  {
    q: 'Will this work with our existing CRM or ATS?',
    a: 'Almost certainly. We build around Bullhorn, Vincere, JobAdder, Recruit CRM, HubSpot and in-house systems — anything with an API, which is nearly everything. Replacing the system your consultants already know is usually more disruptive than the automation is worth, so we do not start there. If what you have genuinely cannot trigger or receive anything, we will tell you that before you spend a penny.',
  },
  {
    q: 'Can AI screen CVs without introducing bias or breaking GDPR?',
    a: 'We build screening to extract and rank against the criteria you define — sector experience, certifications, right to work, notice period — rather than letting a model form its own opinion of a person. Every shortlist shows the reasoning, a consultant makes the actual decision, and nobody is auto-rejected. Candidate data stays in your systems, and we set retention and deletion rules as part of the build so records do not quietly accumulate past what you can justify.',
  },
  {
    q: 'How much does automation cost for a recruitment agency?',
    a: 'A single automation — timesheet chasing, or CV parsing into your ATS — starts at £350 fixed price. A full desk-wide build joining your ATS, calendars, compliance documents and payroll typically runs £3,000 to £8,000 and delivers in two to six weeks. Everything is quoted as one fixed number before work starts, and we are not VAT registered, so the quoted price is what you pay.',
  },
  {
    q: 'How much consultant time does this actually give back?',
    a: 'It depends on the desk. Contract and temp desks usually see the most, because timesheet and compliance chasing is weekly and relentless. Perm desks tend to gain most from scheduling and pipeline hygiene. As a rule, if a consultant is spending more than half a day a week on admin that is not talking to candidates or clients, there is a case worth costing — and the arithmetic is on our cost guide.',
  },
  {
    q: 'We are a ten-person agency. Are we too small for this?',
    a: 'No. Small agencies often get the fastest payback, because there is no operations team absorbing the admin — it lands on the consultants who should be billing. The starting point is usually one automation on the most repetitive job, not a platform rebuild.',
  },
]

export default function RecruitmentPage() {
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
      { '@type': 'ListItem', position: 2, name: 'Automation for recruitment agencies', item: CANONICAL },
    ],
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Automation for recruitment agencies',
    serviceType: 'Business process automation',
    description:
      'Automating CV screening, candidate pipeline hygiene, interview scheduling, timesheet chasing, compliance documents and client reporting for UK recruitment agencies.',
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
    },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    audience: { '@type': 'BusinessAudience', name: 'UK recruitment agencies, 10–50 staff' },
  }

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-16">
          <div className="kicker mb-6">Recruitment · UK</div>
          <h1 className="font-display font-black text-h1-mega uppercase mb-8 max-w-[22ch]">
            Automation for recruitment agencies:{' '}
            <span className="text-lime">stop losing candidates to admin.</span>
          </h1>
          <p className="text-muted-dark leading-[1.7] max-w-[46em] mb-5 text-[1.05rem]">
            <b className="text-cream">
              You do not lose placements because your consultants are bad at recruiting. You lose them
              because the good candidate sat unread for two days.
            </b>
          </p>
          <p className="text-muted-dark leading-[1.7] max-w-[46em] mb-10 text-[1.05rem]">
            In a ten to fifty person agency there is rarely an operations team, so the CV sorting,
            scheduling, timesheet chasing and compliance paperwork lands on the people who should be
            billing. We automate that work so the desk gets its week back.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#book" className="btn-lime">Book a free 30-minute call</a>
            <a href="tel:+441246923041" className="btn-ghost">01246 923041</a>
          </div>
        </div>
      </div>

      {/* THE SIX JOBS */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">What we automate on a desk</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[22ch]">
            Six jobs eating your consultants&apos; week.
          </h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.75] max-w-[560px] mb-14">
            You will not need all six. Most agencies start with the one that hurts most on a Friday
            afternoon and add from there.
          </p>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map(({ num, title, body, note }) => (
                <div key={num} className="bg-cream-2 rounded-2xl p-8 flex flex-col">
                  <p className="font-display font-black text-[2rem] text-ink tracking-[-0.03em] leading-none mb-4">
                    {num}
                  </p>
                  <h3 className="font-display font-bold text-[1.05rem] text-ink mb-3 leading-snug">
                    {title}
                  </h3>
                  <p className="text-[0.86rem] text-muted-cream leading-[1.7] mb-5 flex-1">{body}</p>
                  <p className="text-[0.8rem] text-ink italic leading-[1.6] pt-4 border-t border-[rgba(19,18,16,0.1)]">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* THE REALITY */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealWrapper>
              <div className="kicker mb-5">The 10–50 person reality</div>
              <h2 className="font-display font-black text-h2-band uppercase text-cream mb-6 max-w-[20ch]">
                No ops team means the admin lands on your billers.
              </h2>
              <p className="text-[0.95rem] text-muted-dark leading-[1.8] mb-5">
                Large agencies hire resourcers and compliance administrators to absorb this work. At your
                size, that overhead would eat the margin — so it gets absorbed by consultants instead, in
                the gaps between calls, at the cost of the calls.
              </p>
              <p className="text-[0.95rem] text-muted-dark leading-[1.8] mb-5">
                The result is familiar: the pipeline is accurate on Monday and fiction by Thursday, the
                best candidate for a role is in an inbox nobody has reached, and Friday is timesheets.
              </p>
              <p className="text-[0.95rem] text-muted-dark leading-[1.8]">
                Automating this is not about replacing consultants. It is about making sure the hour they
                spend is the hour that earns a fee.
              </p>
            </RevealWrapper>

            <RevealWrapper>
              <div className="bg-ink-2 rounded-2xl p-8 md:p-10 border border-[rgba(244,237,224,0.14)]">
                <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-6">
                  Worth costing if
                </p>
                <ul className="list-none mb-8">
                  {[
                    'Consultants spend more than half a day a week on admin',
                    'Timesheet chasing is somebody’s Friday',
                    'Compliance is tracked in a spreadsheet and a memory',
                    'Your ATS is only as current as the last quiet afternoon',
                    'Interview scheduling routinely takes more emails than the interview takes minutes',
                  ].map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2.5 py-2.5 text-[0.88rem] text-muted-dark border-b border-[rgba(244,237,224,0.1)] last:border-0"
                    >
                      <span className="text-lime flex-shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-[0.88rem] text-muted-dark leading-[1.75]">
                  Work out the number yourself with the arithmetic on the{' '}
                  <Link
                    href="/automation-cost-guide-uk"
                    className="text-cream font-semibold underline decoration-lime decoration-2 underline-offset-4"
                  >
                    cost guide
                  </Link>
                  , or let us do it on a call.
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">Common questions</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-12 max-w-[20ch]">
            What agencies ask us first.
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
              ['/crm-automation', 'CRM and pipeline automation'],
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
              <h2 className="font-display font-black text-h2-band uppercase text-cream mb-6 max-w-[22ch]">
                Tell us what Friday looks like{' '}
                <span className="text-lime">on your desk.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-dark leading-[1.75] mb-6">
                Thirty minutes, free, no pitch. We&apos;ll work out which of the six is costing you most
                and what removing it would cost — including when the honest answer is to leave it alone.
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

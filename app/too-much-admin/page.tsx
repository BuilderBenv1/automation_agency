import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'
import ContactForm from '@/components/ContactForm'

const CANONICAL = 'https://www.automation-agency.co.uk/too-much-admin'

export const metadata: Metadata = {
  title: { absolute: 'Your Team Is Spending Its Week on Admin — What That Costs You' },
  description:
    'Six hours a week of re-keying costs a 20-person business about £5,500 a year, per person doing it. Here is the arithmetic, the three places the hours usually go, and how to work out which one is worth fixing first.',
  alternates: { canonical: CANONICAL },
}

const sinks = [
  {
    num: '01',
    title: 'The same information, typed in twice',
    body: 'An enquiry arrives by email. Someone types it into the CRM. When it becomes a job it gets typed into the scheduling sheet, and when it is invoiced it gets typed into the accounts package. Nobody thinks of this as a task — it is just what you do between the real work.',
    cost: 'Usually the largest single sink, and the easiest to remove, because the data already exists in a system somewhere.',
    fix: 'The record is created once and everything downstream updates from it. Typically a few days of work.',
  },
  {
    num: '02',
    title: 'Chasing things that should chase themselves',
    body: 'Quotes that went quiet. Invoices past due. Timesheets not submitted. Documents not returned. Every one of these needs someone to notice it has not happened, remember to follow up, and keep a mental list of who owes what.',
    cost: 'The cost is not only the chasing time — it is the quotes that go cold and the invoices paid late because nobody noticed in the first place.',
    fix: 'The system notices and sends the nudge. A person only gets involved when the nudge has not worked.',
  },
  {
    num: '03',
    title: 'The report that eats a morning',
    body: 'Numbers pulled by hand from three or four places, pasted into a spreadsheet, formatted, sanity-checked and emailed round. Weekly or monthly, always urgent, always the same steps, and always done by someone senior enough that their time is expensive.',
    cost: 'Often the most expensive per hour, because the person who understands the numbers well enough to assemble them is rarely junior.',
    fix: 'The report builds itself on a schedule and lands in the inbox already correct.',
  },
]

const signals = [
  'Someone’s morning is “just doing the admin” before the real work starts',
  'The same customer detail lives in three systems and they disagree',
  'A process only works because one specific person remembers the steps',
  'Growth means hiring another administrator, not another fee-earner',
  'Nobody can answer a simple question without opening four tabs',
  'When that person is on holiday, something quietly stops happening',
]

export default function TooMuchAdminPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.automation-agency.co.uk' },
      { '@type': 'ListItem', position: 2, name: 'What your admin is costing you', item: CANONICAL },
    ],
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Admin reduction for UK SMEs',
    serviceType: 'Business process automation',
    description:
      'Identifying and removing the repetitive administrative work absorbing staff time in UK small and medium businesses, starting with a written process audit.',
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
  }

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-16">
          <div className="kicker mb-6">The cost of admin</div>
          <h1 className="font-display font-black text-h1-mega uppercase mb-8 max-w-[22ch]">
            Your team is spending its week on admin.{' '}
            <span className="text-lime">Here&apos;s what that actually costs you.</span>
          </h1>
          <p className="text-muted-dark leading-[1.7] max-w-[46em] mb-5 text-[1.05rem]">
            <b className="text-cream">
              Six hours a week of re-keying, chasing and checking costs about £5,500 a year for every
              person doing it.
            </b>{' '}
            Not in lost productivity, in salary — money you have already paid, spent on work a system
            could do instead.
          </p>
          <p className="text-muted-dark leading-[1.7] max-w-[46em] mb-10 text-[1.05rem]">
            Most business owners can feel this without being able to price it. Below is the arithmetic,
            the three places the hours almost always go, and how to tell which one is worth fixing first.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#talk" className="btn-lime">Find out what yours is costing</a>
            <Link href="/automation-cost-guide-uk" className="btn-ghost">See what fixing it costs →</Link>
          </div>
        </div>
      </div>

      {/* THE ARITHMETIC */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealWrapper>
              <div className="kicker-cream mb-5">The arithmetic</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[18ch]">
                It is a smaller sum than people expect.
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-5">
                Take one recurring task. Count the hours a week it genuinely takes — ask the person doing
                it, not the person who thinks they know. Multiply by what that hour costs you, including
                employer&apos;s National Insurance and pension, then by 46 working weeks.
              </p>
              <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-5">
                That is what you are paying, every year, to keep doing it by hand. Now do it for the three
                or four tasks you already suspect. The total is usually the part that surprises people.
              </p>
              <p className="text-[0.95rem] text-muted-cream leading-[1.8]">
                Then compare it to a one-off cost to remove it. If the job does not pay back inside about
                eighteen months, leave it alone — that is a genuine answer, and one we give often.
              </p>
            </RevealWrapper>

            <RevealWrapper>
              <div className="bg-cream-2 rounded-2xl p-8 md:p-10">
                <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted-cream mb-6">
                  One task, one person
                </p>
                <ul className="list-none mb-8">
                  {[
                    ['Hours a week', '6'],
                    ['Salary', '£32,000'],
                    ['Loaded cost per hour', '≈ £20'],
                    ['Working weeks', '46'],
                  ].map(([k, v]) => (
                    <li
                      key={k}
                      className="flex justify-between gap-4 py-2.5 text-[0.88rem] border-b border-[rgba(19,18,16,0.1)]"
                    >
                      <span className="text-muted-cream">{k}</span>
                      <span className="font-semibold text-ink">{v}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-display font-black text-[2.6rem] text-ink tracking-[-0.03em] leading-none mb-2">
                  £5,520<span className="text-[1.1rem] font-sans font-normal text-muted-cream">/year</span>
                </p>
                <p className="text-[0.85rem] text-muted-cream leading-relaxed mb-8">
                  For one task, done by one person. Four people doing something similar and you are past
                  £20,000 a year without anyone ever putting it on a budget line.
                </p>
                <div className="pt-6 border-t border-[rgba(19,18,16,0.12)]">
                  <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted-cream mb-3">
                    For comparison
                  </p>
                  <p className="text-[0.88rem] text-muted-cream leading-[1.7]">
                    One client had a full working day of manual checking removed — worth roughly{' '}
                    <b className="text-ink">£27,000 a year</b>, against a one-off build. Savings stated as
                    actual costs eliminated or salary-equivalents of the manual work replaced.
                  </p>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* THE THREE SINKS */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker mb-5">Where the hours go</div>
          <h2 className="font-display font-black text-h2-band uppercase text-cream mb-6 max-w-[22ch]">
            In a 10–50 person business, it is nearly always{' '}
            <span className="text-lime">these three.</span>
          </h2>
          <p className="text-[0.95rem] text-muted-dark leading-[1.75] max-w-[560px] mb-14">
            We have mapped enough of these now that the pattern is boring. The specifics change; the shape
            does not.
          </p>
          <RevealWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {sinks.map(({ num, title, body, cost, fix }) => (
                <div
                  key={num}
                  className="bg-ink-2 border border-[rgba(244,237,224,0.1)] rounded-2xl p-8 flex flex-col"
                >
                  <p className="font-display font-black text-[2rem] text-lime tracking-[-0.03em] leading-none mb-4">
                    {num}
                  </p>
                  <h3 className="font-display font-bold text-cream text-[1.08rem] mb-3 leading-snug">
                    {title}
                  </h3>
                  <p className="text-[0.875rem] text-muted-dark leading-[1.75] mb-5">{body}</p>
                  <p className="text-[0.83rem] text-muted-dark/90 leading-[1.7] mb-5 flex-1">{cost}</p>
                  <p className="text-[0.83rem] text-cream leading-[1.7] pt-4 border-t border-[rgba(244,237,224,0.14)]">
                    <span className="text-lime font-semibold">What it looks like fixed: </span>
                    {fix}
                  </p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* SIGNALS */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
            <RevealWrapper>
              <div className="kicker-cream mb-5">Does this sound like you?</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[16ch]">
                Six signs the admin has outgrown the business.
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.8]">
                None of these is a crisis on its own. Three or more together usually means the processes
                stopped fitting the business a while ago and nobody had time to notice.
              </p>
            </RevealWrapper>
            <RevealWrapper>
              <ul className="list-none border-t border-[rgba(19,18,16,0.12)]">
                {signals.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 py-4 text-[0.95rem] text-ink border-b border-[rgba(19,18,16,0.12)]"
                  >
                    <span className="text-lime font-bold flex-shrink-0">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* NEXT STEP */}
      <section className="bg-ink text-cream border-b border-[rgba(244,237,224,0.14)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealWrapper>
              <div className="kicker mb-5">What to do about it</div>
              <h2 className="font-display font-black text-h2-band uppercase text-cream mb-6 max-w-[20ch]">
                Find out which one is worth fixing <span className="text-lime">before you spend anything.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-dark leading-[1.8] mb-5">
                The mistake is automating the task that annoys you most rather than the one costing the
                most. They are rarely the same, and the difference is usually thousands a year.
              </p>
              <p className="text-[0.95rem] text-muted-dark leading-[1.8] mb-8">
                A{' '}
                <Link href="/audit" className="text-cream font-semibold underline decoration-lime decoration-2 underline-offset-4">
                  Process Audit
                </Link>{' '}
                maps where the hours actually go, ranks the opportunities by return, and gives you a
                fixed-price quote for each. £1,500, one to two weeks, credited in full against a build if
                you proceed. The written report is yours either way.
              </p>
              <Link href="/audit" className="btn-lime">See what the audit covers</Link>
            </RevealWrapper>

            <RevealWrapper>
              <div className="bg-ink-2 rounded-2xl p-8 md:p-10 border border-[rgba(244,237,224,0.14)]">
                <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-5">
                  Or start smaller
                </p>
                <p className="text-[0.95rem] text-muted-dark leading-[1.8] mb-6">
                  Not ready to pay for anything? Send us the job your team keeps doing by hand and
                  we&apos;ll reply with what could be automated, the easiest first build, a rough price
                  range and an honest view on whether it is worth doing at all.
                </p>
                <Link href="/quick-audit" className="btn-lime w-full justify-center mb-4">
                  Free automation opportunity audit
                </Link>
                <p className="text-[0.85rem] text-muted-dark text-center">
                  Or just call{' '}
                  <a href="tel:+441246923041" className="text-cream font-bold no-underline hover:text-lime">
                    01246 923041
                  </a>
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* READ NEXT */}
      <section className="bg-cream text-ink border-b border-[rgba(19,18,16,0.12)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-16">
          <div className="kicker-cream mb-5">Read next</div>
          <div className="flex flex-wrap gap-4">
            {[
              ['/automation-cost-guide-uk', 'What automation costs in 2026'],
              ['/audit', 'What the £1,500 audit covers'],
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

      {/* CONTACT */}
      <section id="talk" className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <RevealWrapper>
              <div className="kicker-cream mb-5">Tell us what it is</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[18ch]">
                What is your team doing by hand?
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.75] mb-6">
                Describe it in a sentence or two. We&apos;ll come back within 24 hours with an honest read
                on whether it is worth automating and roughly what it would cost.
              </p>
              <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-muted-cream mb-1.5">
                Prefer to talk? Call us
              </p>
              <a
                href="tel:+441246923041"
                className="block font-display font-bold text-[1.35rem] text-ink hover:text-muted-cream transition-colors no-underline"
              >
                01246 923041
              </a>
              <p className="text-[0.78rem] text-muted-cream mt-1">Mon–Fri, 9am–5.30pm</p>
            </RevealWrapper>
            <RevealWrapper>
              <ContactForm />
            </RevealWrapper>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

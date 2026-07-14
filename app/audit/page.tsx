import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'
import CalendlyEmbed from '@/components/CalendlyEmbed'

export const metadata: Metadata = {
  title: 'Process Audit',
  description:
    'A 1–2 week engagement that maps your workflows, identifies your highest-ROI automation opportunities, and delivers a written report with fixed-price quotes. £1,500, credited if you build.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/audit' },
}

const deliverables = [
  {
    num: '01',
    title: 'Process Map',
    body: 'A clear visual and written map of your current workflows — who does what, when, using which tools. Most clients find this valuable on its own.',
  },
  {
    num: '02',
    title: 'Prioritised Opportunities',
    body: "A ranked list of automation opportunities ordered by ROI and effort. We identify what's worth doing first and why — you're not spending £10,000 to save two hours a month.",
  },
  {
    num: '03',
    title: 'ROI Estimates',
    body: 'For each opportunity: estimated time saved per week, salary equivalent recovered per year, and payback period. Concrete numbers, not vague claims about efficiency.',
  },
  {
    num: '04',
    title: 'Technical Architecture',
    body: 'A plain-English recommendation of how each automation would be built — what tools, what integrations, what the system does step by step. Detailed enough for any developer to quote against.',
  },
  {
    num: '05',
    title: 'Fixed-Price Build Quotes',
    body: 'A fixed-price implementation quote for each prioritised item. A number you can take to a board or budget holder. If you build with us, the £1,500 is deducted.',
  },
]

const goodFit = [
  'You have 5–200 staff and identifiable manual processes',
  'Your team spends hours per week on repetitive data tasks',
  "You use multiple tools that don't integrate well",
  "You know something could be automated but don't know where to start",
  'You want a business case before committing to a build',
  "You've been quoted by agencies but the scope felt vague",
]

const notFit = [
  "You're a solo operator with no team processes yet",
  'You already know exactly what you want built',
  "You're looking for off-the-shelf software recommendations",
  'Your processes change every week (stabilise first)',
  'You have no budget for automation implementation',
]

const faqs = [
  {
    q: 'Do I have to use you to build after the audit?',
    a: 'No. The report is yours to take anywhere. If you choose to build with us, the £1,500 audit fee is credited against the project cost. If you go elsewhere or don\'t proceed, you keep the report with no obligation.',
  },
  {
    q: "What's the difference between the discovery call and the audit?",
    a: "The discovery call is a free 30-minute conversation to understand your business and check there's a clear automation opportunity. The Process Audit is a structured 1–2 week engagement that maps your workflows in detail, quantifies the ROI, and produces a written deliverable with specific build recommendations and fixed-price quotes.",
  },
  {
    q: 'Can you do it remotely?',
    a: "Yes — most audits are conducted remotely via video calls and screen shares. If you're based in Derbyshire, South Yorkshire, Nottinghamshire, or nearby, we're happy to come in person for the kickoff at no extra charge.",
  },
  {
    q: 'How much time does my team need to commit?',
    a: "The kickoff session is 2 hours. After that, we may need 30–60 minutes with specific team members. Total commitment is typically 3–5 hours across two weeks, worked around your schedule.",
  },
  {
    q: 'What if we already know exactly what we want built?',
    a: "Skip the audit — book a discovery call and we'll scope it directly. The audit is most valuable when you're not sure where to start or want a full view of all the opportunities.",
  },
  {
    q: 'Is the £1,500 plus or minus VAT?',
    a: 'The Automation Agency is not currently VAT registered, so £1,500 is the total fee with no VAT to add.',
  },
]

export default function AuditPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-16 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <div className="kicker mb-6">First Paid Engagement</div>
            <h1 className="font-display font-black text-h1-mega uppercase mb-8">
              Know exactly what
              <br />
              to automate <span className="text-lime">before spending a pound.</span>
            </h1>
            <p className="text-muted-dark leading-[1.7] max-w-[540px] mb-5 text-[1.05rem]">
              A discovery call shows you what&apos;s possible. The Process Audit tells you exactly what to
              build, in what order, and what return to expect — in a written report you keep regardless of
              next steps.
            </p>
            <p className="text-muted-dark leading-[1.7] max-w-[540px] mb-10 text-[1.05rem]">
              Over one to two weeks, we map your workflows end-to-end and identify the automation
              opportunities with the clearest ROI. No vague recommendations — specific systems, specific
              costs, specific expected outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#book" className="btn-lime">
                Book a Free Discovery Call First
              </a>
              <Link href="/#pricing" className="btn-ghost">
                See All Pricing →
              </Link>
            </div>
          </div>

          <RevealWrapper>
            <div className="bg-ink-2 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div
                className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(200,240,74,0.1) 0%, transparent 70%)' }}
              />
              <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-5">
                Process Audit
              </p>
              <p className="font-display font-black text-[3rem] md:text-[3.6rem] text-cream tracking-[-0.03em] leading-none mb-2">
                <span className="text-[1.2rem] font-sans font-normal">£</span>1,500
              </p>
              <p className="text-[0.85rem] text-muted-dark mb-8 pb-8 leading-relaxed border-b border-[rgba(244,237,224,0.14)]">
                Fixed fee. Credited in full against your implementation if you proceed within 60 days. If you
                don&apos;t, you keep the report — no strings.
              </p>
              <ul className="mb-9">
                {[
                  '1–2 week engagement',
                  'Remote or in-person',
                  'Full written deliverable report',
                  'Prioritised automation opportunities',
                  'ROI estimates per item',
                  'Fixed-price build quotes included',
                  '£1,500 credited if you proceed',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 py-2.5 text-[0.875rem] text-muted-dark border-b border-[rgba(244,237,224,0.1)]"
                  >
                    <span className="text-lime flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#book" className="btn-lime w-full justify-center">
                Start with a Free Discovery Call
              </a>
            </div>
          </RevealWrapper>
        </div>
      </div>

      {/* DELIVERABLES */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">What You Receive</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[20ch]">
            Five deliverables. One written report you{' '}
            <span className="text-ink underline decoration-lime decoration-2 underline-offset-4">own.</span>
          </h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.75] max-w-[560px] mb-14">
            Everything is documented. You leave with clarity — not a conversation and a vague next step.
          </p>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {deliverables.map(({ num, title, body }) => (
                <div key={num} className="bg-cream-2 rounded-2xl p-8">
                  <p className="font-display font-black text-[2rem] text-ink tracking-[-0.03em] leading-none mb-4">
                    {num}
                  </p>
                  <h3 className="font-display font-bold text-[1.05rem] text-ink mb-2.5">{title}</h3>
                  <p className="text-[0.86rem] text-muted-cream leading-[1.7]">{body}</p>
                </div>
              ))}
              <div className="bg-lime rounded-2xl p-8 text-ink">
                <p className="font-display font-black text-[2rem] tracking-[-0.03em] leading-none mb-4">+</p>
                <h3 className="font-display font-bold text-[1.05rem] mb-2.5">Yours to Keep</h3>
                <p className="text-[0.86rem] text-ink/70 leading-[1.7]">
                  The report is yours regardless of next steps. Take the recommendations to another
                  developer, use them internally, or file them for next year. No lock-in.
                </p>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-ink text-cream border-b border-[rgba(244,237,224,0.14)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker mb-5">How It Runs</div>
          <h2 className="font-display font-black text-h2-band uppercase text-cream mb-14 max-w-[20ch]">
            One to two weeks. <span className="text-muted-dark">Here&apos;s exactly how it works.</span>
          </h2>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 border border-[rgba(244,237,224,0.14)]">
              {[
                {
                  when: 'Week 1 — Days 1–3',
                  title: 'Kickoff & Discovery',
                  body: "We start with a structured 2-hour kickoff session (remote or in-person). We walk through your business end-to-end: every process, every tool, every handoff. We ask the questions your team stopped asking because 'it's just how it's done.'",
                },
                {
                  when: 'Week 1 — Days 4–5',
                  title: 'Observation & Mapping',
                  body: 'We shadow key processes in real time, review existing documentation, and map the full workflow. This is where we spot the workarounds, the manual fixes, the spreadsheets that "just work."',
                },
                {
                  when: 'Week 2',
                  title: 'Analysis & Report',
                  body: 'We analyse the workflows, identify automation opportunities, build the ROI models, write architecture recommendations, and produce the final report. Delivered as a structured PDF with a 30-minute walkthrough call.',
                },
              ].map(({ when, title, body }, i) => (
                <div
                  key={title}
                  className="p-8 md:p-10"
                  style={{ borderRight: i < 2 ? '1px solid rgba(244,237,224,0.14)' : 'none' }}
                >
                  <p className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-muted-dark mb-4">
                    {when}
                  </p>
                  <h3 className="font-display font-bold text-[1.1rem] text-cream mb-3">{title}</h3>
                  <p className="text-[0.85rem] text-muted-dark leading-[1.7]">{body}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker-cream mb-5">Is This Right For You?</div>
          <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[22ch]">
            The audit works well for{' '}
            <span className="text-ink underline decoration-lime decoration-2 underline-offset-4">
              some businesses, not all.
            </span>
          </h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.75] max-w-[520px] mb-14">
            We&apos;d rather tell you it&apos;s not the right fit than take your money and deliver something of
            limited value.
          </p>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-cream-2 rounded-2xl p-8">
                <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-ink mb-5">Good fit</p>
                <ul className="list-none">
                  {goodFit.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 py-2 text-[0.875rem] text-muted-cream border-b border-[rgba(19,18,16,0.1)] last:border-0"
                    >
                      <span className="text-ink flex-shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-cream-2 rounded-2xl p-8">
                <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-muted-cream mb-5">
                  Probably not the right fit
                </p>
                <ul className="list-none">
                  {notFit.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 py-2 text-[0.875rem] text-muted-cream border-b border-[rgba(19,18,16,0.1)] last:border-0"
                    >
                      <span className="text-muted-cream flex-shrink-0">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <div className="kicker mb-5">Common Questions</div>
          <h2 className="font-display font-black text-h2-band uppercase text-cream mb-12 max-w-[20ch]">
            Frequently asked.
          </h2>
          <RevealWrapper>
            <div className="max-w-[820px] border-t border-[rgba(244,237,224,0.14)]">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group py-6 border-b border-[rgba(244,237,224,0.14)]">
                  <summary className="flex items-center justify-between gap-6 cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden font-display font-bold text-[1.02rem] text-cream">
                    {q}
                    <span className="flex-shrink-0 text-lime text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-[0.9rem] text-muted-dark leading-[1.75] mt-4 max-w-[64ch]">{a}</p>
                </details>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="bg-cream text-ink border-t border-[rgba(19,18,16,0.12)]">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-28">
          <RevealWrapper>
            <div className="max-w-[680px] mb-14">
              <div className="kicker-cream mb-5">Book a Discovery Call</div>
              <h2 className="font-display font-black text-h2-band uppercase text-ink mb-6 max-w-[18ch]">
                Start with a free call. <span className="text-muted-cream">No commitment, no pitch.</span>
              </h2>
              <p className="text-[0.95rem] text-muted-cream leading-[1.75]">
                Pick a 30-minute slot below. We&apos;ll talk through your business, identify where
                there&apos;s an automation opportunity, and tell you honestly whether the Process Audit is
                the right next step.
              </p>
            </div>
          </RevealWrapper>
          <RevealWrapper>
            <CalendlyEmbed />
          </RevealWrapper>
          <p className="text-[0.85rem] text-muted-cream mt-8 text-center">
            Prefer email?{' '}
            <a href="mailto:hello@automation-agency.co.uk" className="text-ink font-semibold underline decoration-lime decoration-2">
              hello@automation-agency.co.uk
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}

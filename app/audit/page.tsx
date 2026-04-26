import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'

export const metadata: Metadata = {
  title: 'Process Audit',
  description:
    'A 1–2 week engagement that maps your workflows, identifies your highest-ROI automation opportunities, and delivers a written report with fixed-price quotes. £1,500, credited if you build.',
  alternates: { canonical: 'https://automation-agency.co.uk/audit' },
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
    body: 'For each opportunity: estimated time saved per week, salary equivalent recovered per year, and payback period. Concrete numbers, not "significant efficiency gains".',
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

const faqs = [
  {
    q: 'Do I have to use you to build after the audit?',
    a: 'No. The report is yours to take anywhere. If you choose to build with us, the £1,500 audit fee is credited against the project cost. If you go elsewhere or don\'t proceed, you keep the report with no obligation.',
  },
  {
    q: "What's the difference between the discovery call and the audit?",
    a: "The discovery call is a free 30-minute conversation to understand your business and assess whether there's a clear automation opportunity. The Process Audit is a structured 1–2 week engagement that maps your workflows in detail, quantifies the ROI, and produces a written deliverable with specific build recommendations and fixed-price quotes.",
  },
  {
    q: 'Can you do it remotely?',
    a: "Yes — most audits are conducted remotely via video calls and screen shares. If you're based in Derbyshire, South Yorkshire, Nottinghamshire, or nearby, we're happy to come in person for the kickoff at no extra charge.",
  },
  {
    q: "How much time does my team need to commit?",
    a: "The kickoff session is 2 hours. After that, we may need 30–60 minutes with specific team members. Total commitment is typically 3–5 hours across two weeks, worked around your schedule.",
  },
  {
    q: 'What if we already know exactly what we want built?',
    a: "Skip the audit — book a discovery call and we'll scope it directly. The audit is most valuable when you're not sure where to start or want a comprehensive view of all opportunities.",
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
      <div className="max-w-[1280px] mx-auto px-14 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center bg-bg">
        <div>
          <div className="eyebrow mb-4">First Paid Engagement</div>
          <h1 className="font-serif font-normal text-display-xl text-brand-text mb-6">
            Know exactly what to automate{' '}
            <em className="not-italic text-accent">before spending a pound on building it.</em>
          </h1>
          <p className="text-[1.05rem] text-brand-mid leading-[1.75] mb-4 max-w-[520px]">
            A discovery call shows you what&apos;s possible. The Process Audit tells you exactly what to build,
            in what order, and what return to expect — in a written report you keep regardless of next steps.
          </p>
          <p className="text-[1.05rem] text-brand-mid leading-[1.75] mb-9 max-w-[520px]">
            Over one to two weeks, we map your workflows end-to-end and identify the automation opportunities
            with the clearest ROI. No vague recommendations — specific systems, specific costs, specific
            expected outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/#contact" className="btn-primary px-6 py-3 text-sm font-semibold">
              Book a Free Discovery Call First
            </Link>
            <Link href="/#pricing" className="btn-outline px-6 py-3 text-sm font-semibold">
              See All Pricing
            </Link>
          </div>
        </div>

        <div className="bg-navy rounded-[6px] p-12 text-white relative overflow-hidden">
          <div
            className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
          />
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-white/35 mb-5">
            Process Audit
          </p>
          <p className="font-serif font-normal text-[4rem] text-white tracking-[-0.04em] leading-none mb-2">
            <span className="text-[1.4rem] font-sans font-normal">£</span>1,500
          </p>
          <p className="text-[0.85rem] text-white/45 mb-8 pb-8 leading-relaxed" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            Fixed fee. Credited in full against your implementation if you proceed within 60 days. If you
            don&apos;t, you keep the report — no strings.
          </p>
          <ul className="mb-9">
            {['1–2 week engagement', 'Remote or in-person', 'Full written deliverable report', 'Prioritised automation opportunities', 'ROI estimates per item', 'Fixed-price build quotes included', '£1,500 credited if you proceed'].map(
              (item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 py-2.5 text-[0.875rem] text-white/60"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span className="text-white/35 flex-shrink-0">✓</span>
                  {item}
                </li>
              )
            )}
          </ul>
          <Link href="/#contact" className="btn-white w-full justify-center py-3 text-sm font-semibold">
            Start with a Free Discovery Call
          </Link>
        </div>
      </div>

      {/* DELIVERABLES */}
      <section className="py-20 bg-bg">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="eyebrow mb-4">What You Receive</div>
          <h2 className="font-serif font-normal text-display-md text-brand-text mb-4">
            Five deliverables.
            <br />
            One written report you <em className="not-italic text-accent">own.</em>
          </h2>
          <p className="text-[0.95rem] text-brand-mid leading-[1.75] max-w-[560px] mb-12">
            Everything is documented. You leave with clarity — not a conversation and a vague next step.
          </p>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border">
              {deliverables.map(({ num, title, body }) => (
                <div key={num} className="bg-white p-9">
                  <p className="font-serif font-normal text-[2rem] text-accent tracking-[-0.04em] leading-none mb-4">{num}</p>
                  <h3 className="font-serif font-normal text-[1.15rem] mb-2.5 tracking-[-0.01em]">{title}</h3>
                  <p className="text-[0.86rem] text-brand-muted leading-[1.75]">{body}</p>
                </div>
              ))}
              <div className="p-9 bg-accent-light" style={{ borderLeft: '3px solid #1a4fa0' }}>
                <p className="font-serif font-normal text-[2rem] text-navy tracking-[-0.04em] leading-none mb-4">+</p>
                <h3 className="font-serif font-normal text-[1.15rem] mb-2.5 tracking-[-0.01em]">Yours to Keep</h3>
                <p className="text-[0.86rem] text-brand-muted leading-[1.75]">
                  The report is yours regardless of next steps. Take the recommendations to another
                  developer, use them internally, or file them for next year. No lock-in.
                </p>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-navy">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="eyebrow eyebrow-light mb-4">How It Runs</div>
          <h2 className="font-serif font-normal text-display-md text-white mb-12">
            One to two weeks.
            <br />
            <em className="not-italic text-white/40">Here&apos;s exactly how it works.</em>
          </h2>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
              {[
                {
                  when: 'Week 1 — Days 1–3',
                  title: 'Kickoff & Discovery',
                  body: "We start with a structured 2-hour kickoff session (remote or in-person). We walk through your business end-to-end: every process, every tool, every handoff. We ask the questions your team stopped asking because 'it's just how it's done.'",
                },
                {
                  when: 'Week 1 — Days 4–5',
                  title: 'Observation & Mapping',
                  body: 'We shadow key processes in real time, review existing documentation, and map the full workflow. This is where we spot the workarounds, the manual fixes, the Excel sheets that "just work."',
                },
                {
                  when: 'Week 2',
                  title: 'Analysis & Report',
                  body: 'We analyse the workflows, identify automation opportunities, build the ROI models, write architecture recommendations, and produce the final report. Delivered as a structured PDF with a 30-minute walkthrough call.',
                },
              ].map(({ when, title, body }, i) => (
                <div
                  key={title}
                  className="p-10"
                  style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                >
                  <p className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-white/30 mb-3">{when}</p>
                  <h3 className="font-serif font-normal text-[1.2rem] text-white mb-2.5">{title}</h3>
                  <p className="text-[0.85rem] text-white/42 leading-[1.75]">{body}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 bg-bg-2 border-t border-b border-brand-border">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="eyebrow mb-4">Is This Right For You?</div>
          <h2 className="font-serif font-normal text-display-md text-brand-text mb-4">
            The audit works well for
            <br />
            <em className="not-italic text-accent">some businesses, not all.</em>
          </h2>
          <p className="text-[0.95rem] text-brand-mid leading-[1.75] max-w-[500px] mb-12">
            We&apos;d rather tell you it&apos;s not the right fit than take your money and deliver something of
            limited value.
          </p>
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-brand-border rounded-brand p-7" style={{ borderLeft: '3px solid #1a6640' }}>
                <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase mb-4" style={{ color: '#1a6640' }}>Good fit</p>
                <ul className="list-none">
                  {[
                    'You have 5–200 staff and identifiable manual processes',
                    'Your team spends hours per week on repetitive data tasks',
                    "You use multiple tools that don't integrate well",
                    "You know something could be automated but don't know where to start",
                    'You want a business case before committing to a build',
                    "You've been quoted by agencies but the scope felt vague",
                  ].map((item) => (
                    <li key={item} className="flex gap-2 py-1.5 text-[0.875rem] text-brand-mid border-b border-brand-border last:border-0">
                      <span style={{ color: '#1a6640' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-brand-border rounded-brand p-7" style={{ borderLeft: '3px solid #8b1a1a' }}>
                <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase mb-4" style={{ color: '#8b1a1a' }}>Probably not the right fit</p>
                <ul className="list-none">
                  {[
                    "You're a solo operator with no team processes yet",
                    'You already know exactly what you want built',
                    "You're looking for off-the-shelf software recommendations",
                    'Your processes change every week (stabilise first)',
                    'You have no budget for automation implementation',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 py-1.5 text-[0.875rem] text-brand-mid border-b border-brand-border last:border-0">
                      <span style={{ color: '#8b1a1a' }}>✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-bg">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="eyebrow mb-4">Common Questions</div>
          <h2 className="font-serif font-normal text-display-md text-brand-text mb-12">
            Frequently asked.
          </h2>
          <RevealWrapper>
            <div className="border border-brand-border rounded-brand overflow-hidden">
              {faqs.map(({ q, a }, i) => (
                <div key={q} className={`p-8 ${i < faqs.length - 1 ? 'border-b border-brand-border' : ''}`}>
                  <h3 className="font-serif font-normal text-[1.1rem] mb-2.5">{q}</h3>
                  <p className="text-[0.875rem] text-brand-muted leading-[1.75]">{a}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bg-2 border-t border-brand-border">
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="bg-navy rounded-[6px] p-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <h2 className="font-serif font-normal text-[clamp(1.8rem,3vw,2.4rem)] text-white tracking-[-0.02em] leading-[1.1] mb-3">
                Start with a free call.
                <br />
                <em className="not-italic text-white/45">No commitment, no pitch.</em>
              </h2>
              <p className="text-[0.9rem] text-white/45 leading-[1.7]">
                Book a 30-minute discovery call. We&apos;ll talk through your business, identify where
                there&apos;s an automation opportunity, and tell you honestly whether the Process Audit makes
                sense for you.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 min-w-[220px]">
              <Link href="/#contact" className="btn-white px-6 py-3 text-sm font-semibold justify-center">
                Book Free Discovery Call
              </Link>
              <Link href="/" className="px-6 py-3 text-sm font-semibold justify-center flex items-center rounded-brand transition-colors" style={{ background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.15)' }}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .btn-primary { display:inline-flex;align-items:center;background:#0f1b2d;color:#fff;border-radius:3px;font-family:var(--font-instrument-sans),system-ui,sans-serif;font-weight:600;text-decoration:none;transition:background 0.18s;border:none;cursor:pointer; }
        .btn-primary:hover { background:#1e2f47; }
        .btn-outline { display:inline-flex;align-items:center;background:transparent;color:#3d4045;border:1.5px solid #c8c2bb;border-radius:3px;font-family:var(--font-instrument-sans),system-ui,sans-serif;font-weight:600;text-decoration:none;transition:all 0.18s;cursor:pointer; }
        .btn-outline:hover { border-color:#3d4045;color:#141210; }
        .btn-white { display:inline-flex;align-items:center;background:#fff;color:#0f1b2d;border-radius:3px;font-family:var(--font-instrument-sans),system-ui,sans-serif;font-weight:600;text-decoration:none;transition:background 0.18s;border:none;cursor:pointer; }
        .btn-white:hover { background:#f0efec; }
      `}</style>
    </>
  )
}

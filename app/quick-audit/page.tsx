import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'
import QuickAuditForm from '@/components/QuickAuditForm'

export const metadata: Metadata = {
  title: 'Free Quick-Audit — Get a Personalised AI Automation Assessment',
  description:
    'Answer 7 questions and get a tailored written assessment of your highest-ROI automation opportunities by email within 24 hours. No commitment, no sales pitch, no spam.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/quick-audit' },
}

export default function QuickAuditPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="bg-bg pt-36 pb-16 px-8 md:px-14">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div>
            <div className="eyebrow mb-4">Free Quick-Audit · By email · 24h</div>
            <h1 className="font-serif font-normal text-display-xl text-brand-text mb-6">
              Get a personalised automation assessment{' '}
              <em className="not-italic text-accent">in your inbox tomorrow.</em>
            </h1>
            <p className="text-[1.05rem] text-brand-mid leading-[1.75] mb-5">
              Not ready to book a call? Answer 7 short questions and we&apos;ll send you a one-page,
              tailored assessment by email within 24 hours. It identifies the highest-ROI automation
              opportunities in your specific business — based on your actual tools, team size, and
              processes.
            </p>
            <ul className="mb-6" style={{ borderTop: '1px solid #e2ddd8' }}>
              {[
                'Written specifically for your business — not a template',
                'Names 2–4 specific automations you should consider first',
                'Estimates the type of saving each one could deliver',
                'Tells you which to do in-house and which need outside help',
                'No spam, no follow-up sales call unless you book one',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 py-2.5 text-[0.9rem] text-brand-mid"
                  style={{ borderBottom: '1px solid #e2ddd8' }}
                >
                  <span className="text-accent font-semibold flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[0.85rem] text-brand-muted leading-[1.7]">
              Want a deeper analysis?{' '}
              <a href="/audit" className="text-accent hover:underline">
                The full Process Audit
              </a>{' '}
              is a 1–2 week paid engagement (£1,500, credited if you build) with on-site workflow
              mapping and a written report you keep. The Quick-Audit is a free 24-hour email
              alternative.
            </p>
          </div>

          <RevealWrapper>
            <QuickAuditForm />
          </RevealWrapper>
        </div>
      </section>

      {/* TRUST FOOTER */}
      <section className="py-16 bg-bg-2 border-t border-b border-brand-border">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14">
          <div className="max-w-[760px] mx-auto text-center">
            <div className="flex justify-center gap-1 mb-5 text-[1rem]" style={{ color: '#fbbc04' }}>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <blockquote className="font-serif font-normal text-[1.35rem] text-brand-text leading-[1.45] mb-5">
              &ldquo;Hard working, fast responding, and very dedicated agency. Highly recommend.&rdquo;
            </blockquote>
            <p className="text-[0.85rem] text-brand-muted">
              Dor Iluz · Marmadbir · Verified Google review
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

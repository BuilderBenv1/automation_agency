import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'
import QuickAuditForm from '@/components/QuickAuditForm'

export const metadata: Metadata = {
  title: 'Free Automation Opportunity Audit',
  description:
    "Send us the job your team keeps doing by hand. We'll reply — no commitment — with what can be automated, the easiest first build, the likely tools, a rough price range, and an honest view on whether it's worth doing.",
  alternates: { canonical: 'https://www.automation-agency.co.uk/quick-audit' },
}

const whatYouGet = [
  'What can be automated',
  'The easiest first build',
  'The likely tools — n8n, Zapier, Make, custom code, Claude or OpenAI',
  'A rough price range',
  "An honest view on whether it's even worth doing",
]

export default function QuickAuditPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="kicker mb-6">Free Automation Opportunity Audit</div>
            <h1 className="font-display font-black text-h1-mega uppercase mb-8">
              Send us the job
              <br />
              you keep doing <span className="text-lime">by hand.</span>
            </h1>
            <p className="text-muted-dark leading-[1.7] max-w-[540px] mb-8 text-[1.05rem]">
              <strong className="text-cream">Free Automation Opportunity Audit.</strong> We&apos;ll reply —
              no commitment — with:
            </p>
            <ul className="mb-8 border-t border-[rgba(244,237,224,0.14)]">
              {whatYouGet.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 py-3 text-[0.92rem] text-muted-dark border-b border-[rgba(244,237,224,0.14)]"
                >
                  <span className="text-lime font-semibold flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[0.85rem] text-muted-dark leading-[1.7]">
              Want a deeper, hands-on look?{' '}
              <Link href="/audit" className="text-cream underline decoration-lime decoration-2 underline-offset-4">
                The full Process Audit
              </Link>{' '}
              is a 1–2 week paid engagement (£1,500, credited if you build) with on-site workflow mapping and
              a written report you keep. This free audit is the no-commitment starting point.
            </p>
          </div>

          <RevealWrapper>
            <QuickAuditForm />
          </RevealWrapper>
        </div>
      </div>

      {/* TESTIMONIAL */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-24">
          <RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[900px] mx-auto">
              {[
                {
                  quote:
                    'His communication has been clear and quick, his work has been fast and accurate\u2026 highly recommended.',
                  who: 'Nezmaster games \u00b7 A Story To Tell \u00b7 Verified Google review',
                },
                {
                  quote:
                    'Hard working, fast responding, and very dedicated agency. Highly recommend.',
                  who: 'Dor Iluz \u00b7 Marmadbir \u00b7 Verified Google review',
                },
              ].map(({ quote, who }) => (
                <figure key={who} className="text-center">
                  <div className="flex justify-center gap-1 mb-5 text-[1rem] text-ink" aria-label="5 out of 5 stars">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <blockquote className="font-display font-medium text-[clamp(1.05rem,1.6vw,1.3rem)] text-ink leading-[1.5] mb-5">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-[0.85rem] text-muted-cream">{who}</figcaption>
                </figure>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      <Footer />
    </>
  )
}

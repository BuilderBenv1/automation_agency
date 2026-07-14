import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  robots: { index: false },
  alternates: { canonical: 'https://www.automation-agency.co.uk/cookies' },
}

export default function CookiesPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[840px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-14">
          <div className="kicker mb-6">Legal</div>
          <h1 className="font-display font-black text-display-lg uppercase mb-4">Cookie Policy</h1>
          <p className="text-[0.85rem] text-muted-dark">Last updated: April 2026</p>
        </div>
      </div>

      {/* BODY */}
      <section className="bg-cream text-ink">
        <div className="max-w-[840px] mx-auto px-8 md:px-14 py-16 md:py-20">
          <div className="bg-cream-2 border-l-[3px] border-lime rounded-r-2xl p-6 mb-10">
            <p className="text-[0.92rem] text-ink m-0 leading-relaxed">
              <strong>Good news:</strong> This website uses Plausible Analytics, which is completely cookieless.
              We do not set any analytics cookies, and no consent banner is required.
            </p>
          </div>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">What Are Cookies?</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            Cookies are small text files stored on your device when you visit a website.
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">Cookies We Use</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            This website does not set any cookies for analytics or tracking. We may set a single essential
            session cookie if you submit our contact form, solely to process your submission. It is deleted
            when you close your browser.
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">Analytics</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            We use Plausible Analytics, a privacy-first, cookieless analytics tool. Plausible does not collect
            personal data, does not set cookies, and is fully GDPR, CCPA, and PECR compliant. No consent is
            required. You can learn more at{' '}
            <a
              href="https://plausible.io/privacy-focused-web-analytics"
              target="_blank"
              rel="noopener"
              className="text-ink underline decoration-lime decoration-2 underline-offset-4"
            >
              plausible.io
            </a>
            .
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">Contact</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8]">
            Questions:{' '}
            <a
              href="mailto:hello@automation-agency.co.uk"
              className="text-ink underline decoration-lime decoration-2 underline-offset-4"
            >
              hello@automation-agency.co.uk
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}

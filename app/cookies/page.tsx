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
          <p className="text-[0.85rem] text-muted-dark">Last updated: July 2026</p>
        </div>
      </div>

      {/* BODY */}
      <section className="bg-cream text-ink">
        <div className="max-w-[840px] mx-auto px-8 md:px-14 py-16 md:py-20">
          <div className="bg-cream-2 border-l-[3px] border-lime rounded-r-2xl p-6 mb-10">
            <p className="text-[0.92rem] text-ink m-0 leading-relaxed">
              <strong>In short:</strong> Our website analytics (Plausible) is completely cookieless. We also use
              Google Ads conversion tracking, which sets a small number of advertising cookies to measure whether
              our ads lead to enquiries. Those cookies — and how to opt out — are described below.
            </p>
          </div>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">What Are Cookies?</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            Cookies are small text files stored on your device when you visit a website.
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">Cookies We Use</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            <strong className="text-ink">Analytics — none.</strong> Our analytics provider, Plausible, is
            cookieless (see below).
          </p>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            <strong className="text-ink">Advertising.</strong> We run Google Ads and use Google&apos;s conversion
            tracking. Google sets first-party advertising cookies on this domain — principally one named
            <span className="font-mono text-[0.9em] text-ink"> _gcl_au </span>— to link a form submission or
            booking back to a Google Ads click so we can measure how well our advertising works. These are
            typically stored for up to 90 days. They are not strictly necessary, so you can decline or remove them
            (see &ldquo;Managing Cookies&rdquo; below).
          </p>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            <strong className="text-ink">Essential.</strong> We may set a single session cookie if you submit our
            contact form, solely to process your submission. It is deleted when you close your browser.
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">Analytics</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            We use Plausible Analytics, a privacy-first, cookieless analytics tool. Plausible does not collect
            personal data and sets no cookies, and is fully GDPR, CCPA, and PECR compliant — Plausible itself
            requires no consent. You can learn more at{' '}
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

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">Advertising &amp; Conversion Tracking</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            When you arrive from one of our Google Ads and then submit an enquiry or book a call, Google&apos;s
            conversion tracking records that as a conversion. This relies on the advertising cookies described
            above and shares limited conversion data with Google. It tells us which ads are working; it is not
            used to build a profile of you on this site.
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">Managing Cookies</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            You can block or delete cookies at any time through your browser settings, and this will not affect
            your ability to use the site. You can also control or opt out of Google&apos;s advertising cookies at{' '}
            <a
              href="https://myadcenter.google.com"
              target="_blank"
              rel="noopener"
              className="text-ink underline decoration-lime decoration-2 underline-offset-4"
            >
              myadcenter.google.com
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

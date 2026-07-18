import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: { index: false },
  alternates: { canonical: 'https://www.automation-agency.co.uk/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <div className="bg-ink text-cream">
        <div className="max-w-[840px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-14">
          <div className="kicker mb-6">Legal</div>
          <h1 className="font-display font-black text-display-lg uppercase mb-4">Privacy Policy</h1>
          <p className="text-[0.85rem] text-muted-dark">Last updated: July 2026</p>
        </div>
      </div>

      {/* BODY */}
      <section className="bg-cream text-ink">
        <div className="max-w-[840px] mx-auto px-8 md:px-14 py-16 md:py-20">
          <div className="bg-cream-2 border-l-[3px] border-lime rounded-r-2xl p-6 mb-12">
            <p className="text-[0.92rem] text-ink leading-relaxed m-0">
              <strong>Summary:</strong> We collect your name, email, and message when you contact us. We use it
              only to respond to your enquiry. We don&apos;t sell your data, and we never will.
            </p>
          </div>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">1. Who We Are</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            The Automation Agency is a trading name operated by a sole trader based in Derbyshire, United
            Kingdom. We provide AI automation consultancy and software development services to businesses.
          </p>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            <strong className="text-ink">Contact:</strong>{' '}
            <a
              href="mailto:hello@automation-agency.co.uk"
              className="text-ink underline decoration-lime decoration-2 underline-offset-4"
            >
              hello@automation-agency.co.uk
            </a>
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">2. What Data We Collect</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            When you submit our contact form: your name, email, company name (optional), and message. We also
            process your message through Anthropic&apos;s Claude API to generate a personalised acknowledgement
            email. Your data is not used to train AI models.
          </p>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            We use Plausible Analytics for website analytics. Plausible is cookieless and GDPR compliant — it
            collects no personal data and sets no cookies.
          </p>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            We also use Google Ads conversion tracking to measure whether our advertising leads to enquiries. When
            you submit the form or book a call, this records a conversion and shares limited data with Google, and
            it sets first-party advertising cookies (such as{' '}
            <span className="font-mono text-[0.9em] text-ink">_gcl_au</span>). See our{' '}
            <a
              href="/cookies"
              className="text-ink underline decoration-lime decoration-2 underline-offset-4"
            >
              Cookie Policy
            </a>{' '}
            for the full list and how to opt out.
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">3. How We Use Your Data</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            We use your contact details to respond to your enquiry and, where a project proceeds, to fulfil our
            contract with you. Our legal basis is legitimate interests for enquiry responses, and contract
            performance for client work.
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">4. Third-Party Processors</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            We use Resend (email delivery), Vercel (hosting), Anthropic (AI processing of enquiry messages),
            Plausible (cookieless analytics), and Google (Google Ads conversion tracking). Each operates under
            appropriate data protection agreements.
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">5. Data Retention</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            Enquiries that don&apos;t lead to a project: 12 months. Client project data: 6 years (legal and tax
            obligations).
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">6. Your Rights</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8] mb-4">
            Under UK GDPR you have the right to access, rectify, erase, restrict, or port your data, and to
            object to processing. Email{' '}
            <a
              href="mailto:hello@automation-agency.co.uk"
              className="text-ink underline decoration-lime decoration-2 underline-offset-4"
            >
              hello@automation-agency.co.uk
            </a>{' '}
            to exercise any right. You may also complain to the ICO at{' '}
            <a
              href="https://ico.org.uk"
              className="text-ink underline decoration-lime decoration-2 underline-offset-4"
              target="_blank"
              rel="noopener"
            >
              ico.org.uk
            </a>
            .
          </p>

          <h2 className="font-display font-bold text-[1.4rem] text-ink mt-12 mb-3">7. Contact</h2>
          <p className="text-[0.95rem] text-muted-cream leading-[1.8]">
            For privacy queries:{' '}
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

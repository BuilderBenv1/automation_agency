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
      <main className="max-w-[760px] mx-auto px-12 pt-[72px] pb-24 mt-[68px]">
        <div className="eyebrow mb-4">Legal</div>
        <h1 className="font-serif font-normal text-[2.8rem] tracking-[-0.02em] leading-[1.1] mb-3">Cookie Policy</h1>
        <p className="text-[0.85rem] text-brand-muted mb-12 pb-12 border-b border-brand-border">Last updated: April 2026</p>

        <div className="bg-accent-light border-l-[3px] border-accent p-5 rounded-r-brand mb-8">
          <p className="text-[0.9rem] text-brand-mid m-0 leading-relaxed"><strong>Good news:</strong> This website uses Plausible Analytics, which is completely cookieless. We do not set any analytics cookies, and no consent banner is required.</p>
        </div>

        <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">What Are Cookies?</h2>
        <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">Cookies are small text files stored on your device when you visit a website.</p>

        <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">Cookies We Use</h2>
        <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">This website does not set any cookies for analytics or tracking. We may set a single essential session cookie if you submit our contact form, solely to process your submission. It is deleted when you close your browser.</p>

        <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">Analytics</h2>
        <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">We use Plausible Analytics, a privacy-first, cookieless analytics tool. Plausible does not collect personal data, does not set cookies, and is fully GDPR, CCPA, and PECR compliant. No consent is required. You can learn more at <a href="https://plausible.io/privacy-focused-web-analytics" target="_blank" rel="noopener" className="text-accent">plausible.io</a>.</p>

        <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">Contact</h2>
        <p className="text-[0.9rem] text-brand-mid leading-[1.8]">Questions: <a href="mailto:hello@automation-agency.co.uk" className="text-accent">hello@automation-agency.co.uk</a></p>
      </main>
      <Footer />
    </>
  )
}

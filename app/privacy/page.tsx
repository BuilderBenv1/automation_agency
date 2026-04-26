import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: { index: false },
  alternates: { canonical: 'https://automation-agency.co.uk/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="max-w-[760px] mx-auto px-12 pt-[72px] pb-24 mt-[68px]">
        <div className="eyebrow mb-4">Legal</div>
        <h1 className="font-serif font-normal text-[2.8rem] tracking-[-0.02em] leading-[1.1] mb-3">Privacy Policy</h1>
        <p className="text-[0.85rem] text-brand-muted mb-12 pb-12 border-b border-brand-border">Last updated: April 2026</p>

        <div className="prose-content">
          <div className="bg-accent-light border-l-[3px] border-accent p-5 rounded-r-brand mb-10">
            <p className="text-[0.9rem] text-brand-mid leading-relaxed m-0"><strong>Summary:</strong> We collect your name, email, and message when you contact us. We use it only to respond to your enquiry. We don&apos;t sell your data, and we never will.</p>
          </div>

          <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">1. Who We Are</h2>
          <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">The Automation Agency is a trading name operated by a sole trader based in Derbyshire, United Kingdom. We provide AI automation consultancy and software development services to businesses.</p>
          <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4"><strong>Contact:</strong> <a href="mailto:hello@automation-agency.co.uk" className="text-accent">hello@automation-agency.co.uk</a></p>

          <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">2. What Data We Collect</h2>
          <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">When you submit our contact form: your name, email, company name (optional), and message. We also process your message through Anthropic&apos;s Claude API to generate a personalised acknowledgement email. Your data is not used to train AI models.</p>
          <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">We use Plausible Analytics for website analytics. Plausible is cookieless and GDPR compliant — no personal data is collected, no cookies are set, and no consent is required.</p>

          <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">3. How We Use Your Data</h2>
          <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">We use your contact details to respond to your enquiry and, where a project proceeds, to fulfil our contract with you. Our legal basis is legitimate interests for enquiry responses, and contract performance for client work.</p>

          <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">4. Third-Party Processors</h2>
          <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">We use Resend (email delivery), Vercel (hosting), Anthropic (AI processing of enquiry messages), and Plausible (cookieless analytics). Each operates under appropriate data protection agreements.</p>

          <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">5. Data Retention</h2>
          <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">Enquiries that don&apos;t lead to a project: 12 months. Client project data: 6 years (legal and tax obligations).</p>

          <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">6. Your Rights</h2>
          <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">Under UK GDPR you have the right to access, rectify, erase, restrict, or port your data, and to object to processing. Email <a href="mailto:hello@automation-agency.co.uk" className="text-accent">hello@automation-agency.co.uk</a> to exercise any right. You may also complain to the ICO at <a href="https://ico.org.uk" className="text-accent" target="_blank" rel="noopener">ico.org.uk</a>.</p>

          <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">7. Contact</h2>
          <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">For privacy queries: <a href="mailto:hello@automation-agency.co.uk" className="text-accent">hello@automation-agency.co.uk</a></p>
        </div>
      </main>
      <Footer />
    </>
  )
}

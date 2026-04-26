import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  robots: { index: false },
  alternates: { canonical: 'https://automation-agency.co.uk/terms' },
}

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="max-w-[760px] mx-auto px-12 pt-[72px] pb-24 mt-[68px]">
        <div className="eyebrow mb-4">Legal</div>
        <h1 className="font-serif font-normal text-[2.8rem] tracking-[-0.02em] leading-[1.1] mb-3">Terms & Conditions</h1>
        <p className="text-[0.85rem] text-brand-muted mb-12 pb-12 border-b border-brand-border">Last updated: April 2026 · Governing law: England & Wales</p>

        {[
          { h: '1. About Us', p: 'The Automation Agency is a trading name operated by a sole trader in Derbyshire, England. Contact: hello@automation-agency.co.uk. By engaging our services, you agree to these terms.' },
          { h: '2. Services', p: 'We provide AI automation consultancy and software development as agreed in writing for each project. Work begins only upon written agreement and receipt of any deposit required.' },
          { h: '3. Payment Terms', p: 'Fixed-price projects: 50% deposit before work begins, 50% on completion. Retainers: invoiced monthly in advance, due within 14 days. Late payment: statutory interest applies under the Late Payment of Commercial Debts (Interest) Act 1998. All prices are exclusive of VAT unless stated.' },
          { h: '4. Intellectual Property', p: 'Upon receipt of full payment, all custom code and deliverables created specifically for you become your property. We retain ownership of pre-existing tools and frameworks used in delivery, and grant you a perpetual royalty-free licence to use them in your deliverables.' },
          { h: '5. Confidentiality', p: "We keep your business information confidential and won't disclose it to third parties except as required by law or to sub-contractors bound by equivalent obligations." },
          { h: '6. Limitation of Liability', p: 'Our total liability for any claim shall not exceed total fees paid in the 12 months preceding the claim. We are not liable for indirect or consequential damages. Nothing limits liability for death, personal injury caused by negligence, or fraud.' },
          { h: '7. Termination', p: 'Either party may terminate with 14 days written notice (projects) or 30 days written notice (retainers). You will be invoiced for all work completed to the termination date.' },
          { h: '8. Governing Law', p: 'These terms are governed by the laws of England and Wales. Disputes are subject to the exclusive jurisdiction of English and Welsh courts.' },
        ].map(({ h, p }) => (
          <div key={h}>
            <h2 className="font-serif font-normal text-[1.4rem] mt-10 mb-3">{h}</h2>
            <p className="text-[0.9rem] text-brand-mid leading-[1.8] mb-4">{p}</p>
          </div>
        ))}
      </main>
      <Footer />
    </>
  )
}

import Link from 'next/link'

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
  { href: '/quick-audit', label: 'Free Quick-Audit' },
  { href: '/audit', label: 'Process Audit' },
]

const serviceLinks = [
  { href: '/n8n-automation-agency', label: 'n8n automation' },
  { href: '/zapier-make-automation', label: 'Zapier & Make' },
  { href: '/ai-chatbot-development', label: 'AI chatbots' },
  { href: '/whatsapp-chatbot', label: 'WhatsApp chatbots' },
  { href: '/ai-automation-agency', label: 'AI automation' },
  { href: '/crm-automation', label: 'CRM automation' },
  { href: '/google-sheets-automation', label: 'Google Sheets automation' },
  { href: '/email-deliverability', label: 'Email deliverability' },
  { href: '/stripe-payment-integration', label: 'Stripe integration' },
  { href: '/internal-tools-dashboard', label: 'Internal tools' },
]

const cityLinks = [
  { href: '/ai-automation-chesterfield', label: 'Chesterfield' },
  { href: '/ai-automation-derbyshire', label: 'Derbyshire' },
  { href: '/ai-automation-sheffield', label: 'Sheffield' },
  { href: '/ai-automation-nottingham', label: 'Nottingham' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/cookies', label: 'Cookies' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-cream px-8 md:px-14 py-12">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-10 mb-10 pb-10 border-b border-[rgba(244,237,224,0.14)]">
          <div>
            <p className="font-display font-bold text-[1.05rem] text-cream mb-3">The Automation Agency</p>
            <p className="text-[0.83rem] text-muted-dark leading-relaxed mb-4 max-w-[280px]">
              AI &amp; process automation for UK businesses. Based in Chesterfield, Derbyshire.
            </p>
            <a
              href="mailto:hello@automation-agency.co.uk"
              className="block text-[0.9rem] font-semibold text-cream hover:text-lime transition-colors no-underline"
            >
              hello@automation-agency.co.uk
            </a>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-4">
              Services
            </p>
            <ul className="list-none flex flex-col gap-2.5">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[0.85rem] text-muted-dark hover:text-lime transition-colors no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-4">
              Site
            </p>
            <ul className="list-none flex flex-col gap-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[0.85rem] text-muted-dark hover:text-lime transition-colors no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-4">
              Where We Work
            </p>
            <ul className="list-none flex flex-col gap-2.5">
              {cityLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[0.85rem] text-muted-dark hover:text-lime transition-colors no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-4">
              Legal
            </p>
            <ul className="list-none flex flex-col gap-2.5">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[0.85rem] text-muted-dark hover:text-lime transition-colors no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-[0.78rem] text-muted-dark text-center">
          © 2026 The Automation Agency · Chesterfield, Derbyshire, UK
        </p>
      </div>
    </footer>
  )
}

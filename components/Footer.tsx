import Link from 'next/link'

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
  { href: '/audit', label: 'Process Audit' },
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
    <footer className="px-14 py-12 border-t border-brand-border bg-bg">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-10 pb-10 border-b border-brand-border">
        <div>
          <p className="font-serif text-[1.05rem] text-brand-text mb-3">The Automation Agency</p>
          <p className="text-[0.83rem] text-brand-muted leading-relaxed mb-4 max-w-[280px]">
            AI &amp; process automation for UK businesses. Based in Chesterfield, Derbyshire.
          </p>
          <a
            href="tel:+441246923041"
            className="block text-[0.95rem] font-semibold text-brand-text hover:text-accent transition-colors no-underline mb-1"
          >
            01246 923041
          </a>
          <a
            href="mailto:hello@automation-agency.co.uk"
            className="block text-[0.83rem] text-brand-muted hover:text-brand-text transition-colors no-underline"
          >
            hello@automation-agency.co.uk
          </a>
        </div>

        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-4">
            Site
          </p>
          <ul className="list-none flex flex-col gap-2.5">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[0.85rem] text-brand-mid hover:text-brand-text transition-colors no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-4">
            Where We Work
          </p>
          <ul className="list-none flex flex-col gap-2.5">
            {cityLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[0.85rem] text-brand-mid hover:text-brand-text transition-colors no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-4">
            Legal
          </p>
          <ul className="list-none flex flex-col gap-2.5">
            {legalLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[0.85rem] text-brand-mid hover:text-brand-text transition-colors no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-[0.78rem] text-brand-muted text-center">
        © 2026 The Automation Agency · Chesterfield, Derbyshire, UK
      </p>
    </footer>
  )
}

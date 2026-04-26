import Link from 'next/link'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/cookies', label: 'Cookies' },
]

export default function Footer() {
  return (
    <footer className="px-14 py-10 border-t border-brand-border bg-bg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        <span className="font-serif text-base text-brand-text">The Automation Agency</span>

        <ul className="flex flex-wrap justify-center gap-8 list-none">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="text-[0.83rem] text-brand-muted hover:text-brand-text transition-colors no-underline">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center md:items-end gap-1.5">
          <a
            href="tel:+441246923041"
            className="text-[0.85rem] font-semibold text-brand-text hover:text-accent transition-colors no-underline"
          >
            01246 923041
          </a>
          <a
            href="mailto:hello@automation-agency.co.uk"
            className="text-[0.78rem] text-brand-muted hover:text-brand-text transition-colors no-underline"
          >
            hello@automation-agency.co.uk
          </a>
        </div>
      </div>

      <p className="text-[0.78rem] text-brand-muted text-center md:text-right mt-8 pt-6 border-t border-brand-border">
        © 2026 The Automation Agency · Chesterfield, Derbyshire, UK
        {legalLinks.map(({ href, label }) => (
          <span key={href}>
            {' · '}
            <Link href={href} className="text-brand-muted hover:text-brand-text no-underline transition-colors">
              {label}
            </Link>
          </span>
        ))}
      </p>
    </footer>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'How It Works' },
  { href: '#work', label: 'Our Work' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = document.querySelectorAll('section[id]')
      let current = ''
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 100) {
          current = s.id
        }
      })
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[68px] px-14 bg-bg transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_1px_0_#e2ddd8]' : 'border-b border-brand-border'
      }`}
    >
      <Link href="/" className="font-serif text-[1.15rem] text-brand-text no-underline">
        The Automation Agency
      </Link>

      <ul className="hidden md:flex items-center gap-10 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className={`text-sm font-medium transition-colors duration-150 no-underline ${
                active === href.replace('#', '')
                  ? 'text-brand-text'
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="btn-primary text-sm font-semibold no-underline"
      >
        Book Discovery Call
      </a>
    </nav>
  )
}

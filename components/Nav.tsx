'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/quick-audit', label: 'Free Audit' },
  { href: '/#contact', label: 'Contact' },
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
      className={`fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_1px_0_rgba(244,237,224,0.14)]' : 'border-b border-[rgba(244,237,224,0.14)]'
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-8 md:px-14 h-[68px] flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-[1.05rem] text-cream no-underline">
          The Automation Agency
        </Link>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {links.map(({ href, label }) => {
            const hashId = href.includes('#') ? href.slice(href.indexOf('#') + 1) : ''
            const isActive = hashId !== '' && active === hashId
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors duration-150 no-underline ${
                    isActive ? 'text-lime' : 'text-cream hover:text-lime'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <Link href="/#contact" className="btn-lime">
          Book Discovery Call
        </Link>
      </div>
    </nav>
  )
}

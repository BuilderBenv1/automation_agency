import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://automation-agency.co.uk'),
  title: {
    default: 'The Automation Agency — AI & Process Automation for UK Businesses',
    template: '%s — The Automation Agency',
  },
  description:
    'We eliminate repetitive manual work for UK businesses with custom AI agents and automation systems. Free discovery call. Based in Derbyshire, working nationally.',
  keywords: [
    'AI automation consultant UK',
    'process automation Derbyshire',
    'AI agent development UK',
    'business automation consultant Sheffield',
    'agentic automation East Midlands',
  ],
  authors: [{ name: 'The Automation Agency' }],
  creator: 'The Automation Agency',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://automation-agency.co.uk',
    siteName: 'The Automation Agency',
    title: 'The Automation Agency — AI & Process Automation for UK Businesses',
    description:
      'We eliminate repetitive manual work for UK businesses with custom AI agents and automation systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Automation Agency — AI & Process Automation for UK Businesses',
    description: 'We eliminate repetitive manual work for UK businesses with custom AI agents and automation systems.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://automation-agency.co.uk' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable}`}
      style={{ colorScheme: 'light' }}
    >
      <head>
        {/* Plausible Analytics — cookieless, no consent needed */}
        <script
          defer
          data-domain="automation-agency.co.uk"
          src="https://plausible.io/js/script.js"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'The Automation Agency',
              description:
                'AI automation consultancy eliminating manual work for UK businesses. Based in Derbyshire.',
              url: 'https://automation-agency.co.uk',
              email: 'hello@automation-agency.co.uk',
              telephone: '+441246923041',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Chesterfield',
                addressRegion: 'Derbyshire',
                addressCountry: 'GB',
              },
              areaServed: { '@type': 'Country', name: 'United Kingdom' },
              serviceType: [
                'AI Agent Development',
                'Process Automation',
                'Data Pipeline Engineering',
                'Custom Software Integration',
                'Business Automation Consultancy',
                'Process Audit',
              ],
              priceRange: '£££',
              founder: {
                '@type': 'Person',
                name: 'Ben Horne',
                jobTitle: 'Founder & Senior Developer',
                image: 'https://automation-agency.co.uk/founder.jpg',
                worksFor: { '@type': 'Organization', name: 'The Automation Agency' },
              },
              review: [
                {
                  '@type': 'Review',
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                  },
                  author: { '@type': 'Person', name: 'Dor Iluz' },
                  reviewBody:
                    'I work with them for a while now, they are nothing less than hard working, fast responding, and very dedicated agency. Highly recommend.',
                  publisher: { '@type': 'Organization', name: 'Google' },
                },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                reviewCount: '1',
                bestRating: '5',
              },
            }),
          }}
        />
      </head>
      <body className="bg-bg text-brand-text font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}

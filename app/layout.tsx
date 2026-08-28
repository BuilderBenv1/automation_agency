import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import Script from 'next/script'
import ConversionTracker from '@/components/ConversionTracker'
import './globals.css'

const GOOGLE_ADS_ID = 'AW-18121615285'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.automation-agency.co.uk'),
  title: {
    default: 'Business Process Automation for UK SMEs — The Automation Agency',
    template: '%s — The Automation Agency',
  },
  description:
    'We find the admin your team does by hand and build the systems that do it instead — typically hours back every week. Fixed prices agreed before we start, free 30-minute discovery call, written Process Audit from £1,500. Based in Chesterfield, Derbyshire, working with businesses across the UK.',
  keywords: [
    'business process automation UK',
    'automate admin small business',
    'automation consultant East Midlands',
    'reduce admin costs small business',
    'business automation consultant Derbyshire',
    'save staff time automation UK',
    'process audit for small business',
    'automate invoicing and quotes UK',
    'grow without hiring more admin staff',
    'workflow automation for SMEs',
  ],
  authors: [{ name: 'The Automation Agency' }],
  creator: 'The Automation Agency',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.automation-agency.co.uk',
    siteName: 'The Automation Agency',
    title: 'Business Process Automation for UK SMEs — The Automation Agency',
    description:
      'Stop paying people to do work a machine can do. We map where your team’s time actually goes and build the systems that give it back. Fixed prices, free discovery call, Derbyshire-based, UK-wide.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Process Automation for UK SMEs — The Automation Agency',
    description:
      'Stop paying people to do work a machine can do. We map where your team’s time actually goes and build the systems that give it back. Fixed prices, free discovery call, Derbyshire-based, UK-wide.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.automation-agency.co.uk' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={archivo.variable}
      style={{ colorScheme: 'dark' }}
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
                'Business process automation for UK SMEs. We map where a team’s time is going, then build the systems that give it back — fixed price, agreed before work starts. Based in Chesterfield, Derbyshire, working nationally.',
              url: 'https://www.automation-agency.co.uk',
              email: 'hello@automation-agency.co.uk',
              telephone: '+441246923041',
              address: {
                '@type': 'PostalAddress',
                // TODO: add streetAddress and postalCode. Deliberately omitted —
                // no real address exists in the repo or env and inventing one
                // would poison the NAP consistency a Google Business Profile
                // is later verified against.
                addressLocality: 'Chesterfield',
                addressRegion: 'Derbyshire',
                addressCountry: 'GB',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 53.235,
                longitude: -1.421,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '17:30',
                },
              ],
              // Mirrors the pages that actually exist: four locality pages plus
              // the regional hub, under national coverage.
              areaServed: [
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'AdministrativeArea', name: 'East Midlands' },
                { '@type': 'AdministrativeArea', name: 'Derbyshire' },
                { '@type': 'City', name: 'Chesterfield' },
                { '@type': 'City', name: 'Sheffield' },
                { '@type': 'City', name: 'Nottingham' },
              ],
              serviceType: [
                'n8n, Zapier & Make automation',
                'AI agents & Claude/OpenAI workflows',
                'WhatsApp & website chatbots',
                'CRM automation',
                'Google Sheets & Airtable automation',
                'Data pipelines & web data extraction',
                'Email deliverability',
                'Stripe & payment automation',
                'Internal tools & dashboards',
                'Process audit',
              ],
              // TODO: still empty. Exactly two URLs belong here and neither was
              // supplied:
              //   1. the Google Business Profile URL (blocked on claiming/verifying
              //      the GBP — audit fix #28)
              //   2. the LinkedIn *company page* URL (distinct from the founder's
              //      personal profile, which is on the founder node below)
              // This is the highest-leverage field on the page for answer engines
              // deciding whether the business is corroborated elsewhere.
              sameAs: [],
              priceRange: '££',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Automation engagements',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    name: 'Process Audit',
                    description:
                      'Fixed-fee 1–2 week diagnostic: workflow mapping, prioritised opportunities, ROI estimates and fixed-price build quotes. Credited in full against a build within 60 days.',
                    url: 'https://www.automation-agency.co.uk/audit',
                    availability: 'https://schema.org/InStock',
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      price: '1500',
                      priceCurrency: 'GBP',
                      valueAddedTaxIncluded: true,
                    },
                  },
                  {
                    '@type': 'Offer',
                    name: 'Automation build',
                    description:
                      'Fixed-price build of the systems scoped in the audit, delivered in 2–6 weeks with testing, deployment, staff walkthrough and 30 days of post-launch support.',
                    url: 'https://www.automation-agency.co.uk/#pricing',
                    availability: 'https://schema.org/InStock',
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      minPrice: '3000',
                      priceCurrency: 'GBP',
                      valueAddedTaxIncluded: true,
                    },
                  },
                  {
                    '@type': 'Offer',
                    name: 'Monthly retainer',
                    description:
                      'Ongoing automation partner: monitoring, fixes, new workflows and a monthly strategy call. Monthly rolling, cancel anytime.',
                    url: 'https://www.automation-agency.co.uk/#pricing',
                    availability: 'https://schema.org/InStock',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      minPrice: '1500',
                      priceCurrency: 'GBP',
                      unitCode: 'MON',
                      billingIncrement: 1,
                      valueAddedTaxIncluded: true,
                    },
                  },
                ],
              },
              founder: {
                '@type': 'Person',
                name: 'Ben Horne',
                jobTitle: 'Founder',
                image: 'https://www.automation-agency.co.uk/founder.jpg',
                sameAs: ['https://www.linkedin.com/in/benjamin-horne-8413b03a9/'],
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
              // No aggregateRating: self-serving AggregateRating on
              // LocalBusiness/Organization markup is unsupported by Google and a
              // manual-action risk, especially at reviewCount 1. Reinstate once
              // there are enough genuine reviews to be worth the rich result.
            }),
          }}
        />
      </head>
      <body className="bg-ink text-cream font-sans antialiased overflow-x-hidden">
        {children}
        <ConversionTracker />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}

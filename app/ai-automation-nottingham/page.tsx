import type { Metadata } from 'next'
import CityPage, { type CityData } from '@/components/CityPage'

export const metadata: Metadata = {
  title: 'AI Automation Consultant in Nottingham — The Automation Agency',
  description:
    'AI agents and process automation for Nottingham businesses across NG1–NG34. Based in Chesterfield, 45 minutes via the M1. Fixed prices, in-person kickoffs, free discovery call.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/ai-automation-nottingham' },
}

const data: CityData = {
  city: 'Nottingham',
  region: 'East Midlands',
  urlSlug: 'ai-automation-nottingham',
  eyebrow: 'AI Automation in Nottingham',
  heroH1: (
    <>
      AI &amp; process automation for{' '}
      <em className="not-italic text-accent">Nottingham businesses,</em> across NG1–NG34.
    </>
  ),
  heroIntro:
    "We build AI agents and automation systems for Nottingham businesses, working from Chesterfield — about 45 minutes north via the M1. Every project is fixed-price, scoped within 48 hours of your first call.",
  driveTime:
    "On-site kickoff included for Nottingham clients — typical drive time 45 minutes via M1 (J29 to J27) or A38 / A61.",
  localContext:
    "Nottingham has a deeper enterprise-services footprint than most UK cities its size — Boots, Capital One, Experian, and Speedo all anchor it, and the supplier ecosystem around them is rich with mid-size SMEs that have outgrown spreadsheets but aren't ready for enterprise-tier automation tooling. Add the city's two universities, a dense healthcare and pharmaceuticals cluster, and a creative-and-tech corridor running through Sneinton and the Lace Market, and the result is a long list of operations teams running on Excel-and-email when they shouldn't be. That's our typical client.",
  areasServed: [
    'Nottingham City Centre', 'Beeston', 'Bulwell', 'West Bridgford', 'Mapperley',
    'Carlton', 'Arnold', 'Ruddington', 'Long Eaton', 'Stapleford', 'Kimberley',
    'Eastwood', 'Hucknall', 'Bingham', 'Cotgrave', 'Radcliffe-on-Trent', 'Sneinton',
    'Lenton', 'Wollaton', 'Bilborough', 'Bestwood', 'Clifton', 'Gedling',
    'Lace Market', 'Sherwood', 'Mansfield', 'Newark',
  ],
  industries: [
    {
      sector: 'Financial Services & Insurance',
      body: "Nottingham's financial-services density (Capital One, Experian, Boots Insurance, plus dozens of mid-size brokers and IFAs) creates constant demand for compliance-aware automation. Common projects: client-onboarding workflows, document-extraction pipelines, AI-summarised internal comms, and regulator-reporting automation.",
    },
    {
      sector: 'Healthcare & Life Sciences',
      body: "Pharmaceutical, medical-devices, and clinical-services firms across Nottingham typically have data-heavy operations with strict audit requirements. We work on validated data pipelines, lab-to-CRM integrations, and AI agents for inbound clinical-enquiry triage.",
    },
    {
      sector: 'Creative, Tech & Education',
      body: "Agencies, SaaS startups, and university spin-outs around the Lace Market and Sneinton are typically lean ops-wise and fast on the ROI math. Inbound-enquiry routing, content-pipeline automation, and AI-drafted client deliverables are common first builds.",
    },
  ],
  faqs: [
    {
      q: 'Are you based in Nottingham?',
      a: "No — we're based in Chesterfield, around 45 minutes north via the M1. Close enough that we treat Nottingham as effectively local: travel for kickoff and key project meetings is included.",
    },
    {
      q: 'Do you work with regulated industries in Nottingham?',
      a: "Yes — most of our financial-services and healthcare clients have compliance constraints baked into their workflows. We design audit-ready pipelines, log everything that needs logging, and work within whichever environment your data has to stay in.",
    },
    {
      q: 'What does the Process Audit cost from Nottingham?',
      a: "£1,500 fixed fee, fully credited against your build if you proceed within 60 days. No travel surcharge for Nottingham — kickoff visits are included.",
    },
    {
      q: "How quickly can you start work for a Nottingham client?",
      a: "Discovery calls usually within 5 working days. Process Audit runs 1–2 weeks. Build projects start within 2 weeks of a signed quote.",
    },
    {
      q: 'Can you work with our existing Nottingham IT team?',
      a: "Yes — we deliberately build in ways your team can take over later. Full documentation, written architecture, and a 30-day post-launch support window are included with every build.",
    },
  ],
}

export default function Page() {
  return <CityPage data={data} />
}

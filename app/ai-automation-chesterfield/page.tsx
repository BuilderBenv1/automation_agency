import type { Metadata } from 'next'
import CityPage, { type CityData } from '@/components/CityPage'

export const metadata: Metadata = {
  title: 'AI Automation Consultant in Chesterfield — The Automation Agency',
  description:
    'AI agents and process automation built right here in Chesterfield. Same-day on-site visits across S40–S45. Fixed prices, free discovery call, Process Audits from £1,500.',
  alternates: { canonical: 'https://automation-agency.co.uk/ai-automation-chesterfield' },
}

const data: CityData = {
  city: 'Chesterfield',
  region: 'Derbyshire',
  urlSlug: 'ai-automation-chesterfield',
  eyebrow: 'AI Automation in Chesterfield',
  heroH1: (
    <>
      AI &amp; process automation,{' '}
      <em className="not-italic text-accent">built right here in Chesterfield.</em>
    </>
  ),
  heroIntro:
    "Based in Chesterfield, we build AI agents and automation systems for local businesses across S40–S45 and the surrounding villages. Same-day on-site visits, fixed prices, in-person kickoff included with every Process Audit.",
  driveTime:
    "Same-day on-site visits across Chesterfield, Brimington, Whittington, Hasland, Wingerworth, Dronfield, and Clay Cross. No travel charge — we live here.",
  localContext:
    "Chesterfield's local economy isn't just the high street. Markham Vale's industrial estate has become one of the East Midlands' biggest distribution clusters; the legacy engineering base around Whittington Moor and Hady is deep; the Pomegranate hospital and the wider healthcare ecosystem keep growing; and there's a quieter but real community of professional-services SMEs across the town. What every one of these has in common is small ops teams stretched across systems that were never designed to work together. That's exactly the gap our Process Audit was built for — and being five minutes down the road means we can be on-site the same day.",
  areasServed: [
    'Chesterfield Town Centre', 'Brimington', 'Hasland', 'Whittington', 'Walton',
    'Boythorpe', 'Calow', 'Brampton', 'Old Whittington', 'New Whittington',
    'Holmewood', 'Clay Cross', 'Dronfield', 'Wingerworth', 'Markham Vale',
    'Hady', 'Tapton', 'Newbold', 'St Augustines', 'Ashgate', 'Loundsley Green',
    'Rother', 'Birdholme', 'Inkersall',
  ],
  industries: [
    {
      sector: 'Manufacturing & Engineering',
      body: "Markham Vale and the wider Chesterfield manufacturing base — from precision engineering to component fabrication — typically runs on a stack of legacy operational systems. We automate the gaps: stock data, scheduling, supplier integrations, quality reporting, and the inevitable Excel sheets nobody quite trusts.",
    },
    {
      sector: 'Distribution & Logistics',
      body: "Chesterfield's strategic position on the M1 has made it a serious distribution hub. Tracking systems, customer comms, route optimisation, supplier integrations, and AI-driven exception handling are common automation wins for the operators we work with.",
    },
    {
      sector: 'Professional Services',
      body: "Solicitors, accountants, recruiters, and marketing agencies across Chesterfield town centre tend to have the fastest ROI from automation. Document workflows, AI-drafted client comms, inbound-enquiry triage, and finance-system integration are our typical first projects with this group.",
    },
  ],
  faqs: [
    {
      q: 'Where exactly are you based in Chesterfield?',
      a: "Chesterfield town-centre area, easy reach of the M1 J29. We're set up to be on-site at any local client within 30 minutes — typically same day if you need it.",
    },
    {
      q: 'Do you work with small Chesterfield businesses?',
      a: "Yes. Our typical client is 5–50 staff. The Process Audit is designed to be useful even at the smaller end of that range — the £1,500 fixed fee is credited if you proceed, and you keep the report regardless. So even if we conclude the right answer is a £2,000 build rather than a £20,000 one, the audit hasn't cost you anything net.",
    },
    {
      q: 'Will you visit my Chesterfield office on the same day?',
      a: "Usually yes. Discovery calls are most often booked online, but for proper Process Audit kickoffs we strongly prefer in-person — and being local means we can usually get to you within 24–48 hours of confirming.",
    },
    {
      q: "Can you work with my existing Chesterfield-based developer or IT person?",
      a: "Yes — frequently. We deliver everything with full documentation and a written architecture, so any local developer or in-house IT can take over support, extend the system, or audit what we've built. No lock-in.",
    },
    {
      q: 'How does pricing work for a Chesterfield client?',
      a: "Same as everywhere else. Process Audit £1,500 (credited against build). Builds from £3,000 fixed price. Multi-agent / full-platform builds from £8,000. Optional retainer £1,500/month rolling. No travel surcharge — we live here.",
    },
  ],
}

export default function Page() {
  return <CityPage data={data} />
}

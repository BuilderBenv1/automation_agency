import type { Metadata } from 'next'
import CityPage, { type CityData } from '@/components/CityPage'

export const metadata: Metadata = {
  title: 'AI Automation Consultant in Sheffield — The Automation Agency',
  description:
    'AI agents and process automation for Sheffield businesses across S1–S35. Based 30 minutes south in Chesterfield. Fixed prices, in-person kickoffs, free discovery call.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/ai-automation-sheffield' },
}

const data: CityData = {
  city: 'Sheffield',
  region: 'South Yorkshire',
  urlSlug: 'ai-automation-sheffield',
  eyebrow: 'AI Automation in Sheffield',
  heroH1: (
    <>
      AI &amp; process automation for{' '}
      <em className="not-italic text-accent">Sheffield businesses,</em> 30 minutes from S1.
    </>
  ),
  heroIntro:
    "We build AI agents and automation systems for Sheffield businesses, working from Chesterfield — close enough that in-person kickoffs happen the same day if you need them. Every project is fixed-price, scoped within 48 hours.",
  driveTime:
    "Same-day on-site kickoff possible across S1–S35. Typical door-to-door from our base is 30 minutes via the M1 or A61.",
  localContext:
    "Sheffield's economy is unusually well-suited to automation work. The advanced-manufacturing cluster around the AMRC, Tata Steel R&D, and the Sheffield Technology Parks runs on a deep stack of legacy and modern systems that rarely talk to each other natively. Healthcare and life sciences (Sheffield Teaching Hospitals, the Children's Hospital, Sheffield Hallam research) run on similar challenges at a different scale. And the city's growing professional-services sector — from creative agencies in Kelham Island to fintech and SaaS startups — typically has lean ops teams that can't afford full-time integration engineers. We work with all three.",
  areasServed: [
    'Sheffield City Centre', 'Hillsborough', 'Ecclesall', 'Crookes', 'Endcliffe', 'Dore',
    'Totley', 'Mosborough', 'Stocksbridge', 'Chapeltown', 'Woodseats', 'Heeley',
    'Kelham Island', 'Attercliffe', 'Norton', 'Beauchief', 'Crosspool', 'Walkley',
    'Nether Edge', 'Sharrow', 'Meersbrook', 'Handsworth', 'Tinsley', 'Catcliffe',
    'Rotherham', 'Killamarsh', 'Eckington', 'Penistone',
  ],
  industries: [
    {
      sector: 'Advanced Manufacturing',
      body: "Sheffield's specialist engineering and steel-derived manufacturing sector — including AMRC supply chain, aerospace contractors, and precision metalwork — generates more shop-floor data than most have a way to use. Automation wins: production reporting, quality data pipelines, supplier integrations, schedule optimisation.",
    },
    {
      sector: 'Healthcare & MedTech',
      body: "Hospital trusts, dental groups, private clinics, and MedTech startups in Sheffield typically run a patchwork of clinical, finance, and patient-comms systems. Common projects: appointment-to-finance automation, AI-summarised clinical communications, regulated-data pipeline work.",
    },
    {
      sector: 'Professional Services & Tech',
      body: "Creative agencies, SaaS startups, accounting practices, and recruitment firms in Sheffield are the fastest-ROI category we see. Inbound-enquiry triage, AI-drafted client comms, finance automation, and document workflows are typical first projects.",
    },
  ],
  faqs: [
    {
      q: 'Are you based in Sheffield?',
      a: "No — we're based in Chesterfield, about 30 minutes south via the M1 or A61. Close enough that we treat Sheffield clients as effectively local: same-day on-site visits, no travel charge.",
    },
    {
      q: 'Do you work with Sheffield manufacturers?',
      a: "Yes, regularly. Production data, scheduling, quality reporting, and supplier-integration work are typical projects. The Process Audit is especially useful here because manufacturing automation has a wide range of options — the audit narrows it to what's actually highest-ROI for your specific operation.",
    },
    {
      q: 'What does it cost to work with you from Sheffield?',
      a: "Same as anywhere else. Process Audit £1,500 fixed (credited against build). Build projects from £3,000 fixed price. Multi-agent or full-platform builds from £8,000. No travel surcharge for Sheffield.",
    },
    {
      q: 'Can you visit our Sheffield office?',
      a: "Yes — we strongly prefer to. The 2-hour Process Audit kickoff in person almost always produces a better result than a video call, because we get to see the actual workflows, the spreadsheets people are working from, and the systems that aren't talking to each other.",
    },
    {
      q: "How quickly can you start work for a Sheffield client?",
      a: "Discovery calls are usually within 5 working days of enquiry. The Process Audit takes 1–2 weeks. Build projects start within 2 weeks of a signed quote.",
    },
  ],
}

export default function Page() {
  return <CityPage data={data} />
}

import type { Metadata } from 'next'
import CityPage, { type CityData } from '@/components/CityPage'

export const metadata: Metadata = {
  title: 'AI Automation Consultant in Derbyshire — The Automation Agency',
  description:
    'AI agents and process automation for Derbyshire businesses, run from Chesterfield. Fixed-price builds, in-person kickoffs across Derby, Buxton, Matlock, and the High Peak. Free discovery call.',
  alternates: { canonical: 'https://automation-agency.co.uk/ai-automation-derbyshire' },
}

const data: CityData = {
  city: 'Derbyshire',
  region: 'East Midlands',
  urlSlug: 'ai-automation-derbyshire',
  eyebrow: 'AI Automation in Derbyshire',
  heroH1: (
    <>
      AI &amp; process automation for{' '}
      <em className="not-italic text-accent">Derbyshire businesses,</em> run from Chesterfield.
    </>
  ),
  heroIntro:
    "Based in Chesterfield, we build AI agents and automation systems for businesses across Derbyshire — from Derby in the south to Glossop and Buxton in the High Peak. Every project is fixed-price, scoped within 48 hours of your first call.",
  driveTime:
    "We come to you. In-person kickoff at no extra charge anywhere in Derbyshire — typical drive time under an hour from Chesterfield.",
  localContext:
    "Derbyshire's economy is a mix that suits automation work well: precision engineering and manufacturing in and around Derby, distribution and logistics through the M1 corridor, hospitality and tourism across the Peak District, and a long tail of SMEs in Chesterfield, Belper, Ripley, and Buxton. The common thread we see is the same: small ops teams under pressure, manual data passing between systems that don't talk, and a sense that something should be automatable but no clear plan for which thing first. That's exactly the gap our Process Audit fills.",
  areasServed: [
    'Chesterfield', 'Derby', 'Buxton', 'Matlock', 'Bakewell', 'Belper', 'Ashbourne',
    'Glossop', 'Long Eaton', 'Ilkeston', 'Ripley', 'Heanor', 'Alfreton', 'Wirksworth',
    'Clay Cross', 'Dronfield', 'Wingerworth', 'Brimington', 'Hasland', 'Holmewood',
    'Whaley Bridge', 'New Mills', 'Swadlincote', 'Heage',
  ],
  industries: [
    {
      sector: 'Manufacturing & Engineering',
      body: "Derbyshire's manufacturing base — from Rolls-Royce suppliers in Derby to specialist engineering across Chesterfield and the Amber Valley — typically has scattered shop-floor data and manual back-office handoffs. We automate stock, scheduling, supplier integrations, and reporting.",
    },
    {
      sector: 'Tourism & Hospitality',
      body: "Peak District operators (hotels, holiday lets, attractions, food and drink venues) lose hours every week on bookings, supplier ordering, payroll, and review-management. Common automation wins: unified booking-to-finance flow, automated supplier reordering, AI-driven review summaries.",
    },
    {
      sector: 'Professional Services',
      body: "Chesterfield, Derby, and Belper SMEs running on a stack of unrelated tools — CRM here, accounts there, email everywhere — get the fastest ROI from integration work. Onboarding flows, document automation, and AI agents that handle inbound enquiries are typical.",
    },
  ],
  faqs: [
    {
      q: 'Where in Derbyshire are you based?',
      a: "Chesterfield — about 5 minutes off the M1 (J29). We're set up to drive to clients across the county for kickoff sessions at no extra charge.",
    },
    {
      q: 'Do you visit on-site for the audit?',
      a: "Yes. The 2-hour kickoff session for the Process Audit is included in the £1,500 fixed fee — and travel within Derbyshire (Derby, Buxton, Matlock, Belper, Ripley, etc.) is included with no extra charge.",
    },
    {
      q: "What size of Derbyshire business do you typically work with?",
      a: "Most of our clients are 5–50 staff. The audit makes sense once you have identifiable repeated processes — usually that means at least one full-time person whose job involves passing data between systems.",
    },
    {
      q: 'How quickly can you start a project in Derbyshire?',
      a: "Discovery calls are usually within 5 working days. The Process Audit takes 1–2 weeks. Build projects start within 2 weeks of a signed quote and typically deliver in 2–6 weeks depending on scope.",
    },
    {
      q: 'Do I have to be in Derbyshire to work with you?',
      a: "No — most of our work is delivered remotely. The local proximity just means we can do the kickoff in person rather than over video, which usually gives a better Process Audit result.",
    },
  ],
}

export default function Page() {
  return <CityPage data={data} />
}

export type ServiceFaq = { q: string; a: string }
export type ServiceProof = { client: string; url: string; line: string; metric: string; metricLabel: string }
export type ServiceRelated = { slug: string; label: string }

export type ServiceData = {
  slug: string
  metaTitle: string
  metaDescription: string
  kicker: string
  h1Lead: string
  h1Accent: string
  h1Outline: string
  intro: string        // 2–3 sentence extractable definition
  problem: string
  workflows: string[]  // 4–6 concrete example flows
  from: string         // e.g. "£350"
  faqs: ServiceFaq[]   // 4–6
  proof?: ServiceProof // optional — some pages (e.g. email deliverability) have no matched case study
  related: ServiceRelated[] // 2–3 sibling services
}

export const servicePages: Record<string, ServiceData> = {
  'n8n-automation-agency': {
    slug: 'n8n-automation-agency',
    metaTitle: 'n8n Automation Agency UK | Custom Workflows Built Properly',
    metaDescription:
      'UK n8n automation agency. We design, build and host n8n workflows that connect your CRM, forms, sheets, inbox and APIs. Fixed prices from £350.',
    kicker: 'n8n automation · UK',
    h1Lead: 'n8n workflows,',
    h1Accent: 'built properly.',
    h1Outline: 'Hosted, monitored, yours.',
    intro:
      'We are a UK automation agency that designs, builds and hosts n8n workflows for growing businesses. n8n is an open, self-hostable automation tool — so you get Zapier-style convenience without the per-task bill or the vendor lock-in.',
    problem:
      "Most teams have three or four tools that don't talk to each other, so someone spends their morning copy-pasting between them. n8n connects those tools into one workflow that runs on its own — and because it is self-hosted, it does not get more expensive every time you use it.",
    workflows: [
      'New website enquiry → create the CRM record → post to Slack → send a templated reply',
      'Incoming email with an attachment → extract the data → append a row to Google Sheets',
      'Nightly job → pull figures from an API → build a report → email it to the client',
      'Stripe payment → update the CRM, send the receipt, tag the subscription',
      'Airtable status change → notify the right person on WhatsApp or Telegram',
    ],
    from: '£350',
    faqs: [
      { q: 'Is n8n better than Zapier or Make?', a: 'For anything beyond simple flows, usually yes. n8n is self-hostable, so you are not paying per task, and it handles complex logic, custom code and API calls that Zapier charges a premium for. For a couple of tiny automations, Zapier can still be the quicker win — we will tell you which fits.' },
      { q: 'Do you host the n8n workflows for us?', a: 'We can host and monitor them for you, or set n8n up on your own infrastructure and hand it over with documentation. Either way you own the workflows outright.' },
      { q: 'How much does an n8n workflow cost?', a: 'A single workflow connecting two or three tools starts at £350, fixed price. More involved builds with custom logic, AI steps or multiple integrations are quoted after a quick scoping call — always fixed, never hourly.' },
      { q: 'What if a workflow breaks?', a: 'We build in error handling and alerts so you know before your customers do, and offer an optional retainer for monitoring and fixes. Broken workflows built by someone else are one of the most common things we get asked to rebuild.' },
    ],
    proof: {
      client: 'Punthub',
      url: 'https://punthub.co.uk/',
      line: 'An unattended pipeline pulling 6 live data sources through 7 models every night, with zero human touchpoints.',
      metric: '0',
      metricLabel: 'human touchpoints per day',
    },
    related: [
      { slug: '/zapier-make-automation', label: 'Zapier & Make automation' },
      { slug: '/crm-automation', label: 'CRM automation' },
      { slug: '/ai-automation-agency', label: 'AI agents & workflows' },
    ],
  },
}

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

  'zapier-make-automation': {
    slug: 'zapier-make-automation',
    metaTitle: 'Zapier & Make Automation UK | Workflows Built & Fixed Properly',
    metaDescription:
      'UK Zapier and Make automation agency. We build, fix and connect your Zapier and Make workflows so the manual copy-paste stops for good. Fixed prices from £350.',
    kicker: 'Zapier & Make automation · UK',
    h1Lead: 'Zapier and Make,',
    h1Accent: 'set up properly.',
    h1Outline: 'Or fixed when it breaks.',
    intro:
      "We're a UK automation agency that builds and repairs Zapier and Make workflows for growing businesses. Zapier and Make are no-code automation platforms that connect the apps you already use — your CRM, inbox, forms and spreadsheets — so data moves between them without anyone touching it. We set them up properly the first time, or fix the ones somebody else left held together with tape.",
    problem:
      'Zapier and Make are brilliant right up until a workflow gets even slightly complicated — a step needs custom logic, a filter breaks silently, or your task count creeps past the plan limit and the bill jumps. Most of what we get asked to fix is a Zap or scenario built in a rush that quietly stopped working weeks ago, with nobody any wiser until a customer complained.',
    workflows: [
      'New Typeform or website enquiry → create the lead in your CRM → notify the right person on Slack',
      'Order in Shopify or WooCommerce → update stock in Google Sheets → email the customer a tracking link',
      'New row in Airtable → generate a PDF quote → send it and log the follow-up date',
      'Calendly booking → add to the CRM → send a reminder text the day before',
      "Broken Zap or Make scenario → rebuilt with error handling so it stops failing silently",
      'Gmail label applied → forward the thread contents into your CRM as a note',
    ],
    from: '£350',
    faqs: [
      {
        q: 'n8n vs Zapier vs Make — which one do we need?',
        a: "Zapier is simplest to learn, Make gives more visual control over branching logic, and n8n is what we reach for once you're past a handful of steps or tired of paying per task. We start most clients on Zapier or Make, then move heavier workflows to n8n as volume grows — we'll tell you honestly which fits.",
      },
      {
        q: 'How much does a Zapier or Make setup cost?',
        a: 'A straightforward automation connecting two or three apps starts at £350, fixed price — no hourly billing and no surprises. Anything with multiple branches, custom code steps or several tools gets quoted after a short call, always fixed.',
      },
      {
        q: 'Can you fix a Zap or Make scenario someone else built?',
        a: 'Yes — this is one of the most common jobs we take on. We look at what is there, tell you honestly whether it is worth repairing or rebuilding, and either way you end up with something documented that will not quietly break again.',
      },
      {
        q: 'Will we get locked into a monthly task limit?',
        a: "That is the real cost of Zapier and Make — your bill rises with task volume, not just your plan tier. We design workflows to use as few tasks as sensibly possible, and if you're close to outgrowing your plan we'll flag it before it becomes a problem, including whether n8n would work out cheaper.",
      },
      {
        q: 'Do you connect apps that do not have a native Zapier or Make integration?',
        a: 'Often, yes. Most apps have an API even without an official listing on Zapier or Make, and we can usually connect through a webhook or a custom HTTP step instead. Tell us the two tools and we will confirm before you pay for anything.',
      },
    ],
    proof: {
      client: 'Marmadbir',
      url: 'https://www.marmadbir.com/',
      line: "What we build for clients like Marmadbir is really about eliminating manual coordination and copy-paste between tools — the tool depends on how complex the job is. Zapier, Make or n8n cover most cases; something as involved as Marmadbir's WhatsApp dispatch platform needed custom code instead. Either way: messaging costs down roughly two-thirds, coordinator's manual workload at zero.",
      metric: '~65%',
      metricLabel: 'lower messaging cost after automating dispatch',
    },
    related: [
      { slug: '/n8n-automation-agency', label: 'n8n automation' },
      { slug: '/crm-automation', label: 'CRM automation' },
      { slug: '/ai-automation-agency', label: 'AI agents & workflows' },
    ],
  },

  'ai-chatbot-development': {
    slug: 'ai-chatbot-development',
    metaTitle: 'AI Chatbot Development UK | Custom Chatbots Built Properly',
    metaDescription:
      'UK AI chatbot development agency. We build website and WhatsApp chatbots trained on your real information, with human handover built in. Fixed prices from £750.',
    kicker: 'AI chatbot development · UK',
    h1Lead: 'AI chatbots,',
    h1Accent: 'that actually answer.',
    h1Outline: 'Human handover built in.',
    intro:
      "We design and build AI chatbots for UK businesses — on your website, WhatsApp or both — trained on your own information so they answer real questions instead of generic ones. An AI chatbot uses a language model to hold a conversation, look things up in your documents or systems, and either resolve the query or pass it to a person with the full context attached.",
    problem:
      "Most chatbots people have tried are either a rigid decision tree that gives up after two questions, or a generic AI wrapper that confidently makes things up. Customers can tell the difference immediately, and a bot that gets your prices or opening hours wrong costs you more trust than having no bot at all. We build ours to only answer from what you have actually told it, and to say 'let me get someone' rather than guess.",
    workflows: [
      'Website visitor asks about pricing or availability → bot answers from your actual price list, in real time',
      'Chatbot qualifies a lead — budget, timeline, need — → creates the CRM record and books a call',
      'Customer asks something the bot cannot confidently answer → handed to a human with the full conversation attached',
      "Returning customer → bot pulls up their order or booking status from your system",
      'After-hours enquiry → bot captures the question and details, follows up automatically once you are back online',
      'Bot flags a complaint or refund request → routes straight to you instead of trying to handle it itself',
    ],
    from: '£750',
    faqs: [
      {
        q: 'Website chatbot or WhatsApp chatbot — which is better for us?',
        a: "It depends where your customers already are. A website chatbot catches people mid-browse and is quickest to set up; a WhatsApp chatbot works better for repeat customers and bookings, since they can message you again days later without hunting for your site. Plenty of clients end up running both, fed by the same source of truth.",
      },
      {
        q: 'What happens when the bot cannot answer something?',
        a: "It says so rather than guessing, and hands the conversation to a human — you, or whoever you choose — with the full chat history attached so nobody has to repeat themselves. Where that handover lands (email, Slack, WhatsApp) is up to you.",
      },
      {
        q: 'How much does an AI chatbot cost?',
        a: 'A chatbot trained on your information and answering straightforward questions starts at £750, fixed price. Add booking, CRM lookups or multiple channels and we will quote after a short call — always fixed, never hourly, so you know the number before we start.',
      },
      {
        q: 'Can the chatbot make things up?',
        a: 'Not the way we build it. We restrict it to answering from your actual documents, pricing and policies, so if the answer is not in there it says it does not know rather than inventing one. That is the difference between a chatbot people trust and one that gets screenshotted.',
      },
      {
        q: 'Does it replace our customer service team?',
        a: 'No — it takes the repetitive questions off their plate so the team spends their time on the ones that actually need a person. Most clients treat it as extra capacity rather than a replacement.',
      },
    ],
    proof: {
      client: 'Marmadbir',
      url: 'https://www.marmadbir.com/',
      line: "Marmadbir's dispatchers used to spend their day chasing field workers over WhatsApp and phone calls, one at a time. We automated the conversation — broadcasting jobs, handling replies, confirming payment — and got that manual back-and-forth down to zero, which is exactly what a well-built chatbot does for your customer conversations.",
      metric: '0',
      metricLabel: 'coordinator hours spent chasing people by hand',
    },
    related: [
      { slug: '/whatsapp-chatbot', label: 'WhatsApp chatbot' },
      { slug: '/ai-automation-agency', label: 'AI agents & workflows' },
      { slug: '/crm-automation', label: 'CRM automation' },
    ],
  },

  'whatsapp-chatbot': {
    slug: 'whatsapp-chatbot',
    metaTitle: 'WhatsApp Chatbot Development UK | Business API Bots Built Properly',
    metaDescription:
      'UK WhatsApp chatbot agency. We build WhatsApp Business API chatbots on Twilio for bookings, support and lead capture, connected to your CRM. Fixed prices from £750.',
    kicker: 'WhatsApp chatbot · UK',
    h1Lead: 'WhatsApp chatbots,',
    h1Accent: 'built on the real API.',
    h1Outline: 'Not a script that gets banned.',
    intro:
      "We build WhatsApp chatbots for UK businesses on the official WhatsApp Business API, connected through Twilio, so you can answer questions, take bookings and capture leads without anyone sat watching their phone. A WhatsApp chatbot lets customers message you the way they already message their friends, while the automation behind it looks up answers, updates your CRM and only pulls in a human when the conversation genuinely needs one.",
    problem:
      "A lot of 'WhatsApp automation' out there runs through an unofficial API or a personal number with a script bolted on, which is exactly how businesses get their WhatsApp number banned overnight, mid-conversation with customers. We build on the official WhatsApp Business API through Twilio, properly verified, so the messaging keeps working and the conversation history stays yours.",
    workflows: [
      'Customer messages "book" on WhatsApp → bot checks availability → confirms a slot and adds it to your calendar',
      'New enquiry on WhatsApp → bot answers FAQs from your price list → captures details as a CRM lead',
      'Order or job status update → bot messages the customer automatically, no one has to remember to send it',
      "Customer asks something outside the bot's depth → handed to a real person with the whole thread visible",
      'Payment or deposit due → bot sends the link, confirms once paid, updates the record',
      'Job or slot broadcast to a group of workers or customers on WhatsApp → first to reply claims it',
    ],
    from: '£750',
    faqs: [
      {
        q: 'Do we need the WhatsApp Business API, or can we just use a normal WhatsApp account?',
        a: 'For anything beyond one person manually replying, you need the official WhatsApp Business API — a personal or Business App account gets flagged or banned once you start sending automated messages. We handle the verification and set it up properly through Twilio so it stays reliable.',
      },
      {
        q: 'Why do you build on Twilio specifically?',
        a: "Twilio is an official WhatsApp Business Solution Provider, so the number is properly registered and the messaging infrastructure holds up at scale — we are not routing your customers' messages through something that could get shut down without warning. It also gives us the building blocks to connect WhatsApp to your CRM, calendar or payment system.",
      },
      {
        q: 'How much does a WhatsApp chatbot cost?',
        a: 'A WhatsApp chatbot answering FAQs and capturing leads starts at £750, fixed price, including the Business API setup. Add bookings, payments or CRM integration and we will quote a fixed number after a short call.',
      },
      {
        q: 'Can it hand over to a real person?',
        a: 'Yes — that is built in by default. Anything the bot is not confident about gets passed to you or your team with the full conversation attached, so the customer never has to repeat themselves.',
      },
      {
        q: 'Will customers know they are talking to a bot?',
        a: 'We think they should, and design for it — a quick, honest introduction rather than pretending to be a person, which tends to backfire the moment someone asks a question it cannot answer.',
      },
    ],
    proof: {
      client: 'Marmadbir',
      url: 'https://www.marmadbir.com/',
      line: 'Marmadbir runs multi-tenant WhatsApp dispatch on the official Business API through Twilio — the same foundation we build every WhatsApp chatbot on. A new tenant can be onboarded and sending automated WhatsApp messages in under five minutes, with zero manual setup on our side.',
      metric: '< 5 min',
      metricLabel: 'to onboard a new tenant onto WhatsApp',
    },
    related: [
      { slug: '/ai-chatbot-development', label: 'AI chatbot development' },
      { slug: '/crm-automation', label: 'CRM automation' },
      { slug: '/stripe-payment-integration', label: 'Stripe & payments' },
    ],
  },

  'ai-automation-agency': {
    slug: 'ai-automation-agency',
    metaTitle: 'AI Automation Agency UK | AI Agents & Workflows Built Properly',
    metaDescription:
      'UK AI automation agency building AI agents, chatbots, workflows and data pipelines that actually work, with a human in the loop where it matters. Fixed prices from £750.',
    kicker: 'AI automation agency · UK',
    h1Lead: 'AI automation,',
    h1Accent: 'end to end.',
    h1Outline: 'Agents, workflows, data — one team.',
    intro:
      "We're a UK AI automation agency that builds AI agents, automated workflows and connected data pipelines for growing businesses — not one at a time, but as one system that talks to your CRM, your inbox, your spreadsheets and your customers. An \"AI automation agency\" should mean more than a chatbot bolted onto a website; it means using AI where it actually saves time, and plain, deterministic automation everywhere else, so nothing is held together by hope.",
    problem:
      "Most businesses end up hiring separately for the chatbot, the CRM integration and the reporting dashboard — three different freelancers, three half-finished systems that don't talk to each other, and nobody who understands the whole picture once something breaks. On top of that, \"AI\" gets bolted onto every sales pitch going right now, and a lot of what is sold as an AI agent turns out to be a chatbot wrapper with no real engineering behind it. We build the whole stack ourselves — workflows, agents, integrations and the plain code in between — so there is one team who understands how it all fits together.",
    workflows: [
      "New enquiry arrives by form, email or WhatsApp → an AI agent reads it, checks your CRM, and either replies or flags it for a human",
      'Nightly data pipeline → pulls figures from several sources, runs them through your scoring or prediction logic, and refreshes a dashboard before anyone is awake',
      'Public or partner websites → monitored on a schedule, with an alert the moment something relevant changes',
      'CRM record updated → triggers whatever needs to happen elsewhere: a Slack message, a WhatsApp confirmation, an invoice, a row in a sheet',
      "Multi-tenant platform → each customer's workflows, permissions and messaging kept separate but running on one shared system underneath",
      'Recurring manual report → replaced with a scheduled job that pulls the numbers and sends itself',
    ],
    from: '£750',
    faqs: [
      {
        q: 'What does "AI agent" actually mean?',
        a: "It means software that can look at unstructured information — an email, a message, a scraped web page — decide what it means, and take an action, rather than just following a fixed if-this-then-that rule. In practice that's usually a language model doing the reading and deciding, wired into ordinary code and APIs that do the actual work: updating a CRM, sending a message, writing to a database. It's less mysterious than the marketing suggests, and more useful once you see it running on your own data.",
      },
      {
        q: 'Is it safe to let AI make decisions in our business?',
        a: "We build with a human in the loop by default — the agent handles the routine cases and hands over anything it isn't confident about, with the full context attached, rather than guessing. For anything touching money, contracts or a customer commitment, we add explicit checks and an approval step rather than letting the AI act unsupervised. You decide where that line sits; we build to it.",
      },
      {
        q: 'How much does AI automation cost?',
        a: 'A single AI-powered workflow or agent — reading messages and taking one clear action — starts at £750, fixed price. Bigger builds spanning multiple systems (CRM, WhatsApp, dashboards, data pipelines) are quoted after a scoping call, always as one fixed number agreed before we start, never billed hourly.',
      },
      {
        q: "What's the difference between this and hiring separate agencies for the chatbot, the CRM and the reporting?",
        a: "Mainly that one team builds and understands the whole thing. When your chatbot, your CRM integration and your reporting dashboard are each built by a different freelancer, nobody is accountable when they stop talking to each other. We design them as one system from the start, which is also why it usually costs less than three separate projects.",
      },
      {
        q: 'Do you only use AI, or plain automation too?',
        a: "Both, and usually mostly the latter. AI is genuinely good at reading and understanding messy, unstructured information; deterministic automation is faster, cheaper and more predictable for everything else. We use AI where it earns its place and skip it everywhere it would just add cost and unpredictability for no real benefit.",
      },
    ],
    proof: {
      client: 'Marmadbir, Punthub & PlusRooms',
      url: 'https://www.automation-agency.co.uk/#work',
      line: "Three different sectors — field-service dispatch, predictive racing analytics, property planning data — each running on a system we designed, built and still support end to end. Some of it is classic automation, some of it (Punthub's prediction models) is genuinely AI; we use whichever one actually solves the problem, not whichever sounds better in a pitch.",
      metric: '3',
      metricLabel: 'production systems shipped, three different industries',
    },
    related: [
      { slug: '/n8n-automation-agency', label: 'n8n automation' },
      { slug: '/ai-chatbot-development', label: 'AI chatbot development' },
      { slug: '/crm-automation', label: 'CRM automation' },
    ],
  },

  'crm-automation': {
    slug: 'crm-automation',
    metaTitle: 'CRM Automation UK | HubSpot, Pipedrive & Airtable Workflows',
    metaDescription:
      'UK CRM automation agency. We connect HubSpot, Pipedrive, Airtable and other CRMs to your forms, inbox and invoicing so records update themselves. Fixed prices from £350.',
    kicker: 'CRM automation · UK',
    h1Lead: 'Your CRM,',
    h1Accent: 'finally up to date.',
    h1Outline: 'Automatically, not by hand.',
    intro:
      "We build CRM automation for UK businesses using HubSpot, Pipedrive, Airtable and similar tools — connecting your CRM to your forms, inbox, WhatsApp and invoicing so records update themselves the moment something happens. CRM automation just means the lead, deal or customer record gets created, updated and moved along the pipeline without someone doing it by hand.",
    problem:
      "A CRM is only useful if it's actually kept up to date, and in most businesses it isn't — leads sit in an inbox for two days before anyone adds them, deal stages get forgotten, and half the team works from memory instead of the record. That isn't really a CRM problem, it's a data-entry problem, and it's exactly what automation removes: the record updates the moment the trigger happens, not whenever someone remembers to open the tab.",
    workflows: [
      'New website enquiry or form submission → lead created in your CRM automatically, tagged with its source and assigned to the right person',
      'Deal moves to "won" → invoice generated, onboarding tasks created, welcome email sent, with nobody having to remember the steps',
      'WhatsApp or email reply from a customer → logged against their CRM record as a note, so the whole history stays in one place',
      'Quote sent but not accepted after a set number of days → an automatic reminder, to the salesperson or the customer',
      'Two systems, one customer → your CRM stays in sync with your invoicing or booking tool, so nobody re-types the same details twice',
      'Lead scoring based on behaviour or form answers → the CRM sorts the hottest leads to the top automatically',
    ],
    from: '£350',
    faqs: [
      {
        q: 'Which CRMs do you work with?',
        a: "Most of them — HubSpot, Pipedrive and Airtable come up the most, but we've also automated Zoho, Close, and CRMs built in-house on a spreadsheet or Airtable base. If it has an API, and nearly everything does, we can connect it; if you haven't picked a CRM yet, we'll help you choose one that actually fits rather than the one with the biggest marketing budget.",
      },
      {
        q: 'How much does CRM automation cost?',
        a: 'A single automation — say, new enquiries creating CRM records automatically — starts at £350, fixed price. Multi-step automations spanning your CRM, invoicing and messaging are quoted after a short call, always as one fixed number agreed before we start.',
      },
      {
        q: 'Do we need to switch CRM to get this?',
        a: "Almost never. We build around whatever you already use — ripping out a CRM your team already knows is usually more disruptive than the automation is worth. The exception is if what you have genuinely can't do the job (no API, no way to trigger anything), in which case we'll say so honestly before you spend a penny.",
      },
      {
        q: 'Can you migrate our data into a new CRM?',
        a: "Yes — cleaning up and importing existing records is often the first job, especially if you're moving off spreadsheets or a CRM that's been badly set up over the years. We'll flag duplicates and dead data on the way through, rather than just copying the mess into a shinier system.",
      },
      {
        q: 'How long does CRM automation take to set up?',
        a: 'A single automation, like new-enquiry-to-CRM-record, usually takes a few days from the scoping call to going live. Bigger builds connecting several systems typically take one to three weeks, and the timeline is agreed upfront as part of the fixed quote.',
      },
    ],
    proof: {
      client: 'Marmadbir',
      url: 'https://www.marmadbir.com/',
      line: "Every job, tenant and worker at Marmadbir lives in one system that updates itself — no dispatcher opening a spreadsheet to log who did what. That's the same job CRM automation does for a sales or service team: the record updates the moment something happens, so nobody has to remember to do it by hand.",
      metric: '< 5 min',
      metricLabel: "to bring a new tenant's records fully live, no manual setup",
    },
    related: [
      { slug: '/n8n-automation-agency', label: 'n8n automation' },
      { slug: '/google-sheets-automation', label: 'Google Sheets automation' },
      { slug: '/ai-automation-agency', label: 'AI agents & workflows' },
    ],
  },

  'google-sheets-automation': {
    slug: 'google-sheets-automation',
    metaTitle: 'Google Sheets Automation UK | Scheduled, Connected Spreadsheets',
    metaDescription:
      'UK Google Sheets automation agency. We connect your spreadsheets to forms, APIs and other systems on a schedule, so the sheet updates itself. Fixed prices from £350.',
    kicker: 'Google Sheets automation · UK',
    h1Lead: 'Google Sheets,',
    h1Accent: 'that update themselves.',
    h1Outline: 'No copy-paste, no missed rows.',
    intro:
      'We build Google Sheets automation for UK businesses that want to keep using spreadsheets, just without updating them by hand. That means pulling data in from your forms, inbox, CRM or an external API on a schedule, writing it into the right sheet and tab automatically, and triggering whatever needs to happen next once it lands.',
    problem:
      'Spreadsheets are genuinely good tools — the problem is almost never the sheet, it\'s the person copying numbers into it every morning, or forgetting to on the one day it mattered. That manual step is where the mistakes creep in: a row skipped, a formula overwritten, an out-of-date version emailed around. Automating the sheet itself, rather than replacing it, usually gets a business most of the way to "having a database" without a migration project.',
    workflows: [
      'Form or website enquiry → new row added to the right sheet automatically, with its source and timestamp',
      'Scheduled job → pulls data from an API or another system each morning or evening and writes it straight into the sheet',
      'Row added or updated → triggers an email, a Slack message or a CRM update, so the sheet drives everything downstream',
      'Several data sources → merged and reconciled into one sheet overnight, so nobody copies figures between tabs by hand',
      'Sheet reaches a threshold — stock low, budget spent, a date passed → an automatic alert before it becomes a problem',
      "Recurring report → built straight from the sheet's data and emailed out on a schedule, without anyone opening it",
    ],
    from: '£350',
    faqs: [
      {
        q: 'Should we use Google Sheets or move to a proper database?',
        a: "Sheets are fine for most businesses well past the point people assume — you can automate the writing and reading, add validation, and connect it to other tools, and it holds up for a surprisingly long time. The tipping point is usually volume (thousands of rows updating constantly) or several people editing at once and tripping over each other; that's when a proper database like Supabase or Postgres starts paying for itself. We'll tell you honestly which side of that line you're on.",
      },
      {
        q: 'Can Google Sheets automation run on a schedule?',
        a: 'Yes — most of what we build runs on a timer, whether that\'s every few minutes, once a night, or first thing every morning, so the sheet is current before anyone opens it. Nobody has to remember to run anything.',
      },
      {
        q: 'How much does Google Sheets automation cost?',
        a: 'A single automation — pulling data into a sheet on a schedule, or writing a new row when something happens — starts at £350, fixed price. Pipelines pulling from several sources or feeding a dashboard are quoted after a short call, always fixed.',
      },
      {
        q: 'Will this break our existing formulas or formatting?',
        a: "No — we write into the sheet the way a careful person would, respecting the tabs, formulas and formatting you already have rather than overwriting the whole thing. If a formula depends on a cell we're updating, we test it before going live so nothing quietly stops calculating.",
      },
      {
        q: 'Can several sheets feed into one dashboard?',
        a: "Yes — a lot of what we build reconciles several sheets or external sources into one clean view, so you get one place to look rather than six tabs open at once. That's usually the point where it starts to feel like a database, without the disruption of migrating to one.",
      },
    ],
    proof: {
      client: 'Punthub',
      url: 'https://punthub.co.uk/',
      line: "Punthub's prediction pipeline puts Google Sheets right at the centre of the data flow: Python pulls in 6 live data sources every evening, runs them through 7 prediction models, reconciles everything across 21 automated jobs, and writes the results straight into the sheet, no one touching it by hand, ready before Supabase and the live site sync overnight.",
      metric: '21',
      metricLabel: 'reconciliation jobs run automatically into the sheet, every night',
    },
    related: [
      { slug: '/n8n-automation-agency', label: 'n8n automation' },
      { slug: '/crm-automation', label: 'CRM automation' },
      { slug: '/ai-automation-agency', label: 'AI agents & workflows' },
    ],
  },
}

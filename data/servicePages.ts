export type ServiceFaq = { q: string; a: string }
export type ServiceProof = { client: string; url: string; line: string; metric: string; metricLabel: string }
export type ServiceRelated = { slug: string; label: string }

export type ServiceData = {
  slug: string
  serviceName: string  // schema + breadcrumb label; titles are prose, not parseable
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
    serviceName: 'n8n Automation',
    metaTitle: 'Stop Re-Typing Data Between Systems — n8n Automation UK',
    metaDescription:
      'The admin between your CRM, inbox, forms and spreadsheets stops being somebody\'s job. We design, build and host the workflows that do it instead. Fixed prices from £350, quoted before we start.',
    kicker: 'Workflow automation · UK',
    h1Lead: 'Stop re-typing the same data',
    h1Accent: 'into three systems.',
    h1Outline: 'We automate the bit in between.',
    intro:
      'If someone on your team spends their morning copying information from one system into another, that job exists only because the two systems do not talk to each other. We build the workflows that connect them — usually with n8n, an open automation platform we can host for you or hand over on your own infrastructure — so the data moves on its own and nobody has to remember to do it. Fixed price, agreed before we start, and you own the workflows outright.',
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
    serviceName: 'Zapier & Make Automation',
    metaTitle: 'Fix the Automation That Keeps Breaking — Zapier & Make UK',
    metaDescription:
      'Most of what we get asked to fix stopped working weeks ago and nobody noticed until a customer complained. We build automations that hold, and repair the ones that do not. Fixed prices from £350.',
    kicker: 'Workflow automation & repair · UK',
    h1Lead: 'The automation nobody noticed',
    h1Accent: 'had stopped working.',
    h1Outline: 'Rebuilt so it holds.',
    intro:
      'No-code automation is brilliant right up until a workflow gets slightly complicated — a step needs real logic, a filter fails silently, or the task bill jumps. We build Zapier and Make workflows properly the first time, with error handling and alerts so you hear about a problem before your customers do. We also take on the ones somebody else left held together with tape, and will tell you honestly whether it is worth repairing or rebuilding.',
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
    serviceName: 'AI Chatbot Development',
    metaTitle: 'Answer Customer Questions Without Being There — AI Chatbots UK',
    metaDescription:
      'Customers ask the same questions at all hours. A chatbot trained on your real prices and policies answers them, captures the lead, and hands anything it is unsure about to a person. Fixed prices from £750.',
    kicker: 'Customer questions, answered · UK',
    h1Lead: 'Answer customers at 9pm',
    h1Accent: 'without being awake.',
    h1Outline: 'And never invent an answer.',
    intro:
      'Most chatbots people have tried are either a rigid decision tree that gives up after two questions, or a generic AI wrapper that confidently makes things up. We build AI chatbots for UK businesses — on your website, WhatsApp or both — trained only on your own information, so they answer from your actual prices, policies and documents. When the bot is not confident, it says so and passes the conversation to a person with the full history attached, rather than guessing.',
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
    serviceName: 'WhatsApp Chatbot Development',
    metaTitle: 'Take Bookings and Questions on WhatsApp — WhatsApp Chatbots UK',
    metaDescription:
      'Customers already live in WhatsApp. Answer them, book them in and capture the lead without anyone sat watching a phone — on the official Business API, so your number does not get banned. From £750.',
    kicker: 'Bookings & enquiries on WhatsApp · UK',
    h1Lead: 'Customers message you the way',
    h1Accent: 'they message their friends.',
    h1Outline: 'Something answers, day or night.',
    intro:
      'A lot of WhatsApp automation runs through an unofficial API or a personal number with a script bolted on, which is exactly how businesses get their number banned overnight, mid-conversation with customers. We build on the official WhatsApp Business API through Twilio, properly verified, so the messaging keeps working. Behind it, the automation looks up answers, takes bookings, updates your CRM and pulls in a human only when the conversation genuinely needs one.',
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
    serviceName: 'AI Automation',
    metaTitle: 'One System That Fits Together — AI Automation Agency UK',
    metaDescription:
      'Three freelancers usually means three half-finished systems and nobody accountable when they stop talking. We design and build the whole thing as one, and it usually costs less. Fixed prices from £750.',
    kicker: 'Whole-system automation · UK',
    h1Lead: 'Three freelancers, three',
    h1Accent: 'half-finished systems.',
    h1Outline: 'Or one that fits together.',
    intro:
      'Most businesses end up hiring separately for the chatbot, the CRM integration and the reporting dashboard, then discover nobody is accountable once the three stop talking to each other. We build the whole stack ourselves — workflows, AI agents, integrations and the plain code in between — so one team understands how it fits together. We use AI where it genuinely earns its place, reading and deciding on messy information, and ordinary deterministic automation everywhere else, because it is cheaper and more predictable.',
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
    serviceName: 'CRM Automation',
    metaTitle: 'Leads That Never Slip Through the Cracks — CRM Automation UK',
    metaDescription:
      'Enquiries logged the moment they arrive, deal stages that move themselves, quotes chased without anyone remembering. Works with the CRM you already have. Fixed prices from £350.',
    kicker: 'Leads, quotes & pipeline · UK',
    h1Lead: 'Every lead logged,',
    h1Accent: 'every quote chased.',
    h1Outline: 'Without anyone remembering to.',
    intro:
      'A CRM is only useful if it is actually kept up to date, and in most businesses it is not — leads sit in an inbox for two days, deal stages get forgotten, and half the team works from memory instead of the record. That is not really a CRM problem, it is a data-entry problem. We connect the CRM you already use — HubSpot, Pipedrive, Airtable or almost anything with an API — to your forms, inbox, messaging and invoicing, so the record updates the moment something happens.',
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
    serviceName: 'Google Sheets Automation',
    metaTitle: 'Spreadsheets That Update Themselves — Google Sheets Automation UK',
    metaDescription:
      'Keep the spreadsheet your business runs on. Just stop updating it by hand: data pulled in on a schedule, rows written automatically, alerts when a number crosses a line. From £350.',
    kicker: 'Spreadsheets, kept current · UK',
    h1Lead: 'The spreadsheet updates itself',
    h1Accent: 'before you open it.',
    h1Outline: 'No copy-paste, no missed rows.',
    intro:
      'Spreadsheets are genuinely good tools — the problem is almost never the sheet, it is the person copying numbers into it every morning, or forgetting to on the one day it mattered. We automate the sheet rather than replacing it: pulling data in from your forms, inbox, CRM or an external system on a schedule, writing it into the right tab, and triggering whatever needs to happen next. It gets most businesses the benefits of a database without a migration project.',
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

  'email-deliverability': {
    slug: 'email-deliverability',
    serviceName: 'Email Deliverability',
    metaTitle: 'Get Your Email Out of the Spam Folder — SPF, DKIM & DMARC UK',
    metaDescription:
      'If your invoices, booking confirmations or campaigns are landing in spam, it is nearly always a DNS record that was never finished. We find the actual cause and fix it properly. From £350.',
    kicker: 'Email that reaches the inbox · UK',
    h1Lead: 'Your email is going',
    h1Accent: 'to the spam folder.',
    h1Outline: 'Here is why, and the fix.',
    intro:
      'Most deliverability problems are not a broken email service, they are a missing or half-finished DNS record. We audit and correct the three that matter — SPF, DKIM and DMARC — which together prove to Gmail, Outlook and the rest that a message genuinely came from you and was not tampered with. Where you are sending from a new domain we also handle the warm-up, so volume alone does not trip the spam filter while the reputation is still being built.',
    problem:
      "Most deliverability problems aren't a broken email service, they're a missing or half-finished DNS record — an SPF record that doesn't cover every tool sending on your behalf, a DKIM key that was never switched on, or a DMARC policy left on 'do nothing' because nobody wanted to risk emails bouncing. Add a brand-new domain sending a few hundred emails on day one with no sending history behind it, and providers treat you as a stranger — however careful the setup, the volume alone trips the spam filter.",
    workflows: [
      'New sending domain → SPF, DKIM and DMARC records written, verified and checked against every service that sends on your behalf',
      'Existing domain with patchy deliverability → records audited line by line to find the actual cause of the spam-folder problem before anything changes',
      "DMARC policy moved from 'none' to 'quarantine' to 'reject' in stages, with reports checked at each step so nothing genuine gets blocked",
      'New domain or IP → warmed up on a gradual sending schedule so mailbox providers build up trust before you rely on it for real volume',
      "Transactional email — receipts, password resets, booking confirmations — monitored separately from marketing sends, so one bad campaign can't take the important ones down with it",
      'Monthly deliverability check → inbox placement and DMARC reports reviewed so a problem gets caught before customers start asking why your emails end up in spam',
    ],
    from: '£350',
    faqs: [
      {
        q: 'What are SPF, DKIM and DMARC, in plain English?',
        a: "SPF is a DNS record listing which servers are allowed to send email as your domain. DKIM adds a digital signature proving the message wasn't altered in transit. DMARC tells receiving providers what to do if a message fails either check, and sends you a report when it happens. Get all three right and providers trust that mail claiming to be from you actually is.",
      },
      {
        q: 'Why are our emails landing in spam?',
        a: "Nine times out of ten it's one of a handful of things: a missing or incomplete SPF record, DKIM that was never switched on for every sending tool, a brand-new domain with no sending history, or a DMARC policy that isn't enforcing anything. We check all of them, in that order, before touching anything else.",
      },
      {
        q: 'What does domain warm-up actually involve?',
        a: "Sending a small, steadily increasing volume from a new domain or IP so mailbox providers build up a track record for it, rather than seeing a stranger suddenly send thousands of emails on day one. It usually takes two to four weeks depending on your volume, and we set the schedule so real customer email keeps working throughout.",
      },
      {
        q: 'How much does fixing email deliverability cost?',
        a: "Auditing and correcting SPF, DKIM and DMARC for a single domain starts at £350, fixed price. If you're also warming up a new domain or sending from several subdomains and platforms, we'll quote that as one fixed number after a short look at your setup.",
      },
      {
        q: 'Will changing our DMARC policy break anything?',
        a: "It can, if it's done carelessly — jumping straight to 'reject' before you know every legitimate sender is passing SPF and DKIM will bounce genuine email along with the fake stuff. We move the policy up in stages and watch the reports at each one, so nothing gets blocked that shouldn't be.",
      },
      {
        q: 'Do you fix this once, or does it need ongoing attention?',
        a: "The DNS records are a one-off fix, but deliverability drifts — a new marketing tool gets added and nobody updates the SPF record, or a spike in complaints hurts your sender reputation. A short monthly check catches that before it costs you inbox placement.",
      },
    ],
    related: [
      { slug: '/crm-automation', label: 'CRM automation' },
      { slug: '/n8n-automation-agency', label: 'n8n automation' },
      { slug: '/ai-automation-agency', label: 'AI agents & workflows' },
    ],
  },

  'stripe-payment-integration': {
    slug: 'stripe-payment-integration',
    serviceName: 'Stripe Payment Integration',
    metaTitle: 'Payments That Update Everything Else — Stripe Integration UK',
    metaDescription:
      'The checkout is the easy part. We wire up what happens after: records updated, receipts sent, access granted or revoked, failed payments chased — without anyone reconciling a spreadsheet. From £750.',
    kicker: 'Payments & subscriptions · UK',
    h1Lead: 'Money arrives.',
    h1Accent: 'Everything else updates itself.',
    h1Outline: 'Receipts, records, access.',
    intro:
      'The checkout page is the easy part; what usually goes wrong is everything downstream of it — a subscription that renews but never updates your records, a refund nobody tells the customer about, a failed payment spotted days late. We build Stripe integrations for UK businesses where the payment, the receipt, the subscription status and your own systems all move together the moment money does, including the unhappy paths: declines, disputes, retries and cancellations.',
    problem:
      "The Stripe checkout page is the easy part; what usually goes wrong is everything downstream of it — a webhook that isn't verified properly and can be spoofed, a subscription that renews in Stripe but never updates your CRM, or a refund that's issued but nobody tells the customer or adjusts their access. We've seen plenty of 'basic' Stripe integrations that only handle the happy path and quietly fall over the first time a card gets declined or a customer disputes a charge.",
    workflows: [
      'Customer subscribes or pays → Stripe webhook verified → your CRM or database updated with the subscription status in real time',
      'Card payment fails or a subscription lapses → customer notified automatically and access paused, rather than someone spotting it days later',
      'Refund or partial refund issued → receipt sent, CRM record updated, and access adjusted automatically',
      'Multiple products or tiers → checkout and billing handle upgrades, downgrades and proration without manual invoicing',
      'Marketplace or multi-tenant payments → funds split and paid out to the right account automatically, claimed race-safe so two people can never take the same payment',
      "Failed payment → automatic retry on Stripe's schedule, with a dunning email sequence so you're not chasing customers by hand",
    ],
    from: '£750',
    faqs: [
      {
        q: 'Can you set up subscriptions and recurring billing?',
        a: "Yes — tiered plans, free trials, upgrades and downgrades with proration, and cancellations that take effect at the right time rather than cutting someone off mid-period. We wire the subscription status straight into your CRM so your team can see it without logging into Stripe.",
      },
      {
        q: 'What are webhooks and why do they matter?',
        a: "A webhook is Stripe telling your system the moment something happens — a payment succeeds, a subscription renews, a card fails — so your CRM, your database and your customer's access all update automatically instead of you finding out when they complain. We verify every webhook signature properly, which a lot of quick integrations skip, so nobody can fake a payment event.",
      },
      {
        q: 'How do refunds and receipts work?',
        a: "Refunds get issued through Stripe and reflected back into your own records automatically — access revoked or adjusted, the customer notified, nobody manually updating a spreadsheet. Receipts go out the moment a payment succeeds, formatted the way you want rather than Stripe's generic default.",
      },
      {
        q: 'How much does Stripe integration cost?',
        a: 'A straightforward Stripe setup — checkout, one payment type, webhooks wired to your CRM — starts at £750, fixed price. Subscriptions, multiple products or a payout and marketplace structure are quoted after a short call, always fixed.',
      },
      {
        q: 'Do you only work with Stripe, or other payment processors too?',
        a: "Stripe is what we recommend for most UK businesses starting fresh — it's well documented and the webhooks are reliable. That said, we've built payment automation on other processors too: Marmadbir's field-service platform runs on Tranzilla rather than Stripe, for reasons specific to that business, and the same principles — payments claimed race-safe, zero double-charging, everything confirmed automatically — carried over regardless of which processor sat underneath.",
      },
      {
        q: 'Can Stripe payments trigger other automations?',
        a: "Yes — a successful payment is usually the trigger for several other things: an invoice, a CRM update, a Slack notification, access to a product or booking. We build the payment integration as part of the wider workflow, not as an isolated piece that still needs someone to join the dots by hand.",
      },
    ],
    proof: {
      client: 'Marmadbir',
      url: 'https://www.marmadbir.com/',
      line: "Marmadbir's payment flow doesn't actually run on Stripe — it runs on Tranzilla, for reasons specific to that business — but the outcome is exactly what a Stripe integration is built to deliver: jobs broadcast, workers apply, payment claimed race-safe so two people can never take the same job, client confirmed automatically. Zero payment race conditions, zero manual reconciliation.",
      metric: '0',
      metricLabel: 'payment race conditions',
    },
    related: [
      { slug: '/whatsapp-chatbot', label: 'WhatsApp chatbot' },
      { slug: '/crm-automation', label: 'CRM automation' },
      { slug: '/internal-tools-dashboard', label: 'Internal tools & dashboards' },
    ],
  },

  'internal-tools-dashboard': {
    slug: 'internal-tools-dashboard',
    serviceName: 'Internal Tools & Dashboards',
    metaTitle: 'Replace the Spreadsheet Your Business Runs On — Custom Dashboards UK',
    metaDescription:
      'When one person\'s daily routine is the only record anyone has, that is a risk. We turn it into a tool that runs itself and shows everyone the same live picture. Fixed prices from £1,500.',
    kicker: 'Internal tools & live dashboards · UK',
    h1Lead: 'Replace the spreadsheet',
    h1Accent: 'your business secretly runs on.',
    h1Outline: 'One place to look.',
    intro:
      'A lot of businesses are one person\'s daily routine away from a proper system — someone opens the same six websites every morning and copies what changed into a spreadsheet, and that spreadsheet is the only record anyone has. It works until they are on holiday, or the business outgrows what one person checking by hand can keep up with. We take that routine, run it automatically, and put the result in one live view your team can trust — built on a standard database and web stack you are not locked into.',
    problem:
      "A lot of businesses are one person's daily routine away from a proper system — someone opens the same six websites every morning and copies what's changed into a spreadsheet, and that spreadsheet is the only record anyone has. It works until that person is on holiday, or a site changes its layout, or the business grows past what one person checking by hand can keep up with. An internal tool takes that routine and runs it automatically, then shows you the result in one place instead of a shared spreadsheet nobody fully trusts.",
    workflows: [
      'Public or partner websites → scraped on a schedule with Playwright → structured data written straight into your own dashboard',
      'Live dashboard → shows the current state of your business — bookings, stock, applications, leads — refreshed automatically, not a snapshot from last week',
      "Threshold or change detected → an alert goes out by email, Slack or WhatsApp the moment something needs a person's attention",
      "Several data sources → reconciled into one internal view, so nobody's cross-referencing three systems by hand to answer a simple question",
      'Staff-facing tool → replaces a shared spreadsheet or a rigid off-the-shelf app that almost fits, built instead around how your team actually works',
      "Historical data → kept and queryable, so you can see trends over time rather than just today's snapshot",
    ],
    from: '£1,500',
    faqs: [
      {
        q: 'Should we build a custom internal tool, or buy off-the-shelf software?',
        a: "Buy first, if something already does exactly what you need — there's no point paying to rebuild a stock-management tool that's already a solved problem. Custom is worth it once you're bending an off-the-shelf tool to do something it wasn't designed for, or once the 'software' you're actually running is a spreadsheet and someone's memory. We'll tell you honestly which side of that line you're on before quoting anything.",
      },
      {
        q: 'Why Supabase and Next.js specifically?',
        a: "Supabase gives us a proper Postgres database with authentication and real-time updates out of the box, and Next.js builds a fast, straightforward dashboard on top of it — together they get you from spreadsheet to a real internal tool without a six-month build. It's also a stack you're not locked into: a standard database and a standard web app, not a proprietary platform you can't leave.",
      },
      {
        q: 'How much does an internal tool or dashboard cost?',
        a: 'A single dashboard showing live data from one or two sources starts at £1,500, fixed price. A scraping pipeline covering many sources, with alerts and historical data, is quoted after a scoping call — always fixed, and sized to what the tool actually needs to do rather than billed by the hour.',
      },
      {
        q: 'What happens if it breaks or a data source changes?',
        a: "We build in monitoring so a scraping pipeline that stops matching a site's layout gets flagged rather than silently going stale, and we offer an ongoing retainer for fixes and small changes as your needs shift. Most clients keep us on a light retainer specifically for this — data sources change, and someone needs to notice when they do.",
      },
      {
        q: 'Can you migrate our existing spreadsheet into a proper tool?',
        a: "Yes — that's often exactly how these projects start. We take what's in the spreadsheet, clean it up, and build the dashboard or database around it, so you don't lose the history you already have while gaining something that updates itself.",
      },
      {
        q: 'Who ends up using the tool day to day?',
        a: "Whoever currently does the manual version of the job — usually one or two people who go from checking things by hand every morning to glancing at a dashboard instead. We build the interface around what they actually need to see, not a generic admin panel.",
      },
    ],
    proof: {
      client: 'PlusRooms',
      url: 'https://plusrooms.co.uk/',
      line: 'PlusRooms needed daily coverage of planning applications across England — previously a full working day of one person trawling council websites by hand. We built Planscope: a Playwright scraping pipeline covering 97% of London boroughs, feeding a live dashboard with alerts, refreshed on a 24-hour cycle. Nobody has to check a council website again.',
      metric: '97%',
      metricLabel: 'London borough coverage, refreshed every 24 hours',
    },
    related: [
      { slug: '/google-sheets-automation', label: 'Google Sheets automation' },
      { slug: '/ai-automation-agency', label: 'AI agents & workflows' },
      { slug: '/n8n-automation-agency', label: 'n8n automation' },
    ],
  },
}

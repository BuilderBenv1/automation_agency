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
}

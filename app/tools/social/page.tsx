import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealWrapper from '@/components/RevealWrapper'
import SocialEngine from '@/components/SocialEngine'

export const metadata: Metadata = {
  title: 'Free AI Social Media Post Generator',
  description:
    'Turn one idea into ready-to-post drafts for LinkedIn, X, Instagram and Facebook. Free AI social media post generator built by The Automation Agency — a live demo of the content automation we build for UK businesses.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/tools/social' },
  openGraph: {
    title: 'Free AI Social Media Post Generator — The Automation Agency',
    description:
      'One idea in, platform-tuned posts out. A free tool — and a working demo of the AI content automation we build.',
    url: 'https://www.automation-agency.co.uk/tools/social',
    type: 'website',
  },
}

const steps = [
  {
    n: '01',
    title: 'Describe it once',
    body: 'A launch, a case study, a tip, a link — write it in plain English. No prompt-engineering required.',
  },
  {
    n: '02',
    title: 'Pick platforms & tone',
    body: 'LinkedIn, X, Instagram, Facebook — each one gets copy tuned to its length, format and audience.',
  },
  {
    n: '03',
    title: 'Copy and post',
    body: 'Read the drafts, tweak what you want, hit copy. Nothing is posted or stored on your behalf.',
  },
]

const faqs = [
  {
    q: 'Is this social media post generator actually free?',
    a: 'Yes. Enter a topic, pick your platforms and generate as many drafts as you reasonably need. There is a light limit to keep the API costs sane, but for real use it is free.',
  },
  {
    q: 'Which platforms does it write for?',
    a: 'LinkedIn, X (Twitter), Instagram and Facebook. Each post is tuned to that platform — X stays under 280 characters, LinkedIn opens with a scroll-stopping hook, Instagram gets a caption with hashtags, and so on.',
  },
  {
    q: 'Will it post to my accounts automatically?',
    a: 'No — this free tool only drafts. It never connects to or publishes on your accounts. If you want posts auto-drafted from your blog or product updates and queued for approval in a real pipeline, that is exactly the kind of automation we build.',
  },
  {
    q: 'How is this different from ChatGPT?',
    a: 'Under the hood it is the same idea — a large language model writing copy. The difference is the wiring around it: platform-specific rules, an anti-slop style guide, and a one-click interface. It is a small, honest demo of how we productise AI for clients.',
  },
]

export default function SocialToolPage() {
  return (
    <>
      <Nav />

      {/* HERO + TOOL */}
      <div className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 pt-32 md:pt-36 pb-16">
          <div className="max-w-[760px] mb-12">
            <div className="kicker mb-6">Free tool · Social Media Engine</div>
            <h1 className="font-display font-black text-h1-mega uppercase mb-6">
              One idea in.
              <br />
              Posts <span className="text-lime">out.</span>
            </h1>
            <p className="text-muted-dark leading-[1.7] max-w-[600px] text-[1.05rem]">
              Describe what you want to say once. Get ready-to-paste drafts for LinkedIn, X, Instagram and Facebook —
              each written for that platform, not copy-pasted across all four. It&apos;s free, and it&apos;s a live look
              at the AI content automation we build for clients.
            </p>
          </div>

          <RevealWrapper>
            <SocialEngine />
          </RevealWrapper>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-24">
          <RevealWrapper>
            <div className="kicker-cream mb-4">How it works</div>
            <h2 className="font-display font-black text-h2-band uppercase max-w-[620px] mb-12">
              Three steps, no learning curve
            </h2>
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <RevealWrapper key={s.n}>
                <div className="bg-cream-2 border border-[rgba(19,18,16,0.12)] rounded-2xl p-7 h-full">
                  <div className="font-display font-black text-3xl text-ink/25 mb-4">{s.n}</div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">{s.title}</h3>
                  <p className="text-[0.92rem] text-muted-cream leading-relaxed">{s.body}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* FROM DEMO TO REAL PIPELINE */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1180px] mx-auto px-8 md:px-14 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <RevealWrapper>
            <div>
              <div className="kicker mb-4">From demo to system</div>
              <h2 className="font-display font-black text-h2-band uppercase mb-6">
                This is the <span className="text-lime">toy</span> version
              </h2>
              <p className="text-muted-dark leading-[1.7] mb-5 text-[1.02rem]">
                A copy button is fine for a quick draft. The version we build for clients runs without anyone opening a
                browser: it watches your blog, product changelog, CRM or a simple content calendar, drafts posts in your
                voice, and drops them into a queue for one-click approval — or straight into a scheduler.
              </p>
              <p className="text-muted-dark leading-[1.7] mb-8 text-[1.02rem]">
                Same engine underneath. The difference is the plumbing around it — triggers, brand rules, approval
                steps, and the connections to the tools you already use.
              </p>
              <Link href="/#contact" className="btn-lime">
                Talk to us about your content pipeline
              </Link>
            </div>
          </RevealWrapper>
          <RevealWrapper>
            <div className="bg-ink-2 border border-[rgba(244,237,224,0.14)] rounded-2xl p-8">
              <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted-dark mb-5">
                A real pipeline looks like
              </p>
              <ol className="flex flex-col gap-4">
                {[
                  'New blog post published → trigger fires',
                  'AI drafts LinkedIn + X posts in your brand voice',
                  'Draft lands in a Slack/Notion approval queue',
                  'You approve → it schedules via Buffer, or posts direct',
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.92rem] text-cream leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-lime text-ink text-xs font-display font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {line}
                  </li>
                ))}
              </ol>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream text-ink">
        <div className="max-w-[820px] mx-auto px-8 md:px-14 py-20 md:py-24">
          <RevealWrapper>
            <div className="kicker-cream mb-4">Questions</div>
            <h2 className="font-display font-black text-h2-band uppercase mb-10">Good to know</h2>
          </RevealWrapper>
          <div className="border-t border-[rgba(20,18,16,0.12)]">
            {faqs.map((f) => (
              <RevealWrapper key={f.q}>
                <div className="py-6 border-b border-[rgba(20,18,16,0.12)]">
                  <h3 className="font-display font-bold text-[1.05rem] text-ink mb-2">{f.q}</h3>
                  <p className="text-[0.95rem] text-muted-cream leading-relaxed">{f.a}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* JSON-LD: WebApplication + FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI Social Media Post Generator',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            url: 'https://www.automation-agency.co.uk/tools/social',
            description:
              'Free AI tool that generates platform-tuned social media posts for LinkedIn, X, Instagram and Facebook from a single topic.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
            provider: { '@type': 'Organization', name: 'The Automation Agency' },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </>
  )
}

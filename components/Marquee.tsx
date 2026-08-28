const ITEMS = ['n8n','Zapier','Make','WhatsApp','Twilio','Claude','OpenAI','Supabase','Stripe','Next.js','Airtable','Python']

/**
 * `compact` is the footer-adjacent treatment: smaller, dimmer, no border.
 * The tools we use are a detail for the curious, not a headline — see
 * audit/SEO_AI_POSITIONING_REPORT.md §3.2.
 */
export default function Marquee({ compact = false }: { compact?: boolean }) {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div
      className={
        compact
          ? 'py-2 overflow-hidden opacity-55'
          : 'border-y border-[rgba(244,237,224,0.14)] py-3.5 overflow-hidden'
      }
    >
      <div className="marquee-track">
        {row.map((t, i) => (
          <span
            key={i}
            className={`font-display font-semibold text-muted-dark ${
              compact ? 'text-[0.78rem]' : 'text-[0.9rem]'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

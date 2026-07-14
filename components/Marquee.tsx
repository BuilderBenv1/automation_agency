const ITEMS = ['n8n','Zapier','Make','WhatsApp','Twilio','Claude','OpenAI','Supabase','Stripe','Next.js','Airtable','Python']

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="border-y border-[rgba(244,237,224,0.14)] py-3.5 overflow-hidden">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="font-display font-semibold text-[0.9rem] text-muted-dark">{t}</span>
        ))}
      </div>
    </div>
  )
}

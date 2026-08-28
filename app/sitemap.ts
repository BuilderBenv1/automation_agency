import { MetadataRoute } from 'next'

const BASE = 'https://www.automation-agency.co.uk'

/**
 * Static per-route dates. `new Date()` made every URL report as modified on
 * every build, which search engines discount as synthetic. Update the date on a
 * route only when its content actually changes.
 *
 * 2026-08-28 — Phase 2: four new pages, ten service pages retitled, homepage
 * repositioned. 2026-07-14 — the routes untouched since the reposition build.
 */
const PHASE_2 = '2026-08-28'
const REPOSITION = '2026-07-14'

type Entry = {
  path: string
  lastModified: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const entries: Entry[] = [
  // Core
  { path: '', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 1 },
  { path: '/audit', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.9 },
  { path: '/quick-audit', lastModified: REPOSITION, changeFrequency: 'monthly', priority: 0.8 },

  // Buyer-intent pages (Phase 2)
  { path: '/automation-cost-guide-uk', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.9 },
  { path: '/too-much-admin', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.9 },
  { path: '/business-automation-east-midlands', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/automation-for-recruitment-agencies', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },

  // Location
  { path: '/ai-automation-derbyshire', lastModified: REPOSITION, changeFrequency: 'monthly', priority: 0.7 },
  { path: '/ai-automation-chesterfield', lastModified: REPOSITION, changeFrequency: 'monthly', priority: 0.7 },
  { path: '/ai-automation-sheffield', lastModified: REPOSITION, changeFrequency: 'monthly', priority: 0.7 },
  { path: '/ai-automation-nottingham', lastModified: REPOSITION, changeFrequency: 'monthly', priority: 0.7 },

  // Services — all retitled in Phase 2
  { path: '/n8n-automation-agency', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/zapier-make-automation', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/ai-chatbot-development', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/whatsapp-chatbot', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/ai-automation-agency', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/crm-automation', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/google-sheets-automation', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/email-deliverability', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/stripe-payment-integration', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/internal-tools-dashboard', lastModified: PHASE_2, changeFrequency: 'monthly', priority: 0.8 },
]

// /privacy, /terms and /cookies are deliberately absent — all three are noindex.

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(`${lastModified}T00:00:00Z`),
    changeFrequency,
    priority,
  }))
}

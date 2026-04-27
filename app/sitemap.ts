import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: 'https://automation-agency.co.uk',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://automation-agency.co.uk/audit',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://automation-agency.co.uk/ai-automation-derbyshire',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://automation-agency.co.uk/ai-automation-chesterfield',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://automation-agency.co.uk/ai-automation-sheffield',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://automation-agency.co.uk/ai-automation-nottingham',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://automation-agency.co.uk/privacy',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: 'https://automation-agency.co.uk/terms',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}

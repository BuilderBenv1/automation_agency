import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: 'https://www.automation-agency.co.uk',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.automation-agency.co.uk/audit',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/quick-audit',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/ai-automation-derbyshire',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.automation-agency.co.uk/ai-automation-chesterfield',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.automation-agency.co.uk/ai-automation-sheffield',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.automation-agency.co.uk/ai-automation-nottingham',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.automation-agency.co.uk/n8n-automation-agency',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/zapier-make-automation',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/ai-chatbot-development',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/whatsapp-chatbot',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/ai-automation-agency',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/crm-automation',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/google-sheets-automation',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/email-deliverability',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/stripe-payment-integration',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.automation-agency.co.uk/internal-tools-dashboard',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}

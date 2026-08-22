import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      // AI/answer-engine crawlers, allowed explicitly so the site can be
      // cited by ChatGPT, Claude, Perplexity and Google's AI features.
      ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'].map(
        (userAgent) => ({ userAgent, allow: '/', disallow: '/api/' })
      ),
    ],
    sitemap: 'https://www.automation-agency.co.uk/sitemap.xml',
  }
}

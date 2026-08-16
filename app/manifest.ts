import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Automation Agency',
    short_name: 'Automation Agency',
    description:
      'n8n, Zapier & Make automation, AI agents, WhatsApp & website chatbots, CRM automation, dashboards and custom integrations for UK businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#131210',
    theme_color: '#131210',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}

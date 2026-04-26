import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enforce light mode at app level
  env: {
    SITE_URL: 'https://automation-agency.co.uk',
  },
}

export default nextConfig

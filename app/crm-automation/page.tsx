import type { Metadata } from 'next'
import ServicePage from '@/components/ServicePage'
import { servicePages } from '@/data/servicePages'

const data = servicePages['crm-automation']

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: `https://www.automation-agency.co.uk/${data.slug}` },
}

export default function Page() {
  return <ServicePage data={data} />
}

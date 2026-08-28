import type { Metadata } from 'next'

// Admin is behind session middleware, but /admin/login is reachable and was
// inheriting the root canonical — an admin login declaring the homepage as its
// canonical URL. Covers every route under /admin, login included.
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-cream">
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <h1 className="font-display font-bold text-xl mb-6">Leads</h1>
        {children}
      </div>
    </div>
  )
}

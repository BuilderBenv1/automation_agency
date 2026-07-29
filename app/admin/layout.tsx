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

import Link from 'next/link'
import { listContacts } from '@/lib/crm/contacts'
import { daysWaiting, isOverdue } from '@/lib/crm/staleness'
import { addManualContactAction } from '@/app/admin/actions'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function AdminBoard() {
  const contacts = await listContacts()
  const now = new Date()
  return (
    <div className="space-y-8">
      <table className="w-full text-sm">
        <thead className="text-muted-dark text-left">
          <tr><th className="py-1">Name</th><th>Company</th><th>Source</th><th>Status</th><th>Waiting</th></tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className={isOverdue(c, now) ? 'bg-lime/10' : ''}>
              <td className="py-2"><Link href={`/admin/contacts/${c.id}`} className="underline">{c.name}</Link></td>
              <td>{c.company ?? '—'}</td>
              <td>{c.source}</td>
              <td>{c.status}</td>
              <td>{daysWaiting(c.last_activity_at, now)}d</td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr><td colSpan={5} className="py-4 text-muted-dark">No leads yet.</td></tr>
          )}
        </tbody>
      </table>

      <form action={addManualContactAction} className="flex flex-wrap gap-2 items-end border-t border-white/10 pt-6">
        <input name="name" placeholder="Name" required className="bg-cream text-ink rounded-lg px-3 py-2 text-sm" />
        <input name="email" type="email" placeholder="Email" required className="bg-cream text-ink rounded-lg px-3 py-2 text-sm" />
        <input name="company" placeholder="Company" className="bg-cream text-ink rounded-lg px-3 py-2 text-sm" />
        <input name="message" placeholder="Note" className="bg-cream text-ink rounded-lg px-3 py-2 text-sm" />
        <button className="btn-lime">Add lead</button>
      </form>
    </div>
  )
}

import { notFound } from 'next/navigation'
import { getContact } from '@/lib/crm/contacts'
import { logReplyAction, updateStatusAction, addNoteAction } from '@/app/admin/actions'
import type { ContactStatus } from '@/lib/crm/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const STATUSES: ContactStatus[] = ['new', 'contacted', 'proposal', 'won', 'onboarding', 'active', 'lost']

export default async function ContactDetail({ params }: { params: { id: string } }) {
  const data = await getContact(params.id)
  if (!data) notFound()
  const { contact, activities } = data
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-display font-bold text-lg">{contact.name}</h2>
        <p className="text-muted-dark">
          {contact.email}{contact.company ? ` · ${contact.company}` : ''} · {contact.source}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 items-start">
        <form action={logReplyAction.bind(null, contact.id)}>
          <button className="btn-lime">Log reply / mark contacted</button>
        </form>
        <form action={updateStatusAction.bind(null, contact.id)} className="flex gap-2">
          <select name="status" defaultValue={contact.status} className="bg-cream text-ink rounded-lg px-3 py-2 text-sm">
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="rounded-lg px-3 py-2 text-sm bg-white/10 hover:bg-white/20">Set status</button>
        </form>
      </div>

      {contact.message && (
        <p className="whitespace-pre-wrap bg-ink-2 p-4 rounded-xl text-sm">{contact.message}</p>
      )}

      {contact.notes && (
        <div className="text-sm">
          <span className="text-muted-dark">Notes:</span>
          <p className="whitespace-pre-wrap">{contact.notes}</p>
        </div>
      )}
      <form action={addNoteAction.bind(null, contact.id)} className="flex gap-2 items-start">
        <textarea name="note" rows={2} placeholder="Add a note…" className="flex-1 bg-cream text-ink rounded-lg px-3 py-2 text-sm" />
        <button className="rounded-lg px-3 py-2 text-sm bg-white/10 hover:bg-white/20">Add note</button>
      </form>

      <ul className="text-sm text-muted-dark space-y-1 border-t border-white/10 pt-4">
        {activities.map((a) => (
          <li key={a.id}>
            {new Date(a.created_at).toLocaleString()} — {a.type}{a.body ? `: ${a.body}` : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}

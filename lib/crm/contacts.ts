import { sql } from '@/lib/db'
import type { Contact, Activity, ContactStatus } from './types'
import { OPEN_STATUSES } from './staleness'

type EnquiryInput = {
  name: string; email: string; company?: string | null; message?: string | null
  source: 'contact_form' | 'quick_audit'
}

export async function captureEnquiry(input: EnquiryInput): Promise<void> {
  const rows = await sql`
    insert into contacts (name, email, company, message, source, status, last_activity_at)
    values (${input.name}, ${input.email}, ${input.company ?? null},
            ${input.message ?? null}, ${input.source}, 'new', now())
    on conflict (email) do update set last_activity_at = now(), updated_at = now()
    returning id`
  const id = rows[0].id as string
  await sql`insert into activities (contact_id, type, body)
            values (${id}, 'enquiry_in', ${input.message ?? null})`
}

export async function listContacts(): Promise<Contact[]> {
  return (await sql`select * from contacts order by last_activity_at asc`) as Contact[]
}

export async function getContact(
  id: string,
): Promise<{ contact: Contact; activities: Activity[] } | null> {
  const c = (await sql`select * from contacts where id = ${id}`) as Contact[]
  if (c.length === 0) return null
  const a = (await sql`select * from activities where contact_id = ${id}
                       order by created_at desc`) as Activity[]
  return { contact: c[0], activities: a }
}

export async function getOverdueContacts(cutoffISO: string): Promise<Contact[]> {
  return (await sql`
    select * from contacts
    where status::text = any(${OPEN_STATUSES}) and last_activity_at <= ${cutoffISO}
    order by last_activity_at asc`) as Contact[]
}

export async function logReply(id: string): Promise<void> {
  await sql`update contacts set last_activity_at = now(), updated_at = now() where id = ${id}`
  await sql`insert into activities (contact_id, type) values (${id}, 'reply_logged')`
}

export async function updateStatus(id: string, status: ContactStatus): Promise<void> {
  await sql`update contacts set status = ${status}::contact_status, updated_at = now() where id = ${id}`
  await sql`insert into activities (contact_id, type, body) values (${id}, 'status_change', ${status})`
}

export async function addNote(id: string, body: string): Promise<void> {
  const rows = (await sql`select notes from contacts where id = ${id}`) as { notes: string | null }[]
  const merged = [rows[0]?.notes, body].filter(Boolean).join('\n---\n')
  await sql`update contacts set notes = ${merged}, updated_at = now() where id = ${id}`
  await sql`insert into activities (contact_id, type, body) values (${id}, 'note', ${body})`
}

export async function createManualContact(
  input: { name: string; email: string; company?: string; message?: string },
): Promise<string> {
  const rows = await sql`
    insert into contacts (name, email, company, message, source, status, last_activity_at)
    values (${input.name}, ${input.email}, ${input.company ?? null},
            ${input.message ?? null}, 'manual', 'new', now())
    returning id`
  return rows[0].id as string
}

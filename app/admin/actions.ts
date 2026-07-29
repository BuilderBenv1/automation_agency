'use server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import * as crm from '@/lib/crm/contacts'
import type { ContactStatus } from '@/lib/crm/types'
import { verifySession } from '@/lib/auth'

async function requireAdmin() {
  const ok = await verifySession(cookies().get('admin_session')?.value)
  if (!ok) throw new Error('Unauthorized')
}

export async function logReplyAction(id: string) {
  await requireAdmin()
  await crm.logReply(id)
  revalidatePath(`/admin/contacts/${id}`)
  revalidatePath('/admin')
}
export async function updateStatusAction(id: string, formData: FormData) {
  await requireAdmin()
  await crm.updateStatus(id, formData.get('status') as ContactStatus)
  revalidatePath(`/admin/contacts/${id}`)
  revalidatePath('/admin')
}
export async function addNoteAction(id: string, formData: FormData) {
  await requireAdmin()
  const body = String(formData.get('note') ?? '')
  if (body.trim()) await crm.addNote(id, body.trim())
  revalidatePath(`/admin/contacts/${id}`)
}
export async function addManualContactAction(formData: FormData) {
  await requireAdmin()
  const name = String(formData.get('name') ?? '')
  const email = String(formData.get('email') ?? '')
  if (!name || !email) return
  await crm.createManualContact({
    name,
    email,
    company: String(formData.get('company') ?? '') || undefined,
    message: String(formData.get('message') ?? '') || undefined,
  })
  revalidatePath('/admin')
}

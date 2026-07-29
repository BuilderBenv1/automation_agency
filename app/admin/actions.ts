'use server'
import { revalidatePath } from 'next/cache'
import * as crm from '@/lib/crm/contacts'
import type { ContactStatus } from '@/lib/crm/types'

export async function logReplyAction(id: string) {
  await crm.logReply(id)
  revalidatePath(`/admin/contacts/${id}`)
  revalidatePath('/admin')
}
export async function updateStatusAction(id: string, formData: FormData) {
  await crm.updateStatus(id, formData.get('status') as ContactStatus)
  revalidatePath(`/admin/contacts/${id}`)
  revalidatePath('/admin')
}
export async function addNoteAction(id: string, formData: FormData) {
  const body = String(formData.get('note') ?? '')
  if (body.trim()) await crm.addNote(id, body.trim())
  revalidatePath(`/admin/contacts/${id}`)
}
export async function addManualContactAction(formData: FormData) {
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

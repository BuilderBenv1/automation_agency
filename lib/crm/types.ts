export type ContactStatus =
  | 'new' | 'contacted' | 'proposal' | 'won' | 'onboarding' | 'active' | 'lost'
export type ContactSource = 'contact_form' | 'quick_audit' | 'manual'

export interface Contact {
  id: string
  name: string
  email: string
  company: string | null
  source: ContactSource
  message: string | null
  status: ContactStatus
  notes: string | null
  last_activity_at: string
  created_at: string
  updated_at: string
}

export type ActivityType = 'enquiry_in' | 'reply_logged' | 'note' | 'status_change'

export interface Activity {
  id: string
  contact_id: string
  type: ActivityType
  body: string | null
  created_at: string
}

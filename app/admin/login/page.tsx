'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(false)
  const router = useRouter()
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) router.push('/admin')
    else setErr(true)
  }
  return (
    <div className="min-h-screen bg-ink text-cream flex items-center justify-center p-8">
      <form onSubmit={submit} className="w-full max-w-sm">
        <h1 className="font-display font-bold text-2xl mb-4">Admin sign in</h1>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
          placeholder="Password"
          className="w-full bg-cream text-ink rounded-xl px-3.5 py-2.5 mb-3" />
        <button type="submit" className="btn-lime w-full justify-center">Sign in</button>
        {err && <p className="text-sm mt-3 text-center">Wrong password.</p>}
      </form>
    </div>
  )
}

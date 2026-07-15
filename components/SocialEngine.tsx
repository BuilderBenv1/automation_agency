'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

type Post = { platform: string; label: string; content: string }

const PLATFORMS = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'x', label: 'X (Twitter)' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'facebook', label: 'Facebook' },
]

const TONES = [
  { key: 'professional', label: 'Professional' },
  { key: 'friendly', label: 'Friendly' },
  { key: 'bold', label: 'Bold' },
  { key: 'educational', label: 'Educational' },
]

export default function SocialEngine() {
  const [topic, setTopic] = useState('')
  const [cta, setCta] = useState('')
  const [tone, setTone] = useState('professional')
  const [selected, setSelected] = useState<string[]>(['linkedin', 'x'])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const togglePlatform = (key: string) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (topic.trim().length < 8 || selected.length === 0 || status === 'loading') return
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platforms: selected, tone, cta }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setPosts(data.posts || [])
      setStatus('success')

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'social_generate', {
          platforms: selected.join(','),
          tone,
        })
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  async function copyPost(post: Post) {
    try {
      await navigator.clipboard.writeText(post.content)
      setCopied(post.platform)
      setTimeout(() => setCopied((c) => (c === post.platform ? null : c)), 1800)
    } catch {
      /* clipboard unavailable — user can select manually */
    }
  }

  const inputClass =
    'w-full bg-cream border border-[rgba(19,18,16,0.16)] rounded-xl px-3.5 py-2.5 text-ink text-sm font-sans outline-none focus:border-lime transition-colors placeholder:text-muted-cream/60'
  const labelClass = 'block text-[0.72rem] font-bold tracking-[0.06em] uppercase text-muted-cream mb-1.5'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-start">
      {/* ── FORM ── */}
      <form
        onSubmit={handleSubmit}
        className="bg-cream-2 border border-[rgba(19,18,16,0.12)] rounded-2xl p-8 md:p-10 flex flex-col gap-5"
      >
        <div>
          <h2 className="font-display font-bold text-xl text-ink mb-1">What do you want to post about?</h2>
          <p className="text-sm text-muted-cream">
            A launch, an update, a tip, a link — describe it in plain English and we&apos;ll draft the posts.
          </p>
        </div>

        <div>
          <label htmlFor="se-topic" className={labelClass}>
            Your topic
          </label>
          <textarea
            id="se-topic"
            required
            rows={5}
            maxLength={1500}
            placeholder="E.g. We just launched a WhatsApp booking bot for a Chesterfield dental practice. It handles appointment requests 24/7 and cut their front-desk phone time in half. Want to encourage local businesses to book a free automation audit."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={`${inputClass} resize-none leading-relaxed`}
          />
          <p className="text-[0.7rem] text-muted-cream mt-1 text-right">{topic.length}/1500</p>
        </div>

        <div>
          <span className={labelClass}>Platforms</span>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => {
              const on = selected.includes(p.key)
              return (
                <button
                  key={p.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => togglePlatform(p.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold font-display border transition-colors ${
                    on
                      ? 'border-lime bg-lime text-ink'
                      : 'border-[rgba(19,18,16,0.16)] text-muted-cream hover:border-ink/40 hover:text-ink'
                  }`}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <span className={labelClass}>Tone</span>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => {
              const on = tone === t.key
              return (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTone(t.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold font-display border transition-colors ${
                    on
                      ? 'border-lime bg-lime text-ink'
                      : 'border-[rgba(19,18,16,0.16)] text-muted-cream hover:border-ink/40 hover:text-ink'
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label htmlFor="se-cta" className={labelClass}>
            Call to action <span className="normal-case font-medium text-muted-cream/70">(optional)</span>
          </label>
          <input
            id="se-cta"
            type="text"
            maxLength={200}
            placeholder="E.g. Book a free automation audit at automation-agency.co.uk"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || topic.trim().length < 8 || selected.length === 0}
          className="btn-lime justify-center w-full disabled:opacity-60 disabled:cursor-not-allowed mt-1"
        >
          {status === 'loading' ? 'Writing your posts…' : posts.length ? 'Regenerate posts' : 'Generate posts'}
        </button>

        {status === 'error' && <p className="text-xs text-center text-ink font-semibold">{error}</p>}

        <p className="text-[0.77rem] text-muted-cream text-center">
          Drafts, not gospel — read them before you post. Nothing is stored or published for you.
        </p>
      </form>

      {/* ── RESULTS ── */}
      <div className="lg:sticky lg:top-24">
        {status === 'loading' && (
          <div className="flex flex-col gap-4">
            {selected.map((key) => (
              <div
                key={key}
                className="bg-ink-2 border border-[rgba(244,237,224,0.14)] rounded-2xl p-6 animate-pulse"
              >
                <div className="h-3 w-24 bg-[rgba(244,237,224,0.14)] rounded mb-4" />
                <div className="h-2.5 w-full bg-[rgba(244,237,224,0.1)] rounded mb-2.5" />
                <div className="h-2.5 w-11/12 bg-[rgba(244,237,224,0.1)] rounded mb-2.5" />
                <div className="h-2.5 w-4/5 bg-[rgba(244,237,224,0.1)] rounded" />
              </div>
            ))}
          </div>
        )}

        {status !== 'loading' && posts.length === 0 && (
          <div className="bg-ink-2 border border-dashed border-[rgba(244,237,224,0.18)] rounded-2xl p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-lime/15 text-lime flex items-center justify-center text-xl font-display font-bold mx-auto mb-4">
              ✎
            </div>
            <h3 className="font-display font-bold text-lg text-cream mb-2">Your posts will show up here</h3>
            <p className="text-sm text-muted-dark leading-relaxed max-w-xs mx-auto">
              Describe your topic, pick your platforms, and hit generate. You&apos;ll get a ready-to-paste draft for
              each one, with a copy button.
            </p>
          </div>
        )}

        {status === 'success' && posts.length > 0 && (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <article
                key={post.platform}
                className="bg-ink-2 border border-[rgba(244,237,224,0.14)] rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="kicker">{post.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[0.68rem] text-muted-dark tabular-nums">
                      {post.content.length} chars
                    </span>
                    <button
                      type="button"
                      onClick={() => copyPost(post)}
                      className="text-[0.72rem] font-bold uppercase tracking-[0.06em] text-ink bg-lime hover:bg-[#d6fb5f] rounded-md px-3 py-1.5 transition-colors"
                    >
                      {copied === post.platform ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                </div>
                <p className="text-[0.92rem] text-cream leading-relaxed whitespace-pre-wrap font-sans">
                  {post.content}
                </p>
              </article>
            ))}
            <p className="text-[0.77rem] text-muted-dark text-center px-4">
              Want this wired into your real accounts — auto-drafted from your blog, product updates or CRM and queued
              for approval?{' '}
              <a href="/#contact" className="text-cream underline decoration-lime decoration-2 underline-offset-2">
                That&apos;s the kind of thing we build.
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

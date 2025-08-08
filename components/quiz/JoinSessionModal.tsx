'use client'

import { useEffect, useState } from 'react'

type Session = { id: string; name: string }

async function fetchSessions(): Promise<Session[]> {
  // Sessions are static for now; mirror the server bootstrap
  return ['A', 'B', 'C', 'D', 'E'].map(letter => ({ id: `session-${letter}`, name: `Session ${letter}` }))
}

export function JoinSessionModal({
  isOpen,
  onJoined,
}: {
  isOpen: boolean
  onJoined: (data: { participantId: string; displayName: string; sessionId: string }) => void
}) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [displayName, setDisplayName] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSessions().then(setSessions)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const savedName = localStorage.getItem('bmf_display_name') || ''
    const savedSession = localStorage.getItem('bmf_session_id') || ''
    if (savedName) setDisplayName(savedName)
    if (savedSession) setSessionId(savedSession)
  }, [isOpen])

  const canSubmit = displayName.trim().length >= 2 && sessionId

  const join = async () => {
    if (!canSubmit) return
    setLoading(true)
    try {
      const res = await fetch('/api/workshop/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: displayName.trim(), sessionId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to join')
      localStorage.setItem('bmf_display_name', data.displayName)
      localStorage.setItem('bmf_session_id', data.sessionId)
      localStorage.setItem('bmf_participant_id', data.participantId)
      onJoined(data)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white border border-marble-200 p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-marble-900 mb-1">Join Quiz Session</h2>
        <p className="text-sm text-marble-600 mb-4">Enter your display name and select your session.</p>

        <label className="block text-sm font-medium text-marble-700 mb-1">Display name</label>
        <input
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          className="w-full border border-marble-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-greenhouse-500"
          placeholder="e.g., Jordan"
        />

        <label className="block text-sm font-medium text-marble-700 mb-1">Session</label>
        <select
          value={sessionId}
          onChange={e => setSessionId(e.target.value)}
          className="w-full border border-marble-300 rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-greenhouse-500"
        >
          <option value="" disabled>
            Select session
          </option>
          {sessions.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <button
          disabled={!canSubmit || loading}
          onClick={join}
          className="w-full bg-greenhouse-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-greenhouse-700 disabled:opacity-50"
        >
          {loading ? 'Joining…' : 'Join'}
        </button>
      </div>
    </div>
  )
}



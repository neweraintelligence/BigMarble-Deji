'use client'

import { useEffect, useState } from 'react'

type Row = { rank: number; participantId: string; score: number; total: number; avgTimeMs: number }

export function Leaderboard({ sessionId, quizKey }: { sessionId: string; quizKey: string }) {
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    let stop = false
    const load = async () => {
      const res = await fetch(`/api/leaderboard?session_id=${encodeURIComponent(sessionId)}&quiz=${encodeURIComponent(quizKey)}`)
      const data = await res.json()
      if (!stop && Array.isArray(data.leaderboard)) setRows(data.leaderboard)
    }
    load()
    const id = setInterval(load, 2500)
    return () => {
      stop = true
      clearInterval(id)
    }
  }, [sessionId, quizKey])

  return (
    <div className="bg-white rounded-xl border border-marble-200 p-6">
      <h3 className="text-lg font-semibold text-marble-900 mb-4">Leaderboard</h3>
      <div className="divide-y divide-marble-200">
        {rows.length === 0 && <div className="text-sm text-marble-500 py-2">No scores yet.</div>}
        {rows.map(r => (
          <div key={r.rank} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 text-center font-semibold">{r.rank}</div>
              <div className="text-marble-800">{r.participantId.slice(0, 6)}…</div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="font-semibold text-marble-900">{r.score}/{r.total}</span>
              <span className="text-marble-600">{r.avgTimeMs} ms</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



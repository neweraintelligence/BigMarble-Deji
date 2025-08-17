'use client'

import { useEffect, useState } from 'react'
import { getQuizLeaderboard } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthProvider'

type LeaderboardRow = { 
  rank: number; 
  participantId: string; 
  participantName: string;
  score: number; 
  total: number; 
  avgTimeMs: number;
  completedAt: string;
}

export function Leaderboard({ 
  sessionId, 
  quizKey, 
  limit = 10 
}: { 
  sessionId?: string; 
  quizKey?: string;
  limit?: number;
}) {
  const { user } = useAuth()
  const [rows, setRows] = useState<LeaderboardRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let stop = false
    
    const load = async () => {
      try {
        setLoading(true)
        const data = await getQuizLeaderboard(sessionId, quizKey, limit)
        if (!stop) {
          setRows(data)
        }
      } catch (error) {
        console.error('Error loading leaderboard:', error)
        if (!stop) {
          setRows([])
        }
      } finally {
        if (!stop) {
          setLoading(false)
        }
      }
    }

    load()
    // Refresh every 10 seconds for real-time updates
    const interval = setInterval(load, 10000)
    
    return () => {
      stop = true
      clearInterval(interval)
    }
  }, [sessionId, quizKey, limit])

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${(ms / 60000).toFixed(1)}m`
  }

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'  
    if (rank === 3) return '🥉'
    return rank.toString()
  }

  const isCurrentUser = (participantId: string) => user?.id === participantId

  return (
    <div className="bg-white rounded-xl border border-marble-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-marble-900">Leaderboard</h3>
        {loading && (
          <div className="text-xs text-marble-500">Updating...</div>
        )}
      </div>
      
      <div className="space-y-2">
        {rows.length === 0 && !loading && (
          <div className="text-sm text-marble-500 py-4 text-center">
            No quiz attempts yet. Be the first to complete a quiz!
          </div>
        )}
        
        {loading && rows.length === 0 && (
          <div className="text-sm text-marble-500 py-4 text-center">
            Loading leaderboard...
          </div>
        )}
        
        {rows.map(row => (
          <div 
            key={`${row.participantId}-${row.rank}`} 
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
              isCurrentUser(row.participantId) 
                ? 'border-greenhouse-300 bg-greenhouse-50' 
                : 'border-marble-200 hover:bg-marble-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 text-center font-semibold text-marble-700">
                {getRankDisplay(row.rank)}
              </div>
              <div>
                <div className={`font-medium ${isCurrentUser(row.participantId) ? 'text-greenhouse-800' : 'text-marble-800'}`}>
                  {row.participantName}
                  {isCurrentUser(row.participantId) && (
                    <span className="ml-2 text-xs text-greenhouse-600">(You)</span>
                  )}
                </div>
                <div className="text-xs text-marble-500">
                  {new Date(row.completedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-right">
                <div className="font-semibold text-marble-900">
                  {row.score}/{row.total}
                </div>
                <div className="text-xs text-marble-500">
                  {Math.round((row.score / row.total) * 100)}%
                </div>
              </div>
              <div className="text-right text-marble-600">
                <div className="text-xs">Time</div>
                <div>{formatTime(row.avgTimeMs)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {rows.length > 0 && (
        <div className="mt-4 pt-3 border-t border-marble-200 text-xs text-marble-500 text-center">
          Showing top {Math.min(limit, rows.length)} results • Updates every 10 seconds
        </div>
      )}
    </div>
  )
}



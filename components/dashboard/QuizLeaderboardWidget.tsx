'use client'

import { useEffect, useState } from 'react'
import { Trophy, Target, Clock, Users } from 'lucide-react'
import { getQuizLeaderboard, getUserQuizAttempts } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthProvider'

type LeaderboardRow = { 
  rank: number; 
  participantId: string; 
  participantName: string;
  score: number; 
  total: number; 
  avgTimeMs: number;
}

export function QuizLeaderboardWidget() {
  const { user } = useAuth()
  const [topPerformers, setTopPerformers] = useState<LeaderboardRow[]>([])
  const [userRank, setUserRank] = useState<number | null>(null)
  const [userStats, setUserStats] = useState<{
    totalAttempts: number;
    bestScore: number;
    averageScore: number;
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (!user) return
      
      try {
        setLoading(true)
        
        // Get top 5 performers across all quizzes
        const leaderboard = await getQuizLeaderboard(undefined, undefined, 20)
        setTopPerformers(leaderboard.slice(0, 5))
        
        // Find current user's rank
        const userPosition = leaderboard.findIndex(row => row.participantId === user.id)
        setUserRank(userPosition >= 0 ? userPosition + 1 : null)
        
        // Get user's quiz stats
        const userAttempts = await getUserQuizAttempts(user.id)
        if (userAttempts.length > 0) {
          const totalAttempts = userAttempts.length
          const scores = userAttempts.map(attempt => (attempt.score / attempt.total_questions) * 100)
          const bestScore = Math.max(...scores)
          const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
          
          setUserStats({
            totalAttempts,
            bestScore: Math.round(bestScore),
            averageScore: Math.round(averageScore)
          })
        }
        
      } catch (error) {
        console.error('Error loading quiz leaderboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user])

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'  
    if (rank === 3) return '🥉'
    return rank.toString()
  }

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${(ms / 60000).toFixed(1)}m`
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-marble-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="w-5 h-5 text-greenhouse-600" />
          <h3 className="text-lg font-semibold text-marble-900">Quiz Leaderboard</h3>
        </div>
        <div className="text-center text-marble-500 py-8">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-marble-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-greenhouse-600" />
          <h3 className="text-lg font-semibold text-marble-900">Quiz Leaderboard</h3>
        </div>
        {userRank && (
          <div className="text-sm text-marble-600">
            Your rank: #{userRank}
          </div>
        )}
      </div>

      {/* User Stats */}
      {userStats && (
        <div className="mb-6 p-4 bg-gradient-to-r from-greenhouse-50 to-blue-50 rounded-lg border border-greenhouse-200">
          <h4 className="font-medium text-marble-900 mb-3">Your Performance</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-4 h-4 text-greenhouse-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-greenhouse-700">{userStats.bestScore}%</div>
              <div className="text-xs text-marble-600">Best Score</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-4 h-4 text-blue-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-blue-700">{userStats.totalAttempts}</div>
              <div className="text-xs text-marble-600">Attempts</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-purple-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-purple-700">{userStats.averageScore}%</div>
              <div className="text-xs text-marble-600">Average</div>
            </div>
          </div>
        </div>
      )}

      {/* Top Performers */}
      <div className="space-y-3">
        <h4 className="font-medium text-marble-900">Top Performers</h4>
        
        {topPerformers.length === 0 ? (
          <div className="text-center text-marble-500 py-4">
            No quiz attempts yet. Be the first to complete a quiz!
          </div>
        ) : (
          topPerformers.map((performer, index) => (
            <div 
              key={performer.participantId} 
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                performer.participantId === user?.id 
                  ? 'border-greenhouse-300 bg-greenhouse-50' 
                  : 'border-marble-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 text-center font-semibold text-marble-700">
                  {getRankDisplay(performer.rank)}
                </div>
                <div>
                  <div className={`font-medium text-sm ${
                    performer.participantId === user?.id ? 'text-greenhouse-800' : 'text-marble-800'
                  }`}>
                    {performer.participantName}
                    {performer.participantId === user?.id && (
                      <span className="ml-1 text-xs text-greenhouse-600">(You)</span>
                    )}
                  </div>
                  <div className="text-xs text-marble-500">
                    {formatTime(performer.avgTimeMs)} avg
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-marble-900 text-sm">
                  {performer.score}/{performer.total}
                </div>
                <div className="text-xs text-marble-500">
                  {Math.round((performer.score / performer.total) * 100)}%
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-4 pt-4 border-t border-marble-200">
        <div className="text-center">
          <p className="text-sm text-marble-600 mb-2">
            Complete module quizzes to improve your ranking!
          </p>
          <button 
            onClick={() => window.location.href = '/modules'}
            className="text-sm text-greenhouse-600 hover:text-greenhouse-700 font-medium"
          >
            Go to Modules →
          </button>
        </div>
      </div>
    </div>
  )
}
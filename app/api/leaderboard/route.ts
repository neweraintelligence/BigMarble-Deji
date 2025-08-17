import { NextRequest, NextResponse } from 'next/server'
import { getQuizLeaderboard } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id') || undefined
    const quizKey = searchParams.get('quiz') || undefined
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const data = await getQuizLeaderboard(sessionId, quizKey, limit)
    return NextResponse.json({ leaderboard: data })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}



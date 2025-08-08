import { NextRequest, NextResponse } from 'next/server'
import { quizState } from '@/lib/quizState'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id') || ''
  const quizKey = searchParams.get('quiz') || ''
  if (!sessionId || !quizKey) return NextResponse.json({ error: 'Missing session_id or quiz' }, { status: 400 })
  const data = quizState.getLeaderboard(sessionId, quizKey)
  return NextResponse.json({ leaderboard: data })
}



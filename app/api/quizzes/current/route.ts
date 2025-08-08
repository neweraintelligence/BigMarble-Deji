import { NextResponse } from 'next/server'
import { quizState } from '@/lib/quizState'

// For now, return both quizzes and let the client choose which to run on the page.
export async function GET() {
  const quizzes = quizState.listQuizzes().map(q => ({ key: q.key, title: q.title, total: q.questions.length }))
  return NextResponse.json({ quizzes })
}



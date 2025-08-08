import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { quizState } from '@/lib/quizState'

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const participantId = cookieStore.get('participant_id')?.value
    if (!participantId) return NextResponse.json({ error: 'Not joined' }, { status: 401 })

    const body = await request.json()
    const { quizKey, questionId, answer, timeMs } = body || {}
    if (!quizKey || !questionId || typeof answer === 'undefined') {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const quiz = quizState.getQuiz(quizKey)
    if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    const question = quiz.questions.find(q => q.id === questionId)
    if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 })

    const isCorrect = String(answer) === String(question.correctAnswer)
    quizState.recordAnswer({
      participantId,
      quizKey,
      questionId,
      answer: String(answer),
      isCorrect,
      timeMs: typeof timeMs === 'number' ? timeMs : undefined,
      submittedAt: Date.now(),
    })

    const summary = quizState.getAttemptSummary(participantId, quizKey)
    return NextResponse.json({ ok: true, isCorrect, summary })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to submit answer' }, { status: 500 })
  }
}



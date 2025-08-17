import { NextResponse } from 'next/server'
import { quizState } from '@/lib/quizState'

// For now, return both quizzes and questions for client-side rendering
export async function GET() {
  const allQuizzes = quizState.listQuizzes()
  const quizzes = allQuizzes.map(q => ({ key: q.key, title: q.title, total: q.questions.length }))
  
  // Include questions for each quiz
  const questions: Record<string, any[]> = {}
  allQuizzes.forEach(quiz => {
    questions[quiz.key] = quiz.questions.map(q => ({
      id: q.id,
      prompt: q.prompt,
      options: q.options || [],
      correctAnswer: q.correctAnswer
    }))
  })
  
  return NextResponse.json({ quizzes, questions })
}



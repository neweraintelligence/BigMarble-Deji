'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { createQuizAttempt, recordQuizAnswer } from '@/lib/supabase'

type Quiz = { key: string; title: string; total: number }
type Question = { 
  id: string; 
  prompt: string; 
  options: string[]; 
  correctAnswer: string;
}

export function QuizRunner({
  defaultQuizKey,
  moduleId,
  sessionId,
  onFinished,
}: {
  defaultQuizKey: string
  moduleId?: string
  sessionId?: string
  onFinished?: (summary: { score: number; total: number; attemptId: string }) => void
}) {
  const { user } = useAuth()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [quizKey, setQuizKey] = useState(defaultQuizKey)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<string>('')
  const [feedback, setFeedback] = useState<null | { correct: boolean }>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<Array<{questionId: string, answer: string, isCorrect: boolean, timeMs: number}>>([])
  const [currentAttemptId, setCurrentAttemptId] = useState<string | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    fetch('/api/quizzes/current')
      .then(r => r.json())
      .then(data => {
        setQuizzes(data.quizzes || [])
        // Load questions for the current quiz
        const currentQuiz = data.quizzes?.find((q: Quiz) => q.key === defaultQuizKey)
        if (currentQuiz && data.questions) {
          setQuestions(data.questions[defaultQuizKey] || [])
        }
      })
  }, [defaultQuizKey])

  const total = useMemo(() => questions.length, [questions])
  const currentQuestion = questions[questionIndex]

  useEffect(() => {
    if (currentQuestion) {
      startTimeRef.current = Date.now()
      setSelected('')
      setFeedback(null)
    }
  }, [currentQuestion, questionIndex])

  const submit = async () => {
    if (!currentQuestion || !user) return
    
    const timeMs = Date.now() - startTimeRef.current
    const isCorrect = selected === currentQuestion.correctAnswer
    
    // Store answer locally
    const answerRecord = {
      questionId: currentQuestion.id,
      answer: selected,
      isCorrect,
      timeMs
    }
    setAnswers(prev => [...prev, answerRecord])
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }
    
    setFeedback({ correct: isCorrect })

    // Record answer to database if we have an attempt ID
    if (currentAttemptId) {
      try {
        await recordQuizAnswer({
          attemptId: currentAttemptId,
          questionId: currentQuestion.id,
          answer: selected,
          isCorrect,
          timeTakenMs: timeMs
        })
      } catch (error) {
        console.error('Error recording answer:', error)
      }
    }
  }

  const next = async () => {
    if (questionIndex + 1 >= total) {
      // Quiz finished - create attempt record
      if (user && !currentAttemptId) {
        try {
          const totalTime = answers.reduce((sum, ans) => sum + ans.timeMs, 0)
          const attempt = await createQuizAttempt({
            userId: user.id,
            quizKey,
            moduleId,
            sessionId,
            score,
            totalQuestions: total,
            timeTakenMs: totalTime
          })
          setCurrentAttemptId(attempt.id)
          onFinished?.({ score, total, attemptId: attempt.id })
        } catch (error) {
          console.error('Error creating quiz attempt:', error)
          onFinished?.({ score, total, attemptId: '' })
        }
      } else {
        onFinished?.({ score, total, attemptId: currentAttemptId || '' })
      }
      return
    }
    setQuestionIndex(q => q + 1)
  }

  if (!currentQuestion) {
    return (
      <div className="bg-white rounded-xl border border-marble-200 p-6">
        <div className="text-center text-marble-600">Loading quiz...</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-marble-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-marble-900">Quiz</h3>
        <div className="text-sm text-marble-600">{questionIndex + 1} / {total}</div>
      </div>

      <div className="space-y-4">
        <div className="text-marble-800 font-medium">{currentQuestion.prompt}</div>
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelected(index.toString())}
              disabled={feedback !== null}
              className={`p-3 rounded-lg border text-left transition-colors ${
                selected === index.toString() 
                  ? 'border-greenhouse-500 bg-greenhouse-50' 
                  : 'border-marble-300 hover:bg-marble-50'
              } ${feedback !== null ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={submit}
            disabled={!selected || feedback !== null}
            className="px-4 py-2 rounded-lg bg-greenhouse-600 text-white disabled:opacity-50 transition-opacity"
          >
            Submit
          </button>
          {feedback && (
            <span className={feedback.correct ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
              {feedback.correct ? '✓ Correct' : '✗ Incorrect'}
            </span>
          )}
          {feedback && (
            <button 
              onClick={next} 
              className="px-3 py-2 rounded-lg border border-marble-300 hover:bg-marble-50 transition-colors"
            >
              {questionIndex + 1 >= total ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4">
          <div className="w-full bg-marble-200 rounded-full h-2">
            <div 
              className="bg-greenhouse-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((questionIndex + 1) / total) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-marble-500">
            <span>Progress: {questionIndex + 1}/{total}</span>
            <span>Score: {score}/{questionIndex + (feedback ? 1 : 0)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}



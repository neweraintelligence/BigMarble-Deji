'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Quiz = { key: string; title: string; total: number }

export function QuizRunner({
  defaultQuizKey,
  onFinished,
}: {
  defaultQuizKey: string
  onFinished?: (summary: { score: number; total: number }) => void
}) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [quizKey, setQuizKey] = useState(defaultQuizKey)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [question, setQuestion] = useState<any>(null)
  const [selected, setSelected] = useState<string>('')
  const [feedback, setFeedback] = useState<null | { correct: boolean }>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    fetch('/api/quizzes/current')
      .then(r => r.json())
      .then(data => setQuizzes(data.quizzes || []))
  }, [])

  const total = useMemo(() => quizzes.find(q => q.key === quizKey)?.total || 0, [quizzes, quizKey])

  useEffect(() => {
    const load = async () => {
      // Simplified: we ask the server for quiz meta, but questions are kept server-side.
      // For running locally, we derive question ids from index: q1, q2, ...
      const id = `q${questionIndex + 1}`
      setQuestion({ id, prompt: 'Question', options: undefined })
      startTimeRef.current = Date.now()
      setSelected('')
      setFeedback(null)
    }
    load()
  }, [quizKey, questionIndex])

  const submit = async () => {
    if (!question) return
    const timeMs = Date.now() - startTimeRef.current
    const res = await fetch('/api/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizKey, questionId: question.id, answer: selected, timeMs }),
    })
    const data = await res.json()
    if (res.ok) {
      setFeedback({ correct: Boolean(data.isCorrect) })
    }
  }

  const next = () => {
    if (questionIndex + 1 >= total) {
      // finished
      onFinished?.({ score: 0, total })
      return
    }
    setQuestionIndex(q => q + 1)
  }

  return (
    <div className="bg-white rounded-xl border border-marble-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-marble-900">Quiz</h3>
        <div className="text-sm text-marble-600">{questionIndex + 1} / {total}</div>
      </div>

      {/* For demo: two options, simple input */}
      <div className="space-y-4">
        <div className="text-marble-800">Answer the question {question?.id}</div>
        <div className="grid grid-cols-2 gap-3">
          {['0', '1', '2', '3'].slice(0, 4).map(val => (
            <button
              key={val}
              onClick={() => setSelected(val)}
              className={`p-3 rounded-lg border ${selected === val ? 'border-greenhouse-500 bg-greenhouse-50' : 'border-marble-300 hover:bg-marble-50'}`}
            >
              Option {val}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={submit}
            disabled={!selected}
            className="px-4 py-2 rounded-lg bg-greenhouse-600 text-white disabled:opacity-50"
          >
            Submit
          </button>
          {feedback && (
            <span className={feedback.correct ? 'text-green-700' : 'text-red-700'}>
              {feedback.correct ? 'Correct' : 'Incorrect'}
            </span>
          )}
          {feedback && (
            <button onClick={next} className="px-3 py-2 rounded-lg border border-marble-300">Next</button>
          )}
        </div>
      </div>
    </div>
  )
}



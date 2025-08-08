'use server'

// Minimal in-memory state for sessions, participants, and quiz scoring
// This is suitable for workshops and demos; replace with Supabase for persistence later.

export type Session = {
  id: string
  name: string
  code?: string
  isActive: boolean
}

export type Participant = {
  id: string
  displayName: string
  sessionId: string
  createdAt: number
}

export type QuizQuestion = {
  id: string
  type: 'mcq' | 'truefalse' | 'numeric'
  prompt: string
  options?: string[]
  correctAnswer: string // store as string for uniformity (e.g., index for MCQ)
}

export type QuizDefinition = {
  key: string
  title: string
  questions: QuizQuestion[]
}

export type AnswerRecord = {
  participantId: string
  quizKey: string
  questionId: string
  answer: string
  isCorrect: boolean
  timeMs?: number
  submittedAt: number
}

export type AttemptSummary = {
  participantId: string
  quizKey: string
  score: number
  total: number
  avgTimeMs: number
}

class QuizState {
  private sessions: Map<string, Session>
  private participants: Map<string, Participant>
  private answers: AnswerRecord[]
  private quizzes: Map<string, QuizDefinition>

  constructor() {
    this.sessions = new Map()
    this.participants = new Map()
    this.answers = []
    this.quizzes = new Map()
    this.bootstrap()
  }

  private bootstrap() {
    // Pre-create 5 sessions A–E
    ;['A', 'B', 'C', 'D', 'E'].forEach(letter => {
      const id = `session-${letter}`
      this.sessions.set(id, { id, name: `Session ${letter}`, isActive: true })
    })

    // Two sample quizzes: end of Session 1 + a practice quiz
    const session1Final: QuizDefinition = {
      key: 'session1_final',
      title: 'Session 1 Final Quiz',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          prompt: 'Which factor is MOST critical when implementing AI tools in agriculture?',
          options: [
            'Advanced technical infrastructure',
            'Clear business objectives and ROI expectations',
            'Employee resistance to change',
            'Regulatory compliance requirements',
          ],
          correctAnswer: '1', // index as string
        },
        {
          id: 'q2',
          type: 'mcq',
          prompt: 'What is the primary goal of strategic AI evaluation?',
          options: [
            'To implement the latest technology',
            'To align AI investments with business strategy and drive measurable value',
            'To reduce operational costs',
            'To improve employee satisfaction',
          ],
          correctAnswer: '1',
        },
        {
          id: 'q3',
          type: 'truefalse',
          prompt: 'Digital twins can support energy optimization in greenhouses.',
          correctAnswer: 'true',
        },
      ],
    }

    const practice: QuizDefinition = {
      key: 'session1_practice',
      title: 'Session 1 Practice Quiz',
      questions: [
        {
          id: 'p1',
          type: 'mcq',
          prompt: 'Which metric is BEST for measuring adoption progress?',
          options: ['Code coverage', 'User engagement', 'Server uptime', 'Ticket count'],
          correctAnswer: '1',
        },
        {
          id: 'p2',
          type: 'truefalse',
          prompt: 'Stakeholder communication is not necessary in change management.',
          correctAnswer: 'false',
        },
      ],
    }

    this.quizzes.set(session1Final.key, session1Final)
    this.quizzes.set(practice.key, practice)
  }

  getSessionById(sessionId: string) {
    return this.sessions.get(sessionId)
  }

  listSessions(): Session[] {
    return Array.from(this.sessions.values())
  }

  ensureParticipant(participantId: string, displayName: string, sessionId: string): Participant {
    const existing = this.participants.get(participantId)
    if (existing) return existing
    const created: Participant = {
      id: participantId,
      displayName,
      sessionId,
      createdAt: Date.now(),
    }
    this.participants.set(participantId, created)
    return created
  }

  getParticipant(participantId: string) {
    return this.participants.get(participantId)
  }

  getQuiz(key: string) {
    return this.quizzes.get(key)
  }

  listQuizzes(): QuizDefinition[] {
    return Array.from(this.quizzes.values())
  }

  recordAnswer(record: AnswerRecord) {
    // Idempotency: only one answer per (participant, quiz, question)
    const exists = this.answers.find(
      a => a.participantId === record.participantId && a.quizKey === record.quizKey && a.questionId === record.questionId,
    )
    if (exists) return exists
    this.answers.push(record)
    return record
  }

  getAttemptSummary(participantId: string, quizKey: string): AttemptSummary {
    const quiz = this.quizzes.get(quizKey)
    const relevant = this.answers.filter(a => a.participantId === participantId && a.quizKey === quizKey)
    const score = relevant.filter(a => a.isCorrect).length
    const total = quiz ? quiz.questions.length : relevant.length
    const avgTimeMs = relevant.length
      ? Math.round(relevant.reduce((acc, a) => acc + (a.timeMs || 0), 0) / relevant.length)
      : 0
    return { participantId, quizKey, score, total, avgTimeMs }
  }

  getLeaderboard(sessionId: string, quizKey: string) {
    const participants = Array.from(this.participants.values()).filter(p => p.sessionId === sessionId)
    const rows = participants.map(p => this.getAttemptSummary(p.id, quizKey))
    // Sort by score desc, then avgTimeMs asc
    return rows
      .sort((a, b) => (b.score - a.score) || (a.avgTimeMs - b.avgTimeMs))
      .map((r, index) => ({ rank: index + 1, ...r }))
  }
}

// Singleton
const globalForQuizState = global as unknown as { __quizState?: QuizState }
export const quizState = globalForQuizState.__quizState || new QuizState()
if (!globalForQuizState.__quizState) {
  globalForQuizState.__quizState = quizState
}



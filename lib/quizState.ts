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

    // AI for Commercial Greenhouse Operations Quiz
    const session1Final: QuizDefinition = {
      key: 'session1_final',
      title: 'AI for Commercial Greenhouse Operations',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          prompt: 'What is the primary benefit of using AI sensors for climate control in greenhouses?',
          options: [
            'They eliminate the need for human staff',
            'They automatically adjust temperature, humidity, and lighting based on plant needs',
            'They make plants grow twice as fast',
            'They reduce water usage to zero'
          ],
          correctAnswer: '1',
        },
        {
          id: 'q2',
          type: 'mcq',
          prompt: 'Which type of AI technology is most commonly used to monitor plant health in greenhouses?',
          options: [
            'Voice recognition',
            'Computer vision (image analysis)',
            'Text processing',
            'Music generation'
          ],
          correctAnswer: '1',
        },
        {
          id: 'q3',
          type: 'mcq',
          prompt: 'What does "precision agriculture" mean in the context of AI greenhouse management?',
          options: [
            'Using robots to plant seeds in perfect rows',
            'Applying exact amounts of water, nutrients, and care to individual plants',
            'Growing only one type of crop',
            'Measuring greenhouse dimensions precisely'
          ],
          correctAnswer: '1',
        },
        {
          id: 'q4',
          type: 'mcq',
          prompt: 'AI-powered irrigation systems in greenhouses primarily help by:',
          options: [
            'Watering plants at exactly 6 AM every day',
            'Using the same amount of water for all plants',
            'Adjusting watering schedules based on soil moisture and plant needs',
            'Eliminating the need for drainage systems'
          ],
          correctAnswer: '2',
        },
        {
          id: 'q5',
          type: 'mcq',
          prompt: 'What is a "digital twin" in greenhouse agriculture?',
          options: [
            'Two identical greenhouse buildings',
            'A virtual computer model that simulates real greenhouse conditions',
            'A backup greenhouse in case one fails',
            'Twin plants grown side by side'
          ],
          correctAnswer: '1',
        },
        {
          id: 'q6',
          type: 'mcq',
          prompt: 'Early disease detection using AI in greenhouses typically works by:',
          options: [
            'Listening to plant sounds',
            'Analyzing leaf color and texture changes in photos',
            'Measuring plant height daily',
            'Counting the number of leaves'
          ],
          correctAnswer: '1',
        },
        {
          id: 'q7',
          type: 'mcq',
          prompt: 'What is the main advantage of AI-driven nutrient management systems?',
          options: [
            'They use only organic fertilizers',
            'They provide the same nutrients to all plants',
            'They adjust nutrient delivery based on each plant\'s specific needs',
            'They eliminate the need for soil'
          ],
          correctAnswer: '2',
        },
        {
          id: 'q8',
          type: 'mcq',
          prompt: 'Predictive analytics in greenhouse AI helps growers by:',
          options: [
            'Predicting exact harvest dates and potential issues before they occur',
            'Predicting the weather outside the greenhouse',
            'Predicting which employees will show up to work',
            'Predicting market prices for the next year'
          ],
          correctAnswer: '0',
        },
        {
          id: 'q9',
          type: 'mcq',
          prompt: 'Which of these is a realistic expectation for implementing AI in a small commercial greenhouse?',
          options: [
            '100% automated operation with no human involvement',
            'Improved efficiency and better crop monitoring with some automation',
            'Instant doubling of crop yields',
            'Complete elimination of plant diseases'
          ],
          correctAnswer: '1',
        },
        {
          id: 'q10',
          type: 'mcq',
          prompt: 'The biggest initial challenge for greenhouse operators adopting AI technology is typically:',
          options: [
            'Plants rejecting technology',
            'Learning to integrate new systems and interpret data insights',
            'AI systems being too fast',
            'Customers not wanting AI-grown produce'
          ],
          correctAnswer: '1',
        },
      ],
    }

    const practice: QuizDefinition = {
      key: 'session1_practice',
      title: 'Greenhouse AI Quick Practice',
      questions: [
        {
          id: 'p1',
          type: 'mcq',
          prompt: 'What is the main purpose of AI in modern greenhouse operations?',
          options: [
            'To replace all human workers',
            'To optimize growing conditions and improve efficiency',
            'To make plants grow in unusual colors',
            'To communicate with plants'
          ],
          correctAnswer: '1',
        },
        {
          id: 'p2',
          type: 'mcq',
          prompt: 'Which AI application helps detect plant diseases early?',
          options: [
            'Computer vision analyzing leaf images',
            'Listening to plant sounds',
            'Measuring soil temperature',
            'Counting greenhouse visitors'
          ],
          correctAnswer: '0',
        },
        {
          id: 'p3',
          type: 'mcq',
          prompt: 'Smart irrigation systems use AI to:',
          options: [
            'Water plants randomly',
            'Water only at midnight',
            'Adjust watering based on plant needs and soil conditions',
            'Use the maximum amount of water possible'
          ],
          correctAnswer: '2',
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



import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Lazy initialization of Supabase client to avoid build-time errors
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

// Export a getter function instead of the client directly
export const supabase = {
  get client() {
    return getSupabaseClient()
  }
}

// Helper functions for common database operations
export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getProfile:', error)
    return null
  }
}

export async function updateProfile(userId: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) {
  // Return mock data for demo - no database call needed
  return {
    id: userId,
    email: 'demo@bigmarblefarms.com',
    full_name: updates.full_name || 'Big Marble Farms User',
    role: updates.role || 'president',
    company_position: 'CEO',
    onboarding_completed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
}

export async function getUserProgress(userId: string) {
  // Mock data for demo
  return []
}

export async function getModulesForRole(role: string) {
  // Mock data aligned with Modules page
  const baseDate = new Date().toISOString()

  return [
    {
      id: '1',
      title: 'AI Fundamentals for Leaders',
      description: 'Understanding AI basics, terminology, and business applications',
      content: null,
      order_index: 1,
      estimated_duration: 45,
      difficulty_level: 1,
      roles: [role],
      prerequisites: null,
      is_interactive: true,
      module_type: 'foundational',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'completed' as const,
      progress: 100
    },
    {
      id: '2',
      title: 'Strategic AI Planning',
      description: 'Developing comprehensive AI strategies for your organization',
      content: null,
      order_index: 2,
      estimated_duration: 60,
      difficulty_level: 2,
      roles: [role],
      prerequisites: ['1'],
      is_interactive: true,
      module_type: 'strategic',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'completed' as const,
      progress: 100
    },
    {
      id: '3',
      title: 'AI Tools Evaluation Framework',
      description: 'Systematic approach to evaluating and selecting AI tools. Compare, score, and select.',
      content: null,
      order_index: 3,
      estimated_duration: 75,
      difficulty_level: 2,
      roles: [role],
      prerequisites: ['1', '2'],
      is_interactive: true,
      module_type: 'intermediate',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'in_progress' as const,
      progress: 65
    },
    {
      id: '4',
      title: 'Implementation Planning',
      description: 'Creating actionable implementation roadmaps for AI initiatives',
      content: null,
      order_index: 4,
      estimated_duration: 90,
      difficulty_level: 3,
      roles: [role],
      prerequisites: ['3'],
      is_interactive: true,
      module_type: 'advanced',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'not_started' as const,
      progress: 0
    },
    {
      id: '5',
      title: 'Change Management for AI',
      description: 'Leading organizational transformation during AI adoption. Drive adoption, reduce resistance.',
      content: null,
      order_index: 5,
      estimated_duration: 120,
      difficulty_level: 3,
      roles: [role],
      prerequisites: ['3'],
      is_interactive: true,
      module_type: 'advanced',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'not_started' as const,
      progress: 0
    },
    {
      id: '6',
      title: 'ROI Measurement & KPIs',
      description: 'Measuring success and ROI of AI implementations. Track impact, prove value.',
      content: null,
      order_index: 6,
      estimated_duration: 60,
      difficulty_level: 2,
      roles: [role],
      prerequisites: ['3'],
      is_interactive: true,
      module_type: 'intermediate',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'not_started' as const,
      progress: 0
    },
    {
      id: '7',
      title: 'Awareness-Driven Business',
      description: 'Mindset & opportunity framing for execs',
      content: null,
      order_index: 7,
      estimated_duration: 60,
      difficulty_level: 2,
      roles: [role],
      prerequisites: ['1', '2'],
      is_interactive: true,
      module_type: 'strategic',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'not_started' as const,
      progress: 0
    },
    {
      id: '8',
      title: 'Role-Specific Tool Implementation',
      description: 'Hands-on embed of a chosen tool into BMF data',
      content: null,
      order_index: 8,
      estimated_duration: 90,
      difficulty_level: 3,
      roles: [role],
      prerequisites: ['3'],
      is_interactive: true,
      module_type: 'practical',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'not_started' as const,
      progress: 0
    },
    {
      id: '9',
      title: 'Mapping AI to Business Strategy',
      description: 'Link AI initiatives to KPIs & competitive edge',
      content: null,
      order_index: 9,
      estimated_duration: 60,
      difficulty_level: 2,
      roles: [role],
      prerequisites: ['2', '4'],
      is_interactive: true,
      module_type: 'strategic',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'not_started' as const,
      progress: 0
    },
    {
      id: '10',
      title: 'Advanced CEA Systems Overview',
      description: 'Where digital twins, ML forecasting, etc.',
      content: null,
      order_index: 10,
      estimated_duration: 60,
      difficulty_level: 3,
      roles: [role],
      prerequisites: ['3', '5'],
      is_interactive: true,
      module_type: 'advanced',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'not_started' as const,
      progress: 0
    },
    {
      id: '11',
      title: 'Ethical Oversight & Responsible AI',
      description: 'Governance, privacy, bias checks',
      content: null,
      order_index: 11,
      estimated_duration: 30,
      difficulty_level: 2,
      roles: [role],
      prerequisites: ['1'],
      is_interactive: true,
      module_type: 'governance',
      created_at: baseDate,
      updated_at: baseDate,
      status: 'not_started' as const,
      progress: 0
    }
  ]
}

export async function startModule(userId: string, moduleId: string) {
  // Return mock data for demo - no database call needed
  return {
    id: `progress-${userId}-${moduleId}`,
    user_id: userId,
    module_id: moduleId,
    status: 'in_progress' as const,
    started_at: new Date().toISOString(),
    progress_percentage: 0,
    created_at: new Date().toISOString()
  }
}

export async function updateProgress(userId: string, moduleId: string, progressData: {
  progress_percentage?: number
  time_spent?: number
  status?: Database['public']['Enums']['module_status']
  notes?: string
}) {
  // Return mock data for demo - no database call needed
  const updates: any = {
    ...progressData,
    updated_at: new Date().toISOString()
  }
  
  if (progressData.status === 'completed') {
    updates.completed_at = new Date().toISOString()
    updates.progress_percentage = 100
  }
  
  return {
    id: `progress-${userId}-${moduleId}`,
    user_id: userId,
    module_id: moduleId,
    status: progressData.status || 'in_progress' as const,
    progress_percentage: updates.progress_percentage || 0,
    time_spent: updates.time_spent || 0,
    notes: updates.notes || null,
    started_at: new Date().toISOString(),
    updated_at: updates.updated_at,
    completed_at: updates.completed_at || null
  }
}

export async function createChatSession(userId: string, context?: any) {
  // Mock for demo
  return {
    id: 'demo-session',
    user_id: userId,
    title: 'Demo Session',
    context: context,
    created_at: new Date().toISOString()
  }
}

export async function addChatMessage(sessionId: string, role: 'user' | 'assistant', content: string, metadata?: any) {
  // Mock for demo
  return {
    id: Date.now().toString(),
    session_id: sessionId,
    role,
    content,
    metadata,
    created_at: new Date().toISOString()
  }
}

export async function getChatHistory(sessionId: string) {
  // Mock for demo
  return []
}

export async function getAIToolsForRole(role: string) {
  // Mock for demo
  return []
}

export async function saveToolSelection(userId: string, toolId: string, priorityRanking: number, notes?: string) {
  // Mock for demo
  return {
    id: 'demo-selection',
    user_id: userId,
    tool_id: toolId,
    priority_ranking: priorityRanking,
    notes,
    selected_at: new Date().toISOString()
  }
}

export async function getUserStats(userId: string) {
  try {
    // Get modules completed count
    const { data: progress } = await supabase.client
      .from('user_progress')
      .select('status')
      .eq('user_id', userId)
      .eq('status', 'completed')

    // Get quiz attempts for score calculation
    const { data: quizAttempts } = await supabase.client
      .from('quiz_attempts')
      .select('score, total_questions, time_taken_ms')
      .eq('user_id', userId)

    const modulesCompleted = progress?.length || 0
    const totalQuizScore = quizAttempts?.reduce((sum, attempt) => sum + attempt.score, 0) || 0
    const totalTimeSpent = quizAttempts?.reduce((sum, attempt) => sum + (attempt.time_taken_ms || 0), 0) || 0

    return {
      modules_completed: modulesCompleted,
      total_modules: 11,
      time_spent_minutes: Math.round(totalTimeSpent / 60000), // Convert ms to minutes
      progress_percentage: Math.round((modulesCompleted / 11) * 100),
      total_quiz_score: totalQuizScore,
      quiz_attempts: quizAttempts?.length || 0
    }
  } catch (error) {
    console.error('Error fetching user stats:', error)
    // Fallback to mock data
    return {
      modules_completed: 0,
      total_modules: 11,
      time_spent_minutes: 0,
      progress_percentage: 0,
      total_quiz_score: 0,
      quiz_attempts: 0
    }
  }
}

// Quiz-related functions
export async function createQuizAttempt(data: {
  userId: string
  quizKey: string
  moduleId?: string
  sessionId?: string
  score: number
  totalQuestions: number
  timeTakenMs?: number
}) {
  try {
    const { data: attempt, error } = await supabase.client
      .from('quiz_attempts')
      .insert({
        user_id: data.userId,
        quiz_key: data.quizKey,
        module_id: data.moduleId,
        session_id: data.sessionId,
        score: data.score,
        total_questions: data.totalQuestions,
        time_taken_ms: data.timeTakenMs,
        completed_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return attempt
  } catch (error) {
    console.error('Error creating quiz attempt:', error)
    throw error
  }
}

export async function recordQuizAnswer(data: {
  attemptId: string
  questionId: string
  answer: string
  isCorrect: boolean
  timeTakenMs?: number
}) {
  try {
    const { data: answer, error } = await supabase.client
      .from('quiz_answers')
      .insert({
        attempt_id: data.attemptId,
        question_id: data.questionId,
        answer: data.answer,
        is_correct: data.isCorrect,
        time_taken_ms: data.timeTakenMs
      })
      .select()
      .single()

    if (error) throw error
    return answer
  } catch (error) {
    console.error('Error recording quiz answer:', error)
    throw error
  }
}

export async function getQuizLeaderboard(sessionId?: string, quizKey?: string, limit = 10) {
  try {
    let query = supabase.client
      .from('quiz_attempts')
      .select(`
        id,
        user_id,
        quiz_key,
        score,
        total_questions,
        time_taken_ms,
        completed_at,
        profiles!inner(full_name, workshop_cohort)
      `)
      .order('score', { ascending: false })
      .order('time_taken_ms', { ascending: true })
      .limit(limit)

    if (sessionId) {
      query = query.eq('session_id', sessionId)
    }
    if (quizKey) {
      query = query.eq('quiz_key', quizKey)
    }

    const { data, error } = await query

    if (error) throw error

    return data?.map((attempt, index) => ({
      rank: index + 1,
      participantId: attempt.user_id,
      participantName: attempt.profiles.full_name,
      score: attempt.score,
      total: attempt.total_questions,
      avgTimeMs: attempt.time_taken_ms || 0,
      completedAt: attempt.completed_at
    })) || []
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }
}

export async function getUserQuizAttempts(userId: string, quizKey?: string) {
  try {
    let query = supabase.client
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (quizKey) {
      query = query.eq('quiz_key', quizKey)
    }

    const { data, error } = await query

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching user quiz attempts:', error)
    return []
  }
}

export async function getQuizSessions() {
  try {
    const { data, error } = await supabase.client
      .from('quiz_sessions')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching quiz sessions:', error)
    return []
  }
}

export async function createQuizSession(data: {
  sessionCode: string
  name: string
  workshopCohort?: string
}) {
  try {
    const { data: session, error } = await supabase.client
      .from('quiz_sessions')
      .insert({
        session_code: data.sessionCode,
        name: data.name,
        workshop_cohort: data.workshopCohort,
        is_active: true
      })
      .select()
      .single()

    if (error) throw error
    return session
  } catch (error) {
    console.error('Error creating quiz session:', error)
    throw error
  }
}
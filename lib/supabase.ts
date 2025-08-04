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
  // Mock data for demo
  return {
    id: userId,
    email: 'demo@bigmarblefarms.com',
    full_name: 'Demo User',
    role: 'president',
    company_position: 'CEO',
    onboarding_completed: true,
    created_at: new Date().toISOString()
  }
}

export async function updateProfile(userId: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) {
  // Return mock data for demo - no database call needed
  return {
    id: userId,
    email: 'demo@bigmarblefarms.com',
    full_name: updates.full_name || 'Demo User',
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
  // Mock stats aligned with updated module list
  return {
    modules_completed: 2,
    total_modules: 11,
    time_spent_minutes: 180,
    progress_percentage: 18
  }
}
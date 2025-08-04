export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: UserRole
          company_position: string | null
          avatar_url: string | null
          onboarding_completed: boolean
          workshop_cohort: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role: UserRole
          company_position?: string | null
          avatar_url?: string | null
          onboarding_completed?: boolean
          workshop_cohort?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: UserRole
          company_position?: string | null
          avatar_url?: string | null
          onboarding_completed?: boolean
          workshop_cohort?: string
          created_at?: string
          updated_at?: string
        }
      }
      modules: {
        Row: {
          id: string
          title: string
          description: string | null
          content: Json | null
          order_index: number
          estimated_duration: number | null
          difficulty_level: number
          roles: string[] | null
          prerequisites: string[] | null
          is_interactive: boolean
          module_type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          content?: Json | null
          order_index: number
          estimated_duration?: number | null
          difficulty_level?: number
          roles?: string[] | null
          prerequisites?: string[] | null
          is_interactive?: boolean
          module_type?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          content?: Json | null
          order_index?: number
          estimated_duration?: number | null
          difficulty_level?: number
          roles?: string[] | null
          prerequisites?: string[] | null
          is_interactive?: boolean
          module_type?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          status: ModuleStatus
          progress_percentage: number
          time_spent: number
          started_at: string | null
          completed_at: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          status?: ModuleStatus
          progress_percentage?: number
          time_spent?: number
          started_at?: string | null
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          status?: ModuleStatus
          progress_percentage?: number
          time_spent?: number
          started_at?: string | null
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          title: string | null
          context: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          context?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          context?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          role: string
          content: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: string
          content: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: string
          content?: string
          metadata?: Json | null
          created_at?: string
        }
      }
      ai_tools: {
        Row: {
          id: string
          name: string
          category: string
          description: string | null
          website_url: string | null
          pricing_model: string | null
          features: string[] | null
          suitable_for_roles: string[] | null
          complexity_level: number
          implementation_effort: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description?: string | null
          website_url?: string | null
          pricing_model?: string | null
          features?: string[] | null
          suitable_for_roles?: string[] | null
          complexity_level?: number
          implementation_effort?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string | null
          website_url?: string | null
          pricing_model?: string | null
          features?: string[] | null
          suitable_for_roles?: string[] | null
          complexity_level?: number
          implementation_effort?: string | null
          created_at?: string
        }
      }
      pilot_roadmaps: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          timeline_days: number
          budget_estimate: number | null
          success_metrics: string[] | null
          roadmap_data: Json | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          timeline_days?: number
          budget_estimate?: number | null
          success_metrics?: string[] | null
          roadmap_data?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          timeline_days?: number
          budget_estimate?: number | null
          success_metrics?: string[] | null
          roadmap_data?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'president' | 'cmo' | 'consultant' | 'ops_manager' | 'tech_lead' | 'admin'
      module_status: 'not_started' | 'in_progress' | 'completed' | 'skipped'
    }
  }
}

export type UserRole = Database['public']['Enums']['user_role']
export type ModuleStatus = Database['public']['Enums']['module_status']

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Module = Database['public']['Tables']['modules']['Row']
export type UserProgress = Database['public']['Tables']['user_progress']['Row']
export type ChatSession = Database['public']['Tables']['chat_sessions']['Row']
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row']
export type AITool = Database['public']['Tables']['ai_tools']['Row']
export type PilotRoadmap = Database['public']['Tables']['pilot_roadmaps']['Row']

// Application-specific types
export interface ModuleContent {
  sections: ModuleSection[]
  resources?: Resource[]
  prerequisites?: string[]
  learning_objectives?: string[]
}

export interface ModuleSection {
  id: string
  title: string
  type: 'text' | 'video' | 'interactive' | 'quiz' | 'exercise'
  content: string
  duration_minutes?: number
  order_index: number
}

export interface Resource {
  id: string
  title: string
  type: 'pdf' | 'video' | 'link' | 'tool'
  url: string
  description?: string
}

export interface TaskSubmission {
  task_id: string
  user_id: string
  submission_data: Json
  score?: number
  feedback?: string
}

export interface DigitalTwinParams {
  energy_efficiency: number
  automation_level: number
  staff_reduction: number
  technology_investment: number
  timeline_months: number
}

export interface DigitalTwinResults {
  cost_savings: number
  roi_percentage: number
  payback_period: number
  risk_factors: string[]
  recommendations: string[]
}

export interface AutomationWorkflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  triggers: WorkflowTrigger[]
  estimated_time_saved: number
}

export interface WorkflowStep {
  id: string
  name: string
  type: 'manual' | 'automated'
  description: string
  tools_required?: string[]
  duration_minutes?: number
}

export interface WorkflowTrigger {
  type: 'time' | 'event' | 'manual'
  schedule?: string
  event_type?: string
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  component_name: string
  completed: boolean
}

export interface DashboardStats {
  modules_completed: number
  total_modules: number
  time_spent_minutes: number
  current_streak: number
  tools_explored: number
  automation_ideas: number
}
'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { ModuleGrid } from '@/components/modules/ModuleGrid'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getModulesForRole, getUserProgress } from '@/lib/supabase'
import { Module, UserProgress } from '@/types/database'
import { BookOpen, Clock, Users, CheckCircle, Target, Zap, TrendingUp, Lightbulb, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function ModulesPage() {
  const { user, profile } = useAuth()
  const [modules, setModules] = useState<Module[]>([])
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strategy':
        return '#059669'
      case 'Tools':
        return '#0284c7'
      case 'Implementation':
        return '#d97706'
      case 'Advanced':
        return '#be123c'
      case 'Planning':
        return '#7c3aed'
      case 'Leadership':
        return '#dc2626'
      case 'Execution':
        return '#059669'
      case 'Vision':
        return '#0284c7'
      case 'Technology':
        return '#d97706'
      case 'Governance':
        return '#be123c'
      case 'Reflection':
        return '#7c3aed'
      default:
        return '#6b7280'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Strategy':
        return <Target className="w-4 h-4" />
      case 'Tools':
        return <Zap className="w-4 h-4" />
      case 'Implementation':
        return <TrendingUp className="w-4 h-4" />
      case 'Advanced':
        return <Lightbulb className="w-4 h-4" />
      case 'Planning':
        return <BookOpen className="w-4 h-4" />
      case 'Leadership':
        return <Users className="w-4 h-4" />
      case 'Execution':
        return <Calendar className="w-4 h-4" />
      case 'Vision':
        return <Target className="w-4 h-4" />
      case 'Technology':
        return <Lightbulb className="w-4 h-4" />
      case 'Governance':
        return <Users className="w-4 h-4" />
      case 'Reflection':
        return <BookOpen className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getTechnicalNote = (category: string) => {
    switch (category) {
      case 'Strategy':
        return 'Frameworks: OKR, KPI mapping, business model canvas.'
      case 'Technology':
        return 'AI methods: ML, digital twins, data pipelines.'
      case 'Governance':
        return 'Ethics, privacy, bias mitigation, compliance.'
      case 'Implementation':
        return 'Roadmapping, automation, workflow design.'
      case 'Planning':
        return 'Pilot design, metrics, stakeholder mapping.'
      case 'Leadership':
        return 'Change management, communication, team engagement.'
      case 'Vision':
        return 'Long-term planning, personal development, networks.'
      case 'Tools':
        return 'AI tool evaluation, selection, and integration.'
      case 'Advanced':
        return 'Advanced AI concepts, digital twins, simulations.'
      case 'Execution':
        return 'Implementation planning, milestone tracking.'
      case 'Reflection':
        return 'Learning synthesis, action planning, accountability.'
      default:
        return 'AI best practices, data sources, and integration.'
    }
  }

  // Enhanced module data with detailed information
  const getEnhancedModuleData = (module: any) => {
    const baseData = {
      category: 'Strategy',
      format: 'Interactive Workshop',
      learningObjectives: [
        'Understand AI applications in your domain',
        'Develop practical implementation strategies',
        'Build confidence in AI leadership'
      ],
      materials: ['Workshop Guide', 'Templates', 'Case Studies']
    }

    // Module-specific enhancements based on title/content
    if (module.title?.includes('Fundamentals')) {
      return {
        ...baseData,
        category: 'Strategy',
        learningObjectives: [
          "Understand AI's role in modern business",
          'Master AI terminology and concepts',
          'Identify AI opportunities in your industry'
        ],
        materials: ['AI Fundamentals Guide', 'Glossary', 'Industry Cases']
      }
    } else if (module.title?.includes('Strategic')) {
      return {
        ...baseData,
        category: 'Strategy',
        learningObjectives: [
          'Develop comprehensive AI strategies',
          'Align AI initiatives with business goals',
          'Create strategic roadmaps for AI adoption'
        ],
        materials: ['Strategy Canvas', 'Planning Templates', 'Roadmap Tools']
      }
    } else if (module.title?.includes('Tools')) {
      return {
        ...baseData,
        category: 'Tools',
        learningObjectives: [
          'Navigate the AI tools ecosystem',
          'Evaluate tool suitability for specific use cases',
          'Understand ROI considerations for AI investments'
        ],
        materials: ['AI Tools Catalog', 'Evaluation Framework', 'ROI Calculator']
      }
    } else if (module.title?.includes('Implementation')) {
      return {
        ...baseData,
        category: 'Implementation',
        learningObjectives: [
          'Create actionable implementation plans',
          'Identify potential roadblocks and solutions',
          'Establish success metrics and timelines'
        ],
        materials: ['Implementation Guide', 'Project Templates', 'Milestone Tracker']
      }
    } else if (module.title?.includes('Change Management')) {
      return {
        ...baseData,
        category: 'Leadership',
        learningObjectives: [
          'Understand change management principles for AI adoption',
          'Develop communication strategies for AI initiatives',
          'Build team buy-in and engagement for AI projects'
        ],
        materials: ['Change Management Playbook', 'Communication Templates', 'Team Engagement Tools']
      }
    } else if (module.title?.includes('ROI')) {
      return {
        ...baseData,
        category: 'Strategy',
        learningObjectives: [
          'Define measurable success metrics for AI projects',
          'Calculate and track ROI of AI implementations',
          'Create compelling business cases for AI investments'
        ],
        materials: ['ROI Calculator', 'Metrics Framework', 'Business Case Templates']
      }
    } else if (module.title?.includes('Awareness')) {
      return {
        ...baseData,
        category: 'Vision',
        learningObjectives: [
          'Develop AI awareness mindset',
          'Frame opportunities for executives',
          'Build strategic thinking around AI potential'
        ],
        materials: ['Executive Brief', 'Opportunity Map', 'Vision Framework']
      }
    } else if (module.title?.includes('Role-Specific')) {
      return {
        ...baseData,
        category: 'Implementation',
        format: 'Hands-on Workshop',
        learningObjectives: [
          'Implement AI tools in real business scenarios',
          'Customize solutions for specific roles',
          'Integrate AI into existing workflows'
        ],
        materials: ['Implementation Kit', 'Role Templates', 'Integration Guide']
      }
    } else if (module.title?.includes('Mapping')) {
      return {
        ...baseData,
        category: 'Strategy',
        learningObjectives: [
          'Link AI initiatives to measurable business outcomes',
          'Identify strategic opportunities for AI',
          'Prioritize projects based on impact'
        ],
        materials: ['Strategy Canvas', 'KPI Library', 'Impact Matrix']
      }
    } else if (module.title?.includes('CEA Systems')) {
      return {
        ...baseData,
        category: 'Technology',
        format: 'Tech Briefing',
        learningObjectives: [
          'Understand advanced controlled-environment agriculture systems at Big Marble Farms',
          'Explore predictive analytics for greenhouse crop steering',
          'Assess digital-twin applications for greenhouse operations'
        ],
        materials: ['CEA Tech Deck', 'Case Studies', 'Vendor Matrix']
      }
    } else if (module.title?.includes('Ethical')) {
      return {
        ...baseData,
        category: 'Governance',
        format: 'Policy Workshop',
        learningObjectives: [
          'Identify ethical risks in AI systems',
          'Define governance structures',
          'Create an AI ethics checklist'
        ],
        materials: ['Governance Framework', 'Risk Register', 'Checklist Template']
      }
    }

    return baseData
  }

  // Single training module data for greenhouse operations
  const trainingModule = {
    id: '1',
    title: 'AI for Enterprise Greenhouse Operations',
    description: 'Comprehensive overview of AI applications in high-tech greenhouse vegetable production with practical enterprise applications',
    duration_minutes: 180,
    difficulty: 'beginner',
    status: 'in_progress',
    progress: 0,
    facilitators: ['Deji Erinle', 'New Era AI Team'],
    format: 'On-site Interactive Session',
    sections: [
      {
        id: 'fundamentals',
        title: 'AI Fundamentals & Terminology',
        description: 'Basic AI concepts and key terminology for greenhouse operations',
        duration: 30,
        topics: ['Machine Learning basics', 'Computer Vision', 'Predictive Analytics', 'Digital Twins']
      },
      {
        id: 'applications', 
        title: 'Greenhouse AI Applications',
        description: 'Real-world AI applications in crop production optimization',
        duration: 45,
        topics: ['Climate Control Systems', 'Irrigation Optimization', 'Crop Modeling', 'Yield Prediction']
      },
      {
        id: 'operations',
        title: 'Operational AI Systems',
        description: 'AI systems that enhance operational efficiency across core functions',
        duration: 60,
        topics: ['Packhouse Optimization', 'Labour Planning', 'Logistics Coordination', 'Energy Management']
      },
      {
        id: 'implementation',
        title: 'Data Requirements & Implementation',
        description: 'Understanding data needs and implementation strategies',
        duration: 30,
        topics: ['Data Collection', 'System Integration', 'ROI Measurement', 'Success Metrics']
      },
      {
        id: 'discussion',
        title: 'Q&A & Discussion',
        description: 'Interactive discussion and questions specific to Big Marble Farms',
        duration: 15,
        topics: ['BMF-specific challenges', 'Implementation roadmap', 'Next steps']
      }
    ]
  }

  useEffect(() => {
    const loadModules = async () => {
      if (!user || !profile) return
      
      try {
        // Single module for simplified session
        setModules([trainingModule] as any)
        setProgress([])
      } catch (error) {
        console.error('Error loading modules:', error)
      } finally {
        setLoading(false)
      }
    }

    loadModules()
  }, [user, profile])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    )
  }

  const totalSections = trainingModule.sections.length
  const totalTime = trainingModule.duration_minutes
  const currentProgress = trainingModule.progress

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div id="slides" className="bg-gradient-to-r from-greenhouse-600 to-marble-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Course Materials</h1>
          <p className="text-lg opacity-90">
            AI for Enterprise Greenhouse Operations - Training Session 🌿
          </p>
          <div className="mt-4 flex items-center space-x-6 text-sm">
            <span>👥 Facilitators: {trainingModule.facilitators.join(', ')}</span>
            <span>⏱️ Duration: {Math.floor(totalTime / 60)}h {totalTime % 60}m</span>
            <span>📍 Format: {trainingModule.format}</span>
          </div>
        </div>

        {/* Session Overview */}
        <div id="concepts" className="bg-white rounded-xl p-8 border border-marble-200">
          <h2 className="text-2xl font-bold text-marble-900 mb-4">Training Module Overview</h2>
          <p className="text-marble-700 mb-6">{trainingModule.description}</p>
          
          {/* Progress Tracker */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-marble-700">Session Progress</span>
              <span className="text-sm text-marble-500">{currentProgress}%</span>
            </div>
            <div className="w-full bg-marble-200 rounded-full h-2">
              <div 
                className="bg-greenhouse-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>

          {/* Session Sections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-marble-900">Session Agenda</h3>
            {trainingModule.sections.map((section, index) => (
              <Link 
                key={section.id} 
                href={`/modules/${trainingModule.id}/continue`}
                className="block border border-marble-200 rounded-lg p-4 hover:bg-marble-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-greenhouse-100 text-greenhouse-800 px-2 py-1 rounded text-xs font-medium">
                        Section {index + 1}
                      </span>
                      <span className="text-sm text-marble-600">{section.duration} minutes</span>
                    </div>
                    <h4 className="font-semibold text-marble-900 mb-1">{section.title}</h4>
                    <p className="text-sm text-marble-600 mb-3">{section.description}</p>
                    
                    {/* Topics */}
                    <div className="flex flex-wrap gap-2">
                      {section.topics.map((topic, topicIndex) => (
                        <span 
                          key={topicIndex}
                          className="bg-marble-100 text-marble-700 px-2 py-1 rounded text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4">
                    <CheckCircle className={`h-6 w-6 ${
                      index < (currentProgress / 100) * totalSections 
                        ? 'text-green-500' 
                        : 'text-marble-300'
                    }`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-4">
            <Link 
              href={`/modules/${trainingModule.id}/start`} 
              className="bg-greenhouse-600 text-white px-6 py-3 rounded-lg hover:bg-greenhouse-700 transition-colors font-medium"
            >
              {currentProgress === 0 ? 'Start Training Session' : 'Continue Session'}
            </Link>
            <button className="bg-marble-100 text-marble-700 px-6 py-3 rounded-lg hover:bg-marble-200 transition-colors font-medium">
              Download Materials
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl p-6 border border-marble-200">
          <h3 className="text-lg font-semibold text-marble-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-marble-900 mb-2">New Era AI</h4>
              <p className="text-sm text-marble-600">Calgary, AB</p>
              <p className="text-sm text-marble-600">(587) 325-4289</p>
              <p className="text-sm text-marble-600">mail@neweraintelligence.com</p>
            </div>
            <div>
              <h4 className="font-medium text-marble-900 mb-2">Session Details</h4>
              <p className="text-sm text-marble-600">Materials: Permanent portal access included</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 
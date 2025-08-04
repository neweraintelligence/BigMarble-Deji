'use client'

import Link from 'next/link'
import { Clock, BookOpen, Target, Users, TrendingUp, Lightbulb, Zap, Calendar } from 'lucide-react'

interface ModuleGridProps {
  modules: any[]
  progress: any[]
}

export function ModuleGrid({ modules, progress }: ModuleGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
      category: module.category || 'Strategy',
      format: module.format || 'Interactive Workshop',
      learningObjectives: module.learning_objectives || [
        'Understand AI applications in your domain',
        'Develop practical implementation strategies',
        'Build confidence in AI leadership'
      ],
      materials: module.materials || ['Workshop Guide', 'Templates', 'Case Studies'],
      expert: module.expert || { name: 'AI Leadership Team', role: 'Workshop Facilitators' }
    }

    // Module-specific enhancements based on title/content
    if (module.title?.includes('AI Leadership')) {
      return {
        ...baseData,
        category: 'Strategy',
        learningObjectives: [
          "Understand AI's role in modern agriculture",
          'Identify leadership opportunities in AI adoption',
          'Develop strategic thinking for AI implementation'
        ],
        materials: ['AI Strategy Workbook', 'Case Studies', 'Leadership Assessment']
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
    } else if (module.title?.includes('Automation')) {
      return {
        ...baseData,
        category: 'Implementation',
        learningObjectives: [
          'Map current workflows and identify automation opportunities',
          'Design automated processes using AI tools',
          'Create implementation roadmaps for automation projects'
        ],
        materials: ['Workflow Mapping Templates', 'Automation Tools', 'Implementation Guide']
      }
    } else if (module.title?.includes('Digital Twin')) {
      return {
        ...baseData,
        category: 'Advanced',
        learningObjectives: [
          'Understand digital twin technology and applications',
          'Simulate energy optimization scenarios',
          'Analyze cost-benefit of energy efficiency improvements'
        ],
        materials: ['Digital Twin Platform', 'Energy Data Sets', 'Simulation Scenarios']
      }
    } else if (module.title?.includes('Pilot')) {
      return {
        ...baseData,
        category: 'Planning',
        learningObjectives: [
          'Define clear pilot project objectives and success metrics',
          'Design pilot project scope and timeline',
          'Identify key stakeholders and resource requirements'
        ],
        materials: ['Pilot Project Template', 'Success Metrics Framework', 'Stakeholder Map']
      }
    }

    return baseData
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {modules.map((module) => {
        const enhancedData = getEnhancedModuleData(module)
        const categoryColor = getCategoryColor(enhancedData.category)
        const CategoryIcon = getCategoryIcon(enhancedData.category)
        
                 return (
           <div key={module.id} className="bg-white rounded-xl border-2 border-marble-300 p-6 hover:border-greenhouse-300 hover:shadow-lg transition-all duration-200">
             {/* Header Section */}
             <div className="flex items-start justify-between mb-4">
               <div className="flex items-start space-x-3 flex-1">
                 <div className="mt-1" style={{ color: categoryColor }}>
                   {CategoryIcon}
                 </div>
                 <div className="flex-1">
                   <h3 className="text-lg font-semibold text-marble-900 mb-2">
                     {module.title}
                   </h3>
                   <div className="flex items-center space-x-4 text-sm text-marble-600 mb-3">
                     <div className="flex items-center">
                       <Clock className="w-4 h-4 mr-1" />
                       {module.estimated_duration} min
                     </div>
                     <div className="flex items-center">
                       <BookOpen className="w-4 h-4 mr-1" />
                       {enhancedData.format}
                     </div>
                   </div>
                 </div>
               </div>
               <div className="flex flex-col items-end space-y-2">
                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                   {module.status.replace('_', ' ')}
                 </span>
                 <span 
                   className="px-2 py-1 rounded text-xs font-medium"
                   style={{ 
                     backgroundColor: `${categoryColor}20`, 
                     color: categoryColor 
                   }}
                 >
                   {enhancedData.category}
                 </span>
               </div>
             </div>

             {/* Description */}
             <p className="text-sm text-marble-600 mb-4">
               {module.description}
             </p>

             {/* Key Learning Points - Simplified */}
             <div className="mb-4">
               <h5 className="font-semibold text-marble-900 text-sm mb-2">What You'll Learn</h5>
               <ul className="text-sm text-marble-700 space-y-1">
                 {enhancedData.learningObjectives.slice(0, 2).map((objective: string, index: number) => (
                   <li key={index} className="flex items-start">
                     <span className="mr-2 mt-1" style={{ color: categoryColor }}>•</span>
                     <span className="flex-1">{objective}</span>
                   </li>
                 ))}
                 {enhancedData.learningObjectives.length > 2 && (
                   <li className="text-xs text-marble-500 italic">
                     + {enhancedData.learningObjectives.length - 2} more learning objectives
                   </li>
                 )}
               </ul>
             </div>

             {/* Progress Bar for In Progress */}
             {module.status === 'in_progress' && (
               <div className="mb-4">
                 <div className="w-full bg-marble-200 rounded-full h-2">
                   <div 
                     className="bg-greenhouse-600 h-2 rounded-full transition-all duration-300"
                     style={{ width: `${module.progress || 40}%` }}
                   />
                 </div>
                 <p className="text-xs text-marble-500 mt-1">{module.progress || 40}% complete</p>
               </div>
             )}

             {/* Action Buttons */}
             {module.status === 'not_started' && (
               <Link href={`/modules/${module.id}/start`} className="w-full block bg-greenhouse-600 text-white text-center py-3 rounded-lg hover:bg-greenhouse-700 transition-colors font-medium">
                 Start Module
               </Link>
             )}
             {module.status === 'in_progress' && (
               <Link href={`/modules/${module.id}/continue`} className="w-full block bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                 Continue Learning
               </Link>
             )}
             {module.status === 'completed' && (
               <Link href={`/modules/${module.id}/review`} className="w-full block bg-marble-600 text-white text-center py-3 rounded-lg hover:bg-marble-700 transition-colors font-medium">
                 Review Module
               </Link>
             )}
           </div>
         )
      })}
    </div>
  )
}
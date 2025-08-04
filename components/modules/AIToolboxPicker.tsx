'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Star, Info, ExternalLink, Check, ArrowRight } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/Button'
import { getAIToolsForRole, saveToolSelection } from '@/lib/supabase'
import { AITool } from '@/types/database'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'

interface ToolCategory {
  id: string
  name: string
  description: string
  tools: AITool[]
}

export function AIToolboxPicker() {
  const { user, profile } = useAuth()
  const [categories, setCategories] = useState<ToolCategory[]>([])
  const [selectedTools, setSelectedTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<'explore' | 'prioritize' | 'complete'>('explore')

  useEffect(() => {
    if (profile) {
      loadTools()
    }
  }, [profile])

  const loadTools = async () => {
    if (!profile) return

    try {
      setLoading(true)
      // Mock tools for demo
      const tools: AITool[] = [
        {
          id: '1',
          name: 'ChatGPT',
          category: 'Content Creation',
          description: 'Advanced AI language model for text generation, editing, and analysis',
          website_url: 'https://chat.openai.com',
          pricing_model: 'Freemium',
          features: ['Text generation', 'Content editing', 'Analysis'],
          suitable_for_roles: ['president', 'cmo', 'consultant'],
          complexity_level: 1,
          implementation_effort: 'low',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Notion AI',
          category: 'Productivity',
          description: 'AI-enhanced workspace for notes, docs, and project management',
          website_url: 'https://notion.so',
          pricing_model: 'Freemium',
          features: ['Content generation', 'Summarization', 'Organization'],
          suitable_for_roles: ['president', 'ops_manager'],
          complexity_level: 1,
          implementation_effort: 'low',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Grammarly',
          category: 'Content Creation',
          description: 'AI-powered writing assistant for grammar, clarity, and tone',
          website_url: 'https://grammarly.com',
          pricing_model: 'Freemium',
          features: ['Grammar check', 'Clarity suggestions', 'Tone detection'],
          suitable_for_roles: ['manager', 'employee'],
          complexity_level: 1,
          implementation_effort: 'low',
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Zapier AI',
          category: 'Automation',
          description: 'Automate workflows and connect your favorite apps with AI triggers',
          website_url: 'https://zapier.com/ai',
          pricing_model: 'Subscription',
          features: ['Workflow automation', 'App integrations', 'AI triggers'],
          suitable_for_roles: ['manager', 'consultant'],
          complexity_level: 2,
          implementation_effort: 'medium',
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Tableau AI',
          category: 'Data Analysis',
          description: 'AI-powered data visualization and business intelligence',
          website_url: 'https://tableau.com',
          pricing_model: 'Subscription',
          features: ['Data visualization', 'Smart insights', 'Automated reports'],
          suitable_for_roles: ['president', 'manager'],
          complexity_level: 2,
          implementation_effort: 'medium',
          created_at: new Date().toISOString()
        },
        {
          id: '6',
          name: 'Otter.ai',
          category: 'Productivity',
          description: 'AI-powered meeting transcription and note-taking',
          website_url: 'https://otter.ai',
          pricing_model: 'Freemium',
          features: ['Transcription', 'Collaboration', 'Searchable notes'],
          suitable_for_roles: ['employee', 'manager'],
          complexity_level: 1,
          implementation_effort: 'low',
          created_at: new Date().toISOString()
        },
        {
          id: '7',
          name: 'Jasper AI',
          category: 'Content Creation',
          description: 'AI content platform for marketing and sales teams',
          website_url: 'https://jasper.ai',
          pricing_model: 'Subscription',
          features: ['Brand voice', 'SEO optimization', 'Template library'],
          suitable_for_roles: ['cmo', 'consultant'],
          complexity_level: 2,
          implementation_effort: 'medium',
          created_at: new Date().toISOString()
        }
      ]
      
      // Group tools by category
      const categoryMap = new Map<string, AITool[]>()
      tools?.forEach(tool => {
        if (!categoryMap.has(tool.category)) {
          categoryMap.set(tool.category, [])
        }
        categoryMap.get(tool.category)!.push(tool)
      })

      const categorizedTools: ToolCategory[] = Array.from(categoryMap.entries()).map(([category, tools]) => ({
        id: category.toLowerCase().replace(/\s+/g, '-'),
        name: category,
        description: getCategoryDescription(category),
        tools: tools.sort((a, b) => a.complexity_level - b.complexity_level)
      }))

      setCategories(categorizedTools)
    } catch (error) {
      console.error('Error loading tools:', error)
      toast.error('Failed to load AI tools')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryDescription = (category: string): string => {
    const descriptions: Record<string, string> = {
      'Content Creation': 'Tools for generating, editing, and optimizing written and visual content',
      'Data Analysis': 'Tools for analyzing data, generating insights, and creating visualizations',
      'Customer Service': 'AI-powered tools for customer support and engagement',
      'Marketing Automation': 'Tools for automating marketing campaigns and personalization',
      'Productivity': 'General productivity and workflow automation tools',
      'Communication': 'AI-enhanced communication and collaboration tools',
      'Operations': 'Tools for optimizing business operations and processes'
    }
    return descriptions[category] || 'AI tools for business enhancement'
  }

  const handleToolSelect = (tool: AITool) => {
    const isSelected = selectedTools.some(t => t.id === tool.id)
    
    if (isSelected) {
      setSelectedTools(prev => prev.filter(t => t.id !== tool.id))
    } else {
      if (selectedTools.length >= 5) {
        toast.error('You can select a maximum of 5 tools for this exercise')
        return
      }
      setSelectedTools(prev => [...prev, tool])
    }
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(selectedTools)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSelectedTools(items)
  }

  const saveSelections = async () => {
    if (!user || selectedTools.length === 0) return

    try {
      setLoading(true)
      
      for (let i = 0; i < selectedTools.length; i++) {
        await saveToolSelection(
          user.id,
          selectedTools[i].id,
          i + 1, // Priority ranking
          `Selected during AI Toolbox exercise - Priority ${i + 1}`
        )
      }
      
      toast.success('Your tool selections have been saved!')
      setStep('complete')
    } catch (error) {
      console.error('Error saving selections:', error)
      toast.error('Failed to save selections')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-greenhouse-500 mx-auto mb-4"></div>
          <p className="text-marble-600">Loading AI tools for your role...</p>
        </div>
      </div>
    )
  }

  if (step === 'complete') {
    return (
      <div className="text-center p-12">
        <div className="w-16 h-16 bg-greenhouse-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-greenhouse-600" />
        </div>
        <h3 className="text-2xl font-bold text-marble-900 mb-2">
          Great choices!
        </h3>
        <p className="text-marble-600 mb-6">
          Your AI tool selections have been saved. You can access these recommendations anytime in your dashboard.
        </p>
        <Button onClick={() => setStep('explore')} variant="outline">
          Explore More Tools
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      {step === 'explore' && (
        <div className="bg-greenhouse-50 border border-greenhouse-200 rounded-lg p-4">
          <p className="text-sm text-greenhouse-800">
            <strong>Instructions:</strong> Browse the tools below and select up to 5 that seem most relevant for your work. 
            Consider your current challenges and where AI could make the biggest impact.
          </p>
        </div>
      )}

      {/* Selected Tools Panel */}
      {selectedTools.length > 0 && (
        <div className="bg-white rounded-xl border border-marble-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-marble-900">
              Your Selected Tools ({selectedTools.length}/5)
            </h3>
            {step === 'explore' && selectedTools.length > 0 && (
              <Button 
                onClick={() => setStep('prioritize')}
                className="bg-greenhouse-600 hover:bg-greenhouse-700"
              >
                Prioritize Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {step === 'prioritize' ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="selected-tools">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                    {selectedTools.map((tool, index) => (
                      <Draggable key={tool.id} draggableId={tool.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              "bg-greenhouse-50 border border-greenhouse-200 rounded-lg p-4 cursor-move",
                              snapshot.isDragging && "shadow-lg"
                            )}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-greenhouse-600 text-white rounded-full flex items-center justify-center font-semibold">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-marble-900">{tool.name}</h4>
                                <p className="text-sm text-marble-600">{tool.description}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isSelected={true}
                  onSelect={() => handleToolSelect(tool)}
                  compact
                />
              ))}
            </div>
          )}

          {step === 'prioritize' && (
            <div className="mt-6 flex items-center justify-between">
              <Button 
                onClick={() => setStep('explore')} 
                variant="outline"
              >
                Back to Selection
              </Button>
              <Button 
                onClick={saveSelections}
                className="bg-greenhouse-600 hover:bg-greenhouse-700"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save My Toolkit'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Tool Categories */}
      {step === 'explore' && (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-marble-200 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-marble-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-marble-600">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isSelected={selectedTools.some(t => t.id === tool.id)}
                    onSelect={() => handleToolSelect(tool)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface ToolCardProps {
  tool: AITool
  isSelected: boolean
  onSelect: () => void
  compact?: boolean
}

function ToolCard({ tool, isSelected, onSelect, compact = false }: ToolCardProps) {
  const getDifficultyColor = (level: number) => {
    const colors = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-red-100 text-red-800'
    }
    return colors[level as keyof typeof colors] || colors[1]
  }

  const getDifficultyLabel = (level: number) => {
    const labels = { 1: 'Beginner', 2: 'Easy', 3: 'Intermediate', 4: 'Advanced', 5: 'Expert' }
    return labels[level as keyof typeof labels] || 'Beginner'
  }

  return (
    <div
      className={cn(
        "interactive-card border-2 transition-all duration-200",
        isSelected ? "border-greenhouse-500 bg-greenhouse-50" : "border-marble-200 hover:border-greenhouse-300",
        compact && "p-4"
      )}
      onClick={onSelect}
    >
      <div className={cn("space-y-3", compact && "space-y-2")}>
        <div className="flex items-start justify-between">
          <h4 className={cn("font-semibold text-marble-900", compact ? "text-sm" : "text-base")}>
            {tool.name}
          </h4>
          {isSelected && (
            <Check className={cn("text-greenhouse-600", compact ? "h-4 w-4" : "h-5 w-5")} />
          )}
        </div>
        
        {!compact && (
          <>
            <p className="text-sm text-marble-600 line-clamp-3">{tool.description}</p>
            
            <div className="flex items-center justify-between">
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                getDifficultyColor(tool.complexity_level)
              )}>
                {getDifficultyLabel(tool.complexity_level)}
              </span>
              
              {tool.website_url && (
                <a
                  href={tool.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-greenhouse-600 hover:text-greenhouse-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            
            {tool.features && tool.features.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-marble-700">Key Features:</p>
                <ul className="text-xs text-marble-600 space-y-0.5">
                  {tool.features.slice(0, 3).map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
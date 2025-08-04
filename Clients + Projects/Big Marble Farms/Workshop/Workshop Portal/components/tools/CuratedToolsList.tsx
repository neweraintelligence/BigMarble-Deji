'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Star, ExternalLink, Filter, Plus, Target, TrendingUp, Users, Zap, Bot, Calendar, Mail, BarChart3, MessageSquare, Camera, Search, Settings, Shield, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

interface Tool {
  id: string
  name: string
  category: string
  description: string
  website_url?: string
  pricing_model: string
  features: string[]
  suitable_for_roles: string[]
  complexity_level: number
  implementation_effort: 'low' | 'medium' | 'high'
  rating?: number
  logo?: string
  source: 'curated' | 'pilot_generated' | 'role_recommended'
  pilot_context?: string
  added_date: string
}

interface CuratedToolsListProps {
  pilotGeneratedTools?: Tool[]
}

export function CuratedToolsList({ pilotGeneratedTools = [] }: CuratedToolsListProps) {
  const { user, profile } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSource, setSelectedSource] = useState('all')
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const toolsPerPage = 6

  // Marketing-focused tools for sample data (since user is marketing manager)
  const marketingTools: Tool[] = [
    {
      id: 'jasper-ai',
      name: 'Jasper AI',
      category: 'Content Creation',
      description: 'AI-powered marketing copy and content creation platform with brand voice consistency',
      website_url: 'https://jasper.ai',
      pricing_model: 'Subscription',
      features: ['Brand Voice Training', 'SEO Optimization', 'Multi-channel Content', 'Template Library', 'Team Collaboration'],
      suitable_for_roles: ['cmo', 'marketing_manager', 'consultant'],
      complexity_level: 2,
      implementation_effort: 'medium',
      rating: 4.5,
      logo: '/jasper-logo.png',
      source: 'role_recommended',
      added_date: new Date().toISOString()
    },
    {
      id: 'hubspot-ai',
      name: 'HubSpot AI',
      category: 'Marketing Automation',
      description: 'Comprehensive marketing automation platform with AI-powered lead scoring and nurturing',
      website_url: 'https://hubspot.com',
      pricing_model: 'Freemium',
      features: ['Lead Scoring', 'Email Automation', 'Social Media Management', 'Analytics Dashboard', 'CRM Integration'],
      suitable_for_roles: ['cmo', 'marketing_manager', 'ops_manager'],
      complexity_level: 3,
      implementation_effort: 'high',
      rating: 4.6,
      source: 'role_recommended',
      added_date: new Date().toISOString()
    },
    {
      id: 'canva-ai',
      name: 'Canva AI',
      category: 'Design & Creative',
      description: 'AI-powered design platform for creating marketing materials, social media content, and presentations',
      website_url: 'https://canva.com',
      pricing_model: 'Freemium',
      features: ['AI Design Assistant', 'Brand Kit', 'Template Library', 'Social Media Scheduler', 'Team Collaboration'],
      suitable_for_roles: ['cmo', 'marketing_manager', 'consultant'],
      complexity_level: 1,
      implementation_effort: 'low',
      rating: 4.7,
      source: 'role_recommended',
      added_date: new Date().toISOString()
    },
    {
      id: 'mailchimp-ai',
      name: 'Mailchimp AI',
      category: 'Email Marketing',
      description: 'AI-enhanced email marketing platform with predictive analytics and personalization',
      website_url: 'https://mailchimp.com',
      pricing_model: 'Freemium',
      features: ['Smart Segmentation', 'Send Time Optimization', 'Content Optimizer', 'Predictive Analytics', 'A/B Testing'],
      suitable_for_roles: ['cmo', 'marketing_manager'],
      complexity_level: 2,
      implementation_effort: 'medium',
      rating: 4.4,
      source: 'role_recommended',
      added_date: new Date().toISOString()
    },
    {
      id: 'hootsuite-ai',
      name: 'Hootsuite AI',
      category: 'Social Media',
      description: 'AI-powered social media management with content suggestions and optimal posting times',
      website_url: 'https://hootsuite.com',
      pricing_model: 'Subscription',
      features: ['Content Suggestions', 'Optimal Posting Times', 'Sentiment Analysis', 'Competitor Analysis', 'ROI Tracking'],
      suitable_for_roles: ['cmo', 'marketing_manager'],
      complexity_level: 2,
      implementation_effort: 'medium',
      rating: 4.3,
      source: 'role_recommended',
      added_date: new Date().toISOString()
    },
    {
      id: 'google-analytics-ai',
      name: 'Google Analytics AI',
      category: 'Analytics',
      description: 'AI-powered web analytics with intelligent insights and predictive metrics',
      website_url: 'https://analytics.google.com',
      pricing_model: 'Freemium',
      features: ['Intelligent Insights', 'Predictive Metrics', 'Anomaly Detection', 'Attribution Modeling', 'Custom Reports'],
      suitable_for_roles: ['cmo', 'marketing_manager', 'ops_manager'],
      complexity_level: 3,
      implementation_effort: 'medium',
      rating: 4.5,
      source: 'role_recommended',
      added_date: new Date().toISOString()
    },
    {
      id: 'salesforce-marketing-ai',
      name: 'Salesforce Marketing AI',
      category: 'CRM & Sales',
      description: 'AI-powered marketing cloud with journey optimization and predictive lead scoring',
      website_url: 'https://salesforce.com/products/marketing-cloud/',
      pricing_model: 'Subscription',
      features: ['Journey Optimization', 'Predictive Lead Scoring', 'Dynamic Content', 'Cross-channel Campaigns', 'Einstein Analytics'],
      suitable_for_roles: ['cmo', 'marketing_manager', 'ops_manager'],
      complexity_level: 4,
      implementation_effort: 'high',
      rating: 4.4,
      source: 'role_recommended',
      added_date: new Date().toISOString()
    },
    {
      id: 'zapier-marketing',
      name: 'Zapier for Marketing',
      category: 'Automation',
      description: 'Marketing workflow automation connecting various tools and platforms',
      website_url: 'https://zapier.com',
      pricing_model: 'Freemium',
      features: ['Workflow Automation', '5000+ Integrations', 'Lead Routing', 'Data Sync', 'Multi-step Workflows'],
      suitable_for_roles: ['cmo', 'marketing_manager', 'ops_manager'],
      complexity_level: 2,
      implementation_effort: 'medium',
      rating: 4.6,
      source: 'role_recommended',
      added_date: new Date().toISOString()
    }
  ]

  // Curated general tools (existing featured tools from the original list)
  const generalTools: Tool[] = [
    {
      id: 'chatgpt-enterprise',
      name: 'ChatGPT Enterprise',
      category: 'Communication',
      description: 'Advanced AI assistant for business communications and analysis',
      website_url: 'https://openai.com/enterprise',
      pricing_model: '$20/user/month',
      features: ['Custom GPTs', 'Enhanced Security', 'Admin Controls'],
      suitable_for_roles: ['president', 'cmo', 'consultant', 'ops_manager', 'marketing_manager'],
      complexity_level: 1,
      implementation_effort: 'low',
      rating: 4.8,
      logo: '/chatgpt-logo.jpg',
      source: 'curated',
      added_date: new Date().toISOString()
    },
    {
      id: 'tableau-ai',
      name: 'Tableau AI',
      category: 'Analytics',
      description: 'AI-powered data visualization and business intelligence',
      website_url: 'https://www.tableau.com/solutions/artificial-intelligence',
      pricing_model: '$75/user/month',
      features: ['Smart Insights', 'Natural Language Queries', 'Automated Reports'],
      suitable_for_roles: ['cmo', 'ops_manager', 'marketing_manager'],
      complexity_level: 3,
      implementation_effort: 'medium',
      rating: 4.6,
      logo: '/tableau-logo.png',
      source: 'curated',
      added_date: new Date().toISOString()
    },
    {
      id: 'zapier-ai-curated',
      name: 'Zapier AI',
      category: 'Automation',
      description: 'Intelligent workflow automation with AI-driven triggers',
      website_url: 'https://zapier.com/ai',
      pricing_model: '$19.99/month',
      features: ['AI Workflows', '5000+ Integrations', 'Smart Triggers'],
      suitable_for_roles: ['ops_manager', 'marketing_manager'],
      complexity_level: 2,
      implementation_effort: 'medium',
      rating: 4.7,
      logo: '/zapier-logo.png',
      source: 'curated',
      added_date: new Date().toISOString()
    },
    {
      id: 'notebooklm',
      name: 'NotebookLM',
      category: 'Research & Analysis',
      description: 'AI-powered research and writing tool for summarizing and extracting information from complex sources',
      website_url: 'https://notebooklm.google.com',
      pricing_model: 'Free',
      features: ['Source Analysis', 'Smart Summaries', 'Interactive Chat'],
      suitable_for_roles: ['consultant', 'marketing_manager', 'cmo'],
      complexity_level: 2,
      implementation_effort: 'low',
      rating: 4.7,
      logo: '/notebooklm-logo.png',
      source: 'curated',
      added_date: new Date().toISOString()
    },
    {
      id: 'salesforce-einstein',
      name: 'Salesforce Einstein',
      category: 'CRM & Sales',
      description: 'AI-powered CRM with predictive analytics and automation',
      website_url: 'https://www.salesforce.com/products/einstein/',
      pricing_model: '$25/user/month',
      features: ['Lead Scoring', 'Opportunity Insights', 'Automated Actions'],
      suitable_for_roles: ['cmo', 'ops_manager'],
      complexity_level: 3,
      implementation_effort: 'high',
      rating: 4.6,
      logo: '/salesforce-logo.png',
      source: 'curated',
      added_date: new Date().toISOString()
    },
    {
      id: 'apollo-ai',
      name: 'Apollo AI',
      category: 'Marketing',
      description: 'AI-powered sales engagement and intelligence platform',
      website_url: 'https://www.apollo.io/',
      pricing_model: '$59/user/month',
      features: ['Lead Intelligence', 'Email Automation', 'Sales Analytics'],
      suitable_for_roles: ['cmo', 'marketing_manager'],
      complexity_level: 2,
      implementation_effort: 'medium',
      rating: 4.7,
      logo: '/apollo-logo.png',
      source: 'curated',
      added_date: new Date().toISOString()
    }
  ]

  useEffect(() => {
    // Combine all tools
    const allTools = [...marketingTools, ...generalTools, ...pilotGeneratedTools]
    setTools(allTools)
    setLoading(false)
  }, [pilotGeneratedTools])

  const categories = [
    { id: 'all', name: 'All Categories', count: tools.length },
    { id: 'Content Creation', name: 'Content Creation', count: tools.filter(t => t.category === 'Content Creation').length },
    { id: 'Marketing Automation', name: 'Marketing Automation', count: tools.filter(t => t.category === 'Marketing Automation').length },
    { id: 'Design & Creative', name: 'Design & Creative', count: tools.filter(t => t.category === 'Design & Creative').length },
    { id: 'Email Marketing', name: 'Email Marketing', count: tools.filter(t => t.category === 'Email Marketing').length },
    { id: 'Social Media', name: 'Social Media', count: tools.filter(t => t.category === 'Social Media').length },
    { id: 'Analytics', name: 'Analytics', count: tools.filter(t => t.category === 'Analytics').length },
    { id: 'Automation', name: 'Automation', count: tools.filter(t => t.category === 'Automation').length },
    { id: 'Communication', name: 'Communication', count: tools.filter(t => t.category === 'Communication').length },
    { id: 'Marketing', name: 'Marketing', count: tools.filter(t => t.category === 'Marketing').length },
    { id: 'CRM & Sales', name: 'CRM & Sales', count: tools.filter(t => t.category === 'CRM & Sales').length },
    { id: 'Research & Analysis', name: 'Research & Analysis', count: tools.filter(t => t.category === 'Research & Analysis').length }
  ]

  const sources = [
    { id: 'all', name: 'All Sources', count: tools.length },
    { id: 'role_recommended', name: 'Role Recommended', count: tools.filter(t => t.source === 'role_recommended').length },
          { id: 'pilot_generated', name: 'From Workflow Planner', count: tools.filter(t => t.source === 'pilot_generated').length },
    { id: 'curated', name: 'Curated', count: tools.filter(t => t.source === 'curated').length }
  ]

  const filteredTools = tools.filter(tool => {
    const categoryMatch = selectedCategory === 'all' || tool.category === selectedCategory
    const sourceMatch = selectedSource === 'all' || tool.source === selectedSource
    const roleMatch = profile?.role ? tool.suitable_for_roles.includes(profile.role) || tool.suitable_for_roles.includes('marketing_manager') : true
    return categoryMatch && sourceMatch && roleMatch
  })

  // Calculate pagination
  const indexOfLastTool = currentPage * toolsPerPage
  const indexOfFirstTool = indexOfLastTool - toolsPerPage
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool)
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedSource])

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'Content Creation': Lightbulb,
      'Marketing Automation': Bot,
      'Design & Creative': Camera,
      'Email Marketing': Mail,
      'Social Media': MessageSquare,
      'Analytics': BarChart3,
      'Automation': Zap,
      'Communication': Users,
      'Productivity': Settings,
      'CRM & Sales': TrendingUp
    }
    return iconMap[category] || Bot
  }

  const getSourceBadge = (source: string, pilotContext?: string) => {
    switch (source) {
      case 'pilot_generated':
        return (
          <div className="flex items-center space-x-1">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">From Pilot</span>
            {pilotContext && (
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">{pilotContext}</span>
            )}
          </div>
        )
      case 'role_recommended':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Recommended</span>
      case 'curated':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Curated</span>
      default:
        return null
    }
  }

  const getComplexityColor = (level: number) => {
    switch (level) {
      case 1: return 'text-green-600'
      case 2: return 'text-yellow-600'
      case 3: return 'text-orange-600'
      case 4: return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (loading) {
    return <div className="p-6 text-center">Loading tools...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-marble-600">Personalized AI tools for Demo User in Greenhouse operations</p>
        </div>
        <div className="text-sm text-marble-500">
          {filteredTools.length} tools available • Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-marble-500" />
          <span className="text-sm font-medium text-marble-700">Filter by:</span>
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-marble-300 rounded-lg text-sm focus:ring-2 focus:ring-greenhouse-500"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.count})
            </option>
          ))}
        </select>

        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="px-3 py-2 border border-marble-300 rounded-lg text-sm focus:ring-2 focus:ring-greenhouse-500"
        >
          {sources.map(source => (
            <option key={source.id} value={source.id}>
              {source.name} ({source.count})
            </option>
          ))}
        </select>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTools.map((tool) => {
          const CategoryIcon = getCategoryIcon(tool.category)
          
          return (
            <div key={tool.id} className="bg-white border border-marble-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {tool.logo ? (
                    <Image src={tool.logo} alt={tool.name} width={32} height={32} className="rounded" />
                  ) : (
                    <div className="w-8 h-8 bg-greenhouse-100 rounded-lg flex items-center justify-center">
                      <CategoryIcon className="h-4 w-4 text-greenhouse-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-marble-900">{tool.name}</h3>
                    <p className="text-xs text-marble-500">{tool.category}</p>
                  </div>
                </div>
                {tool.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-marble-600">{tool.rating}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-marble-600 mb-4">{tool.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-marble-500">Complexity:</span>
                  <span className={`font-medium ${getComplexityColor(tool.complexity_level)}`}>
                    Level {tool.complexity_level}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-marble-500">Implementation:</span>
                  <span className={`font-medium ${getEffortColor(tool.implementation_effort)}`}>
                    {tool.implementation_effort}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-marble-500">Pricing:</span>
                  <span className="font-medium text-marble-700">{tool.pricing_model}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {tool.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-marble-100 text-marble-700 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                  {tool.features.length > 3 && (
                    <span className="px-2 py-1 bg-marble-100 text-marble-700 text-xs rounded">
                      +{tool.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                {getSourceBadge(tool.source, tool.pilot_context)}
                {tool.website_url && (
                  <a
                    href={tool.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-greenhouse-600 hover:text-greenhouse-700 text-sm"
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-marble-600 bg-white border border-marble-300 rounded-lg hover:bg-marble-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-marble-600">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-marble-600 bg-white border border-marble-300 rounded-lg hover:bg-marble-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <Bot className="h-12 w-12 text-marble-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-marble-900 mb-2">No tools found</h3>
          <p className="text-marble-600">Try adjusting your filters or create a pilot to get personalized tool recommendations.</p>
        </div>
      )}
    </div>
  )
} 
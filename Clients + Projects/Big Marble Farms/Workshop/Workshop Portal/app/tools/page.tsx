'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { CuratedToolsList } from '@/components/tools/CuratedToolsList'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EnterpriseSolutions } from '../../components/tools/EnterpriseSolutions'
import { Bot, Search, Star, TrendingUp, Users, Zap } from 'lucide-react'
import Image from 'next/image'

export default function ToolsPage() {
  const { user, profile } = useAuth()
  const [loading, setLoading] = useState(true)
  const [pilotGeneratedTools, setPilotGeneratedTools] = useState<any[]>([])

  useEffect(() => {
    // Load any pilot-generated tools from localStorage
    const savedPilotTools = localStorage.getItem('pilotGeneratedTools')
    if (savedPilotTools) {
      try {
        const tools = JSON.parse(savedPilotTools)
        setPilotGeneratedTools(tools)
      } catch (error) {
        console.error('Error loading pilot tools:', error)
      }
    }
    
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-greenhouse-600 to-marble-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">AI Tools Evaluation</h1>
          <p className="text-lg opacity-90">
            Discover, evaluate, and select the best AI tools for greenhouse operations 🌱
          </p>
        </div>

        {/* Enterprise AI Solutions */}
        <div id="advanced-solutions">
          <EnterpriseSolutions />
        </div>

        {/* Your Curated Tools */}
        <div id="curated-tools" className="bg-white rounded-xl border border-marble-200 overflow-hidden">
          <div className="bg-gradient-to-r from-marble-600 to-greenhouse-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Your Curated Tools</h2>
            <p className="opacity-90">Personalized AI tools for greenhouse management and pilot projects</p>
          </div>
          <div className="p-6">
            <CuratedToolsList pilotGeneratedTools={pilotGeneratedTools} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 
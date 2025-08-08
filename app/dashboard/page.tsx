'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { ModuleGrid } from '@/components/modules/ModuleGrid'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { WorkshopOverview } from '@/components/dashboard/WorkshopOverview'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getUserStats, getModulesForRole, getUserProgress } from '@/lib/supabase'
import { Module, UserProgress } from '@/types/database'
import Image from 'next/image'

export default function DashboardPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()
  const [modules, setModules] = useState<any[]>([])
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [stats, setStats] = useState({
    modules_completed: 0,
    total_modules: 0,
    time_spent_minutes: 0,
    progress_percentage: 0
  })
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [modulesPerPage, setModulesPerPage] = useState(6)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
      return
    }

    if (!authLoading && user && profile && !profile.onboarding_completed) {
      router.push('/onboarding')
      return
    }

    if (user && profile) {
      loadDashboardData()
    }
  }, [user, profile, authLoading, router])

  const loadDashboardData = async () => {
    if (!user || !profile) return

    try {
      setLoading(true)
      
      // Load modules for user's role
      const userModules = await getModulesForRole(profile.role)
      setModules(userModules || [])

      // Load user progress
      const userProgress = await getUserProgress(user.id)
      setProgress(userProgress || [])

      // Load stats
      const userStats = await getUserStats(user.id)
      setStats(userStats)
      
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Sort all modules for learning path (in_progress first, then not_started, then completed)
  const learningPathModules = modules
    .sort((a, b) => {
      // Sort by status priority: in_progress first, then not_started, then completed
      if (a.status === 'in_progress' && b.status !== 'in_progress') return -1
      if (a.status === 'not_started' && b.status === 'completed') return -1
      if (a.status === 'completed' && b.status !== 'completed') return 1
      // If same status, sort by order_index
      return a.order_index - b.order_index
    })
  
  // Calculate pagination
  const totalPages = Math.ceil(learningPathModules.length / modulesPerPage)
  const startIndex = currentPage * modulesPerPage
  const endIndex = startIndex + modulesPerPage
  const currentModules = learningPathModules.slice(startIndex, endIndex)

  // Debug logging
  console.log('Modules loaded:', modules.length)
  console.log('Learning path modules:', learningPathModules.length)
  console.log('Modules per page:', modulesPerPage)
  console.log('Total pages:', totalPages)
  console.log('Current page:', currentPage)
  console.log('Current modules:', currentModules.length)

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Workshop Overview */}
        <div id="training-overview">
          <WorkshopOverview />
        </div>

        {/* Session Information */}
        <div id="session-progress" className="bg-white rounded-xl p-6 border border-marble-200">
          <h2 className="text-2xl font-bold text-marble-900 mb-4">Training Session Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-marble-900 mb-3">Session Information</h3>
              <ul className="space-y-2 text-marble-700">
                <li><strong>Module:</strong> AI for Enterprise Greenhouse Operations</li>
                <li><strong>Duration:</strong> 3 hours (180 minutes total)</li>
                <li><strong>Format:</strong> On-site Interactive Session</li>
                <li><strong>Participants:</strong> Up to 5 per micro-cohort + 1</li>
                <li><strong>Location:</strong> Big Marble Farms (TBD)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-marble-900 mb-3">Training Focus</h3>
              <ul className="space-y-2 text-marble-700">
                <li>• AI fundamentals and terminology</li>
                <li>• Greenhouse production optimization</li>
                <li>• Operational efficiency systems</li>
                <li>• Data-driven decision making</li>
                <li>• Implementation strategies</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <Link 
              href="/modules"
              className="bg-greenhouse-600 text-white px-6 py-3 rounded-lg hover:bg-greenhouse-700 transition-colors font-medium"
            >
              Go to Modules
            </Link>
            <Link 
              href="/tools"
              className="bg-marble-100 text-marble-700 px-6 py-3 rounded-lg hover:bg-marble-200 transition-colors font-medium"
            >
              Explore AI Tools
            </Link>
          </div>
        </div>

        {/* Modules Grid (clickable) */}
        <div>
          <h2 className="text-2xl font-bold text-marble-900 mb-4">Your Modules</h2>
          <ModuleGrid modules={currentModules} progress={progress} />
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded-lg border border-marble-300 text-marble-700 disabled:opacity-50"
              >
                Previous
              </button>
              <div className="text-sm text-marble-600">
                Page {currentPage + 1} of {totalPages}
              </div>
              <button
                onClick={goToNextPage}
                disabled={currentPage >= totalPages - 1}
                className="px-4 py-2 rounded-lg border border-marble-300 text-marble-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Current Access Section at the bottom */}
        <div className="space-y-3 mt-12">
          <div className="bg-white rounded-xl border border-marble-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="font-semibold text-marble-900 mb-1">Training Session Access</h4>
              <p className="text-sm text-marble-700">AI for Enterprise Greenhouse Operations - Permanent Access</p>
            </div>
            <div className="flex flex-col items-end mt-4 sm:mt-0">
              <span className="text-green-600 font-semibold">Active</span>
              <span className="text-xs text-marble-500">Included with Training</span>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="mr-2" role="img" aria-label="graduation cap">🎓</span>
            <span className="text-blue-800 text-sm">Permanent access to portal with course content, slides, tools list, and supplemental guides.</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
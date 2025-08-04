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
        {/* Welcome Section */}
        <div id="overview" className="bg-gradient-to-r from-greenhouse-600 to-marble-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile.full_name}!
          </h1>
          <p className="text-lg opacity-90">
            Continue your AI leadership journey with personalized learning modules for greenhouse innovation
          </p>
        </div>

        {/* Dashboard Stats */}
        <div id="stats">
          <DashboardStats stats={stats} />
        </div>

        {/* Workshop Overview */}
        <div id="workshop">
          <WorkshopOverview />
          <p className="mt-2 text-blue-800 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm font-medium">
            This portal access is included complimentary with your AI Leadership Accelerator Workshop attendance.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Modules Section */}
          <div id="learning-path" className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-marble-900">Your Learning Path</h2>
                <span className="text-sm text-marble-600">
                  {stats.modules_completed} of {stats.total_modules} completed
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <label htmlFor="modules-per-page" className="text-sm text-marble-600">
                  Show:
                </label>
                <select
                  id="modules-per-page"
                  value={modulesPerPage}
                  onChange={(e) => {
                    setModulesPerPage(Number(e.target.value))
                    setCurrentPage(0) // Reset to first page when changing page size
                  }}
                  className="border border-marble-300 rounded-lg px-3 py-1 text-sm bg-white"
                >
                  <option value={6}>6 per page</option>
                  <option value={16}>16 per page</option>
                  <option value={30}>30 per page</option>
                </select>
              </div>
            </div>
            <ModuleGrid 
              modules={currentModules} 
              progress={progress} 
            />
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-marble-600 bg-white border border-marble-300 rounded-lg hover:bg-marble-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-marble-600">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <span className="text-xs text-marble-500">
                    ({learningPathModules.length} modules)
                  </span>
                </div>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-marble-600 bg-white border border-marble-300 rounded-lg hover:bg-marble-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RecentActivity userId={user.id} />
            
            {/* Progress Overview */}
            <div className="bg-white rounded-xl p-6 border border-marble-200">
              <h3 className="text-lg font-semibold text-marble-900 mb-4">Progress Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>{stats.progress_percentage}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${stats.progress_percentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-greenhouse-50 rounded-lg p-3 border border-greenhouse-200 hover:border-greenhouse-300 hover:shadow-lg transition-all duration-200">
                    <div className="text-2xl font-bold text-greenhouse-600">
                      {Math.floor(stats.time_spent_minutes / 60)}h
                    </div>
                    <div className="text-sm text-marble-600">Time Spent</div>
                  </div>
                  <div className="bg-marble-50 rounded-lg p-3 border border-marble-200 hover:border-greenhouse-300 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-marble-600">Modules Completed</p>
                        <p className="text-3xl font-bold text-marble-900">3</p>
                        <p className="text-sm text-marble-500">of 8</p>
                      </div>
                      <div className="w-12 h-12 bg-greenhouse-100 rounded-full flex items-center justify-center">
                        <Image src="/greenhouse-emoji.png" alt="" width={32} height={32} className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Workshop Session */}
            <div className="bg-gradient-to-br from-greenhouse-50 to-marble-50 rounded-xl p-6 border border-greenhouse-200">
              <h3 className="text-lg font-semibold text-marble-900 mb-2">Next Session 🌱</h3>
              <p className="text-marble-700 mb-3">AI Tools for Greenhouse Operations</p>
              <p className="text-sm text-marble-600 mb-4">Tomorrow at 2:00 PM</p>
              <Link 
                href={`/modules/${learningPathModules.find(m => m.status === 'not_started')?.id || '3'}/start`}
                className="w-full block text-center bg-greenhouse-600 text-white py-2 px-4 rounded-lg hover:bg-greenhouse-700 transition-colors"
              >
                Go to Module
              </Link>
            </div>
          </div>
        </div>

        {/* Current Access Section at the bottom */}
        <div className="space-y-3 mt-12">
          <div className="bg-white rounded-xl border border-marble-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="font-semibold text-marble-900 mb-1">Current Access</h4>
              <p className="text-sm text-marble-700">AI Leadership Accelerator Workshop - Complimentary Access</p>
            </div>
            <div className="flex flex-col items-end mt-4 sm:mt-0">
              <span className="text-green-600 font-semibold">Active</span>
              <span className="text-xs text-marble-500">Included with Workshop</span>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="mr-2" role="img" aria-label="graduation cap">🎓</span>
            <span className="text-blue-800 text-sm">This portal access is included complimentary with your AI Leadership Accelerator Workshop attendance.</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
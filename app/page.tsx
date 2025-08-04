'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Landing } from '@/components/landing/Landing'

export default function HomePage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && profile) {
      // Since we're using mock data with onboarding_completed: true,
      // redirect directly to dashboard
      router.push('/dashboard')
    }
  }, [loading, user, profile, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Show dashboard loading when user is authenticated
  if (user && profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="ml-4 text-gray-600">Redirecting to your greenhouse AI dashboard...</p>
      </div>
    )
  }

  // Show landing page when user is not authenticated
  return <Landing />
}
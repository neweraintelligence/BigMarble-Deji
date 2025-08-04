'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/types/database'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  signInDemo: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  
  // Mock user and profile data for demo
  const mockUser = {
    id: 'demo-user-123',
    email: 'Demo@bigmarble.ca'
  }
  
  const mockProfile = {
    id: 'demo-user-123',
    email: 'Demo@bigmarble.ca',
    full_name: 'Big Marble Farms User',
    role: 'marketing_manager',
    company_position: 'Marketing Manager',
    onboarding_completed: true,
    created_at: new Date().toISOString()
  }
  
  const [user, setUser] = useState<any>(mockUser)
  const [profile, setProfile] = useState<any>(mockProfile)
  const [loading, setLoading] = useState(false)

  const refreshProfile = async () => {
    // Mock profile refresh
    setProfile(mockProfile)
  }

  const signOut = async () => {
    setUser(null)
    setProfile(null)
    router.push('/')
  }

  const signInDemo = () => {
    // Restore mock user for demo
    setUser(mockUser)
    setProfile(mockProfile)
  }

  // Demo mode - skip auth initialization
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const { data: { user } } = await supabase.auth.getUser()
  //       setUser(user)
  //       
  //       if (user) {
  //         await refreshProfile()
  //       }
  //     } catch (error) {
  //       console.error('Error getting user:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   getUser()

  //   const { data: { subscription } } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       setUser(session?.user ?? null)
  //       
  //       if (session?.user) {
  //         await refreshProfile()
  //       } else {
  //         setProfile(null)
  //       }
  //       
  //       setLoading(false)
  //     }
  //   )

  //   return () => subscription.unsubscribe()
  // }, [])

  const value = {
    user,
    profile,
    loading,
    signOut,
    signInDemo,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { supabase, getProfile } from '@/lib/supabase'
import { Profile } from '@/types/database'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, displayName: string, workshopCode?: string) => Promise<{ error?: string }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = async () => {
    if (!user) return
    try {
      const userProfile = await getProfile(user.id)
      setProfile(userProfile)
    } catch (error) {
      console.error('Error refreshing profile:', error)
    }
  }

  const signOut = async () => {
    try {
      await supabase.client.auth.signOut()
      setUser(null)
      setProfile(null)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.client.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        return { error: error.message }
      }
      
      return {}
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  }

  const signUp = async (email: string, password: string, displayName: string, workshopCode?: string) => {
    try {
      const { data, error } = await supabase.client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName,
            workshop_cohort: workshopCode || 'default'
          }
        }
      })
      
      if (error) {
        return { error: error.message }
      }
      
      return {}
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.client.auth.getUser()
        setUser(user)
        
        if (user) {
          await refreshProfile()
        }
      } catch (error) {
        console.error('Error getting user:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.client.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await refreshProfile()
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    profile,
    loading,
    signOut,
    signIn,
    signUp,
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
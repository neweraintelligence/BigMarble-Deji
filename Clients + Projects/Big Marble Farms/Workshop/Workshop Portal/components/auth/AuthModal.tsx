'use client'

import { useState } from 'react'
import { X, Mail, Lock, User, Briefcase } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'signin' | 'signup'
  onModeChange: (mode: 'signin' | 'signup') => void
}

const roleOptions = [
  { value: 'president', label: 'President/CEO' },
  { value: 'cmo', label: 'Chief Marketing Officer' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'ops_manager', label: 'Operations Manager' },
  { value: 'tech_lead', label: 'Technology Lead' }
]

export function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('')
  const [position, setPosition] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Demo mode - just simulate successful login
      setTimeout(() => {
        toast.success('Welcome back to the demo!')
        onClose()
        setLoading(false)
      }, 1000)
    } catch (error) {
      toast.error('Something went wrong')
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Demo mode - just simulate successful signup
      setTimeout(() => {
        toast.success('Demo account created! Welcome to Big Marble Farms AI Portal.')
        onClose()
        setLoading(false)
      }, 1000)
    } catch (error) {
      toast.error('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-marble-900">
            {mode === 'signin' ? 'Welcome Back' : 'Join the Workshop'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-marble-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-marble-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-marble-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-marble-700 mb-2">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your role</option>
                    {roleOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-marble-700 mb-2">
                    Position/Title (Optional)
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-marble-400" />
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500 focus:border-transparent"
                      placeholder="Your specific title"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-marble-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-marble-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-marble-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-marble-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500 focus:border-transparent"
                  placeholder="Enter your password"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-greenhouse-600 hover:bg-greenhouse-700 text-white"
              disabled={loading}
            >
              {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
              className="text-greenhouse-600 hover:text-greenhouse-700 font-medium"
            >
              {mode === 'signin' 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { Brain, Users, Lightbulb, ArrowRight, Bot, TrendingUp, Zap } from 'lucide-react'
import { AuthModal } from '@/components/auth/AuthModal'
import { Button } from '@/components/ui/Button'

export function Landing() {
  const router = useRouter()
  const { signInDemo } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  const handleGetStarted = () => {
    // For demo purposes, sign user in and go to dashboard
    signInDemo()
    router.push('/dashboard')
  }

  const handleSignIn = () => {
    setAuthMode('signin')
    setShowAuth(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
              <Brain className="h-8 w-8 text-greenhouse-600" />
              <span className="text-xl font-bold text-marble-800">AI Leadership Accelerator</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-marble-900 mb-6">
            Transform Your Business with{' '}
            <span className="text-gradient">AI Leadership</span>
          </h1>
          
          <p className="text-xl text-marble-700 mb-8 max-w-3xl mx-auto">
            An interactive workshop companion and learning platform designed for Big Marble Farms. 
            Master AI tools, build automation workflows, and create your personalized AI adoption roadmap for greenhouse operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-greenhouse-600 hover:bg-greenhouse-700 text-white px-8 py-4 text-lg"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-marble-300 text-marble-700 hover:bg-marble-50 px-8 py-4 text-lg"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-marble-900 mb-4">
              Your AI Journey Starts Here
            </h2>
            <p className="text-lg text-marble-700 max-w-2xl mx-auto">
              Personalized learning paths, interactive tools, and expert guidance tailored to your role
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Bot className="h-8 w-8 text-greenhouse-600" />}
              title="AI Assistant"
              description="Get instant answers and personalized guidance with our workshop-trained AI chatbot"
            />
            <FeatureCard 
              icon={<Lightbulb className="h-8 w-8 text-greenhouse-600" />}
              title="Interactive Modules"
              description="Hands-on activities including tool selection, automation challenges, and controlled environment agriculture simulations"
            />
            <FeatureCard 
              icon={<TrendingUp className="h-8 w-8 text-greenhouse-600" />}
              title="Pilot Roadmaps"
              description="Generate custom 90-day AI implementation plans with clear milestones and ownership"
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-greenhouse-600" />}
              title="Role-Based Learning"
              description="Content and tools curated specifically for Presidents, CMOs, Consultants, and Operations Managers"
            />
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-greenhouse-600" />}
              title="Automation Tools"
              description="Build and test real automation workflows that save time and reduce manual tasks"
            />
            <FeatureCard 
              icon={<Brain className="h-8 w-8 text-greenhouse-600" />}
              title="Knowledge Hub"
              description="Access workshop materials, templates, and prompt libraries long after the session ends"
            />
          </div>
        </div>
      </section>

      {/* Workshop Info Section */}
      <section className="py-20 bg-gradient-to-r from-greenhouse-600 to-marble-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Big Marble Farms AI Workshop
          </h2>
          <p className="text-xl mb-8 opacity-90">
            August 18-31, 2024 • Intensive AI Leadership Training
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 glass-effect">
            <h3 className="text-2xl font-semibold mb-4">What You'll Learn</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 mr-3 text-greenhouse-300" />
                  AI tool evaluation and selection
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 mr-3 text-greenhouse-300" />
                  Workflow automation strategies
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 mr-3 text-greenhouse-300" />
                  ROI calculation and planning
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 mr-3 text-greenhouse-300" />
                  Change management best practices
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 mr-3 text-greenhouse-300" />
                  Greenhouse digital twin simulations
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 mr-3 text-greenhouse-300" />
                  Implementation roadmapping
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-marble-900 mb-6">
            Ready to Lead with AI?
          </h2>
          <p className="text-lg text-marble-700 mb-8">
            Join the workshop and get access to your personalized learning portal
          </p>
          <Button 
            size="lg"
            className="bg-greenhouse-600 hover:bg-greenhouse-700 text-white px-12 py-4 text-lg"
            onClick={handleGetStarted}
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-marble-200 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-marble-900 mb-2">{title}</h3>
      <p className="text-marble-700">{description}</p>
    </div>
  )
}
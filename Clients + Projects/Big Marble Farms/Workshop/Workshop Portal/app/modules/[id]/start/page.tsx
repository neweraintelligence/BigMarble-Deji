import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Target } from 'lucide-react'
import Image from 'next/image'

interface PageProps {
  params: {
    id: string
  }
}

export default function StartModulePage({ params }: PageProps) {
  const { id } = params

  return (
    <>
      <Image 
        src="/bmf-logo.png" 
        alt="Big Marble Farms" 
        width={48}
        height={48}
        className="fixed top-4 right-4 w-12 h-12 object-contain z-10"
      />
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-gradient-to-r from-greenhouse-600 to-marble-600 rounded-xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Module {id}: Strategic AI Tools Evaluation</h1>
          <p className="text-lg opacity-90 mb-4">Embark on a transformative learning journey designed for visionary leaders.</p>
          <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
            <h3 className="text-xl font-semibold mb-2">Module Preview</h3>
            <ul className="list-disc pl-6 text-white/90 mb-2">
              <li>Strategic frameworks for AI tool evaluation aligned with your organization's vision</li>
              <li>Executive case studies of digital transformation in agri-business</li>
              <li>Leadership-focused scenario planning and decision simulations</li>
              <li>Progress analytics and personalized executive insights</li>
            </ul>
            <p className="text-white/80 italic">"Empower your organization to harness AI—one strategic decision at a time."</p>
          </div>
          <div className="mb-4">
            <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Executive Development Outcomes</span>
          </div>
          <ul className="list-disc pl-6 text-white/90 mb-4">
            <li>Master key AI evaluation principles for enterprise-scale investments</li>
            <li>Drive measurable business value and competitive advantage</li>
            <li>Lead AI adoption and inspire organizational change</li>
          </ul>
          <Link href={`/modules/${id}/continue`} className="inline-block mt-4 bg-white text-greenhouse-700 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-greenhouse-100 transition-colors text-xl">Start Learning</Link>
        </div>
        <div className="bg-white rounded-xl p-6 border border-marble-200">
          <h2 className="text-xl font-semibold text-marble-900 mb-2">What to Expect</h2>
          <p className="text-marble-700 mb-4">This module is crafted for senior leaders seeking to drive innovation and business growth through AI. You'll experience:</p>
          <ul className="list-disc pl-6 text-marble-700">
            <li>Concise, impactful lessons focused on strategic decision-making</li>
            <li>Real-world leadership scenarios and executive challenges</li>
            <li>Continuous support and tailored insights from your AI Copilot</li>
          </ul>
        </div>
      </div>
    </>
  )
} 
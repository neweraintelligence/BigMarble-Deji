import Link from 'next/link'
import { CheckCircle, ArrowRight, TrendingUp, Target } from 'lucide-react'
import Image from 'next/image'

interface PageProps {
  params: {
    id: string
  }
}

export default function ReviewModulePage({ params }: PageProps) {
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
        <div className="bg-gradient-to-r from-greenhouse-600 to-marble-600 rounded-xl p-8 text-white mb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-center">Module {id} Completed!</h1>
          <p className="text-lg opacity-90 mb-4 text-center">Congratulations on finishing this module. You're one step closer to AI mastery!</p>
          <Link href={`/modules/${id}/start`} className="inline-block mt-2 bg-white text-greenhouse-700 font-bold px-6 py-2 rounded-lg shadow hover:bg-greenhouse-100 transition-colors text-lg">Review Content</Link>
        </div>
        <div className="bg-white rounded-xl p-6 border border-marble-200">
          <h2 className="text-xl font-semibold text-marble-900 mb-2">Quick Review Quiz</h2>
          <p className="text-marble-700 mb-4">Test your knowledge and reinforce what you've learned. Ready?</p>
          <ul className="list-decimal pl-6 text-marble-700 mb-4">
            <li>What is the main takeaway from this module?</li>
            <li>How can you apply this knowledge in your role?</li>
            <li>What is one question you still have?</li>
          </ul>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-marble-900 mb-2">Module Summary</h3>
            <p className="text-marble-700 mb-2">In this module, you explored the fundamentals of AI tool evaluation, learned how to define and prioritize selection criteria, and practiced using a scoring matrix to compare options. You also reviewed a real-world scenario for greenhouse operations and reflected on how to apply these insights in your own work.</p>
            <ul className="list-disc pl-6 text-marble-700 mb-2">
              <li>Understand the importance of clear evaluation criteria</li>
              <li>Use a scoring matrix for objective comparison</li>
              <li>Engage stakeholders for better adoption</li>
              <li>Document findings and recommendations</li>
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-marble-900 mb-2">Next Steps & Resources</h3>
            <p className="text-marble-700 mb-2">To deepen your learning, consider exploring the following:</p>
            <ul className="list-disc pl-6 text-marble-700 mb-2">
              <li>Case studies of successful AI tool adoption in agriculture</li>
              <li>Guides on change management for technology projects</li>
              <li>Workshops on advanced AI evaluation techniques</li>
              <li>Connect with your AI Copilot for personalized recommendations</li>
            </ul>
          </div>
          <Link href={`/modules/${id}/continue`} className="inline-block bg-greenhouse-600 text-white px-6 py-2 rounded-lg hover:bg-greenhouse-700 transition-colors font-medium">Retake Module</Link>
        </div>
      </div>
    </>
  )
} 
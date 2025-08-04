import Link from 'next/link'
import { CheckCircle, ArrowRight, Clock, Target } from 'lucide-react'
import Image from 'next/image'

interface PageProps {
  params: {
    id: string
  }
}

export default function ContinueModulePage({ params }: PageProps) {
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
          <h1 className="text-3xl font-bold mb-2">Module {id}: AI Tool Evaluation</h1>
          <p className="text-lg opacity-90">Building your AI toolkit with confidence</p>
          <div className="mt-4 bg-white/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm">65%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-marble-200 mb-8">
          <h2 className="text-xl font-semibold text-marble-900 mb-4">AI Tools Evaluation Framework</h2>
          <p className="text-marble-700 mb-4">
            In this section, you'll discover how top leaders systematically evaluate and deploy AI tools to drive business transformation. We'll explore strategic criteria, advanced analytics, and how to align tool selection with your organization's vision for innovation and growth.
          </p>
          <p className="text-marble-700 mb-4">
            Selecting the right AI solution is a catalyst for enterprise value. Begin by defining the business outcome you want to achieve—whether it's operational efficiency, new revenue streams, or risk mitigation. Identify must-have capabilities (such as scalability, integration, or security) and ensure alignment with your digital strategy. Engage executive stakeholders early to foster buy-in and accelerate adoption.
          </p>
          <p className="text-marble-700 mb-4">
            <strong>Example:</strong> If your goal is to automate and optimize business analytics, compare platforms based on their ability to deliver actionable insights, integrate with core systems, and support advanced automation. Use a weighted scoring model to objectively assess each option's impact on KPIs and long-term strategy.
          </p>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-marble-900 mb-2">Scenario: Executive Selection of AI for Business Operations</h3>
            <p className="text-marble-700 mb-4">
              Imagine you're leading a digital transformation initiative to enhance operational agility. You shortlist three AI platforms: one excels in predictive analytics, another in workflow automation, and a third in real-time business intelligence. By mapping your strategic objectives to each platform's strengths, you enable data-driven, high-impact decisions that align with your organization's goals.
            </p>
          </div>
          <ul className="list-disc pl-6 text-marble-700 mb-6">
            <li>Define executive-level evaluation criteria (e.g., ROI, scalability, automation potential)</li>
            <li>Compare solutions using a strategic scoring matrix</li>
            <li>Engage leadership and cross-functional teams in the selection process</li>
            <li>Document your business case and implementation roadmap</li>
          </ul>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-marble-900 mb-2">Sample Tool Comparison Chart</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-marble-100">
                    <th className="px-4 py-2 border">Tool</th>
                    <th className="px-4 py-2 border">Cost</th>
                    <th className="px-4 py-2 border">Ease of Use</th>
                    <th className="px-4 py-2 border">Features</th>
                    <th className="px-4 py-2 border">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">ChatGPT</td>
                    <td className="px-4 py-2 border">$$</td>
                    <td className="px-4 py-2 border">High</td>
                    <td className="px-4 py-2 border">Text, Analysis</td>
                    <td className="px-4 py-2 border font-bold text-greenhouse-700">8.5</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Jasper AI</td>
                    <td className="px-4 py-2 border">$$$</td>
                    <td className="px-4 py-2 border">Medium</td>
                    <td className="px-4 py-2 border">Content, SEO</td>
                    <td className="px-4 py-2 border font-bold text-greenhouse-700">7.8</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Tableau AI</td>
                    <td className="px-4 py-2 border">$$$</td>
                    <td className="px-4 py-2 border">Medium</td>
                    <td className="px-4 py-2 border">Data Viz</td>
                    <td className="px-4 py-2 border font-bold text-greenhouse-700">8.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-marble-900 mb-2">Progress Over Time</h3>
            <div className="w-full h-48 bg-marble-50 rounded-lg flex items-end p-4 relative">
              {/* Simple bar graph visual */}
              <div className="absolute left-0 bottom-0 w-full h-full flex items-end">
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 bg-greenhouse-600 rounded-t h-12 mb-1" />
                  <span className="text-xs text-marble-500">Mon</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 bg-greenhouse-600 rounded-t h-24 mb-1" />
                  <span className="text-xs text-marble-500">Tue</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 bg-greenhouse-600 rounded-t h-32 mb-1" />
                  <span className="text-xs text-marble-500">Wed</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 bg-greenhouse-400 rounded-t h-20 mb-1" />
                  <span className="text-xs text-marble-500">Thu</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 bg-greenhouse-300 rounded-t h-16 mb-1" />
                  <span className="text-xs text-marble-500">Fri</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-marble-900 mb-2">Reflection</h3>
            <p className="text-marble-700 mb-2">Take a moment to reflect on what you've learned so far. What's one insight you can apply immediately?</p>
            <textarea className="w-full border border-marble-300 rounded-lg p-3 mb-2" rows={3} placeholder="Type your reflection here..." />
            <button className="bg-greenhouse-600 text-white px-6 py-2 rounded-lg hover:bg-greenhouse-700 transition-colors font-medium">Save Reflection</button>
          </div>
          <div className="flex justify-between">
            <Link href={`/modules/${id}/start`} className="bg-marble-100 text-marble-800 px-6 py-2 rounded-lg hover:bg-marble-200 transition-colors font-medium">Back to Start</Link>
            <Link href={`/modules/${id}/review`} className="bg-greenhouse-600 text-white px-6 py-2 rounded-lg hover:bg-greenhouse-700 transition-colors font-medium">Complete Module</Link>
          </div>
        </div>
      </div>
    </>
  )
} 
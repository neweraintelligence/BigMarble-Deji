'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, CheckCircle, XCircle, BarChart3, BookOpen, Target, Clock } from 'lucide-react'
import Image from 'next/image'

interface PageProps {
  params: {
    id: string
  }
}

interface Slide {
  id: number
  title: string
  content: string
  type: 'slide' | 'quiz' | 'visualization'
  options?: string[]
  correctAnswer?: number
  visualization?: {
    type: 'chart' | 'diagram' | 'interactive'
    data?: any
  }
}

const courseContent: Slide[] = [
  {
    id: 1,
    title: "Strategic AI Evaluation Framework",
    content: "Welcome to the Strategic AI Evaluation Framework. This comprehensive approach helps leaders assess AI tools through four key dimensions: Business Impact, Technical Feasibility, Risk Assessment, and Implementation Strategy.",
    type: 'slide'
  },
  {
    id: 2,
    title: "Business Impact Analysis",
    content: "The Business Impact dimension evaluates how AI tools align with your organization's strategic objectives. Consider ROI, competitive advantage, and market positioning.",
    type: 'slide'
  },
  {
    id: 3,
    title: "AI Adoption Success Metrics",
    content: "Key metrics for measuring AI adoption success include: Cost savings, Efficiency gains, Customer satisfaction, Employee productivity, and Innovation velocity.",
    type: 'visualization',
    visualization: {
      type: 'chart',
      data: {
        labels: ['Cost Savings', 'Efficiency', 'Customer Satisfaction', 'Productivity', 'Innovation'],
        values: [85, 92, 78, 88, 75]
      }
    }
  },
  {
    id: 4,
    title: "Technical Feasibility Assessment",
    content: "Evaluate technical requirements, infrastructure needs, and integration complexity. Consider data quality, system compatibility, and technical expertise available.",
    type: 'slide'
  },
  {
    id: 5,
    title: "Risk Assessment Framework",
    content: "Identify and mitigate risks across data privacy, security, compliance, and operational continuity. Develop contingency plans for each risk category.",
    type: 'slide'
  },
  {
    id: 6,
    title: "Implementation Strategy Quiz",
    content: "Which factor is MOST critical when implementing AI tools in agriculture?",
    type: 'quiz',
    options: [
      "Advanced technical infrastructure",
      "Clear business objectives and ROI expectations",
      "Employee resistance to change",
      "Regulatory compliance requirements"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    title: "Leadership in AI Transformation",
    content: "Successful AI transformation requires visionary leadership that can inspire change, manage resistance, and create a culture of continuous learning and innovation.",
    type: 'slide'
  },
  {
    id: 8,
    title: "Change Management Success Factors",
    content: "Effective change management in AI adoption includes: Clear communication, Training programs, Stakeholder engagement, Progress monitoring, and Celebrating wins.",
    type: 'visualization',
    visualization: {
      type: 'diagram',
      data: {
        phases: ['Awareness', 'Desire', 'Knowledge', 'Ability', 'Reinforcement'],
        success: [90, 85, 88, 82, 87]
      }
    }
  },
  {
    id: 9,
    title: "AI ROI Calculation",
    content: "Calculate potential ROI by considering: Initial investment, Operational costs, Expected benefits, Time to value, and Risk factors.",
    type: 'slide'
  },
  {
    id: 10,
    title: "Final Assessment",
    content: "What is the primary goal of strategic AI evaluation?",
    type: 'quiz',
    options: [
      "To implement the latest technology",
      "To align AI investments with business strategy and drive measurable value",
      "To reduce operational costs",
      "To improve employee satisfaction"
    ],
    correctAnswer: 1
  }
]

export default function ContinueModulePage({ params }: PageProps) {
  const { id } = params
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [totalQuizzes, setTotalQuizzes] = useState(0)
  const [completedQuizzes, setCompletedQuizzes] = useState(0)

  const currentContent = courseContent[currentSlide]
  const isQuiz = currentContent.type === 'quiz'
  const isVisualization = currentContent.type === 'visualization'

  const handleNext = () => {
    if (currentSlide < courseContent.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && currentContent.correctAnswer !== undefined) {
      const isCorrect = selectedAnswer === currentContent.correctAnswer
      setShowResult(true)
      if (isCorrect) {
        setScore(score + 1)
      }
      setCompletedQuizzes(completedQuizzes + 1)
      setTotalQuizzes(totalQuizzes + 1)
    }
  }

  const progressPercentage = ((currentSlide + 1) / courseContent.length) * 100

  return (
    <>
      <Image 
        src="/bmf-logo.png" 
        alt="Big Marble Farms" 
        width={48}
        height={48}
        className="fixed top-4 right-4 w-12 h-12 object-contain z-10"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-greenhouse-50 to-marble-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-marble-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-marble-900">Module {id}: Strategic AI Tools Evaluation</h1>
                <p className="text-sm text-marble-600">Interactive Learning Experience</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-greenhouse-600" />
                  <span className="text-sm text-marble-700">Slide {currentSlide + 1} of {courseContent.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-greenhouse-600" />
                  <span className="text-sm text-marble-700">{completedQuizzes}/{totalQuizzes} Quizzes</span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-marble-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-greenhouse-500 to-marble-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg border border-marble-200 overflow-hidden">
            {/* Slide Content */}
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  {isQuiz && <BarChart3 className="w-5 h-5 text-orange-500" />}
                  {isVisualization && <BarChart3 className="w-5 h-5 text-blue-500" />}
                  {!isQuiz && !isVisualization && <BookOpen className="w-5 h-5 text-greenhouse-500" />}
                  <h2 className="text-2xl font-bold text-marble-900">{currentContent.title}</h2>
                </div>
                
                <div className="prose prose-marble max-w-none">
                  <p className="text-lg text-marble-700 leading-relaxed">{currentContent.content}</p>
                </div>
              </div>

              {/* Quiz Section */}
              {isQuiz && currentContent.options && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-marble-900 mb-4">Select the best answer:</h3>
                  <div className="space-y-3">
                    {currentContent.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                          selectedAnswer === index
                            ? 'border-greenhouse-500 bg-greenhouse-50'
                            : 'border-marble-200 hover:border-marble-300 hover:bg-marble-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === index ? 'border-greenhouse-500 bg-greenhouse-500' : 'border-marble-300'
                          }`}>
                            {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                          <span className="text-marble-700">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {selectedAnswer !== null && !showResult && (
                    <button
                      onClick={handleSubmitAnswer}
                      className="mt-6 bg-greenhouse-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-greenhouse-700 transition-colors"
                    >
                      Submit Answer
                    </button>
                  )}
                  
                  {showResult && (
                    <div className={`mt-6 p-4 rounded-lg ${
                      selectedAnswer === currentContent.correctAnswer
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {selectedAnswer === currentContent.correctAnswer ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className={`font-semibold ${
                          selectedAnswer === currentContent.correctAnswer ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {selectedAnswer === currentContent.correctAnswer ? 'Correct!' : 'Incorrect'}
                        </span>
                      </div>
                      {selectedAnswer !== currentContent.correctAnswer && (
                        <p className="text-sm text-red-600 mt-2">
                          The correct answer is: {currentContent.options?.[currentContent.correctAnswer!]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Visualization Section */}
              {isVisualization && currentContent.visualization && (
                <div className="mt-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Interactive Visualization</h3>
                    
                    {currentContent.visualization?.type === 'chart' && currentContent.visualization?.data && (
                      <div className="space-y-4">
                        {currentContent.visualization?.data?.labels.map((label: string, index: number) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="w-32 text-sm font-medium text-blue-700">{label}</div>
                            <div className="flex-1">
                              <div className="w-full bg-blue-200 rounded-full h-3">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000"
                                  style={{ width: `${currentContent.visualization?.data?.values[index]}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-12 text-sm font-semibold text-blue-700 text-right">
                              {currentContent.visualization?.data?.values[index]}%
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {currentContent.visualization?.type === 'diagram' && currentContent.visualization?.data && (
                      <div className="space-y-4">
                        {currentContent.visualization?.data?.phases.map((phase: string, index: number) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="w-32 text-sm font-medium text-blue-700">{phase}</div>
                            <div className="flex-1">
                              <div className="w-full bg-blue-200 rounded-full h-3">
                                <div 
                                  className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-1000"
                                  style={{ width: `${currentContent.visualization?.data?.success[index]}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-12 text-sm font-semibold text-blue-700 text-right">
                              {currentContent.visualization?.data?.success[index]}%
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="bg-marble-50 px-8 py-4 border-t border-marble-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentSlide === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentSlide === 0
                      ? 'text-marble-400 cursor-not-allowed'
                      : 'text-marble-700 hover:bg-marble-200'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-marble-600">
                    {currentSlide + 1} of {courseContent.length}
                  </span>
                  {isQuiz && (
                    <span className="text-sm text-orange-600 font-medium">
                      Quiz {Math.floor(currentSlide / 3) + 1}
                    </span>
                  )}
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={currentSlide === courseContent.length - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentSlide === courseContent.length - 1
                      ? 'text-marble-400 cursor-not-allowed'
                      : 'text-marble-700 hover:bg-marble-200'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 
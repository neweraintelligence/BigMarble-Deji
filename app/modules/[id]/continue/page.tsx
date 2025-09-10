'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, CheckCircle, XCircle, BarChart3, BookOpen, Target, Clock, MessageSquare, Monitor, Maximize2, Users, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { JoinSessionModal } from '@/components/quiz/JoinSessionModal'
import { Leaderboard } from '@/components/quiz/Leaderboard'
import { QuizRunner } from '@/components/quiz/QuizRunner'
import { workshopSlides, sections, getSlidesBySection, getSectionDuration, WorkshopSlide } from '@/lib/workshopSlides'
import { TemperatureControl } from '@/components/visualizations/TemperatureControl'
import { ContextWindow } from '@/components/visualizations/ContextWindow'
import { ROICalculator } from '@/components/visualizations/ROICalculator'
import { GreenhouseControl } from '@/components/visualizations/GreenhouseControl'
import { AITaxonomyFlowchart } from '@/components/visualizations/AITaxonomyFlowchart'
import { GenerativeAIModalitiesFlowchart } from '@/components/visualizations/GenerativeAIModalitiesFlowchart'
import { PromptExamples } from '@/components/visualizations/PromptExamples'
import { PromptEngineeringExamples } from '@/components/visualizations/PromptEngineeringExamples'
import { AIGreenhouseDemo } from '@/components/visualizations/AIGreenhouseDemo'
import { DocumentProcessingDemo } from '@/components/visualizations/DocumentProcessingDemo'
import { DigitalTwinAIDemo } from '@/components/visualizations/DigitalTwinAIDemo'

interface PageProps {
  params: {
    id: string
  }
}

export default function ContinueModulePage({ params }: PageProps) {
  const { id } = params
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [totalQuizzes, setTotalQuizzes] = useState(0)
  const [completedQuizzes, setCompletedQuizzes] = useState(0)
  const [joinOpen, setJoinOpen] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [participantName, setParticipantName] = useState<string>('')
  const [presenterMode, setPresenterMode] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showSectionNav, setShowSectionNav] = useState(false)

  const currentContent = workshopSlides[currentSlide]
  const currentSection = sections.find(s => s.id === currentContent.sectionId)
  const sectionSlides = getSlidesBySection(currentContent.sectionId)
  const slideIndexInSection = sectionSlides.findIndex(s => s.id === currentContent.id)
  const totalSlidesInSection = sectionSlides.length

  // Calculate progress
  const overallProgress = ((currentSlide + 1) / workshopSlides.length) * 100
  const sectionProgress = ((slideIndexInSection + 1) / totalSlidesInSection) * 100

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleNext = () => {
    if (currentSlide < workshopSlides.length - 1) {
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

  const handleSectionJump = (sectionId: number) => {
    const firstSlideInSection = workshopSlides.findIndex(s => s.sectionId === sectionId)
    if (firstSlideInSection !== -1) {
      setCurrentSlide(firstSlideInSection)
      setShowSectionNav(false)
    }
  }

  const handleSlideJump = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
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

  // Get section color
  const getSectionColor = (sectionId: number) => {
    switch(sectionId) {
      case 1: return 'blue'
      case 2: return 'green'
      case 3: return 'orange'
      default: return 'gray'
    }
  }

  const sectionColor = getSectionColor(currentContent.sectionId)

  useEffect(() => {
    const savedName = localStorage.getItem('bmf_display_name') || ''
    const savedSession = localStorage.getItem('bmf_session_id') || ''
    if (savedName && savedSession) {
      setParticipantName(savedName)
      setSessionId(savedSession)
      setJoinOpen(false)
    } else if (currentContent.type === 'quiz') {
      setJoinOpen(true)
    }
  }, [currentContent.type])

  const onJoined = (data: { participantId: string; displayName: string; sessionId: string }) => {
    setParticipantName(data.displayName)
    setSessionId(data.sessionId)
    setJoinOpen(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'f' && e.ctrlKey) setPresenterMode(!presenterMode)
      if (e.key === ' ') {
        e.preventDefault()
        setIsTimerRunning(!isTimerRunning)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, presenterMode, isTimerRunning])

  return (
    <>
      <Image 
        src="/bmf-logo.png" 
        alt="Big Marble Farms" 
        width={48}
        height={48}
        className="fixed top-4 right-4 w-12 h-12 object-contain z-10"
      />
      
      <div className={`min-h-screen bg-gradient-to-br from-${sectionColor}-50 to-marble-50`}>
        {/* Header with enhanced navigation */}
        <div className="bg-white shadow-sm border-b border-marble-200">
          <div className="w-full px-6 py-3">
            {/* Progress bars */}
            <div className="mb-2 max-w-6xl mx-auto">
              <div className="flex items-center justify-between text-xs text-marble-600 mb-1">
                <span>Progress</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <div className="w-full bg-marble-200 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-greenhouse-500 to-greenhouse-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-montserrat font-semibold text-marble-900">
                  {currentSection?.icon} {currentContent.sectionName}
                </h1>
                <p className="text-sm font-hind text-marble-600">
                  Slide {slideIndexInSection + 1} of {totalSlidesInSection} in section
                </p>
              </div>

              <div className="flex items-center space-x-4 mr-16">
                {/* Section Navigator */}
                <button
                  onClick={() => setShowSectionNav(!showSectionNav)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-marble-100 hover:bg-marble-200 transition-colors"
                >
                  <span className="text-sm text-marble-700">Sections</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSectionNav ? 'rotate-180' : ''}`} />
                </button>

                {/* Timer */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-1.5 rounded hover:bg-marble-100"
                  >
                    {isTimerRunning ? (
                      <Pause className="w-4 h-4 text-marble-600" />
                    ) : (
                      <Play className="w-4 h-4 text-marble-600" />
                    )}
                  </button>
                  <span className="text-sm font-mono text-marble-700">{formatTime(elapsedTime)}</span>
                </div>

                {/* Presenter Mode Toggle */}
                <button
                  onClick={() => setPresenterMode(!presenterMode)}
                  className={`p-1.5 rounded ${presenterMode ? 'bg-blue-100 text-blue-600' : 'hover:bg-marble-100'}`}
                  title="Toggle Presenter Mode (Ctrl+F)"
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Section Navigation Dropdown */}
          {showSectionNav && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-b border-marble-200 z-20">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  {sections.map(section => {
                    const sectionSlideCount = getSlidesBySection(section.id as 1 | 2 | 3).length
                    const sectionDuration = getSectionDuration(section.id as 1 | 2 | 3)
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleSectionJump(section.id)}
                        className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                          currentContent.sectionId === section.id 
                            ? `border-${section.color}-500 bg-${section.color}-50`
                            : 'border-marble-200 hover:border-marble-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{section.icon}</div>
                        <div className="font-semibold text-marble-900">{section.name}</div>
                        <div className="text-xs text-marble-600 mt-1">
                          {sectionSlideCount} slides · {Math.round(sectionDuration / 60)} min
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area - Full width with minimal padding */}
        <div className="w-full px-6 py-3">
          <div className="bg-white rounded-xl shadow-lg border border-marble-200 overflow-hidden min-h-[80vh]">
            {/* Slide Content - Full height with consistent padding */}
            <div className={`${presenterMode ? 'p-10' : 'p-12'} min-h-[calc(80vh-80px)] flex flex-col`}>
              {/* Section Header Slide */}
              {currentContent.type === 'section-header' && (
                <div className="flex-1 flex items-center justify-center relative">
                  <div className="text-center">
                    {currentContent.imageUrl && (
                      <Image 
                        src={currentContent.imageUrl}
                        alt={currentContent.title}
                        width={150}
                        height={150}
                        className="mx-auto mb-8"
                      />
                    )}
                    <h1 className="text-5xl font-montserrat font-bold text-marble-900 mb-6">{currentContent.title}</h1>
                    <p className="text-2xl font-lora text-marble-700 max-w-4xl mx-auto">{currentContent.content}</p>
                  </div>
                  {currentContent.presenter && (
                    <div className="absolute bottom-0 right-0 text-lg font-hind text-marble-600">
                      {currentContent.presenter}
                    </div>
                  )}
                </div>
              )}

              {/* Team Introduction Slide */}
              {currentContent.type === 'team-intro' && (
                <div className="flex-1 flex flex-col">
                  <h2 className="text-4xl font-montserrat font-bold text-marble-900 mb-4 text-center">{currentContent.title}</h2>
                  <p className="text-xl font-lora text-marble-700 mb-12 text-center">{currentContent.content}</p>
                  
                  <div className="flex-1 grid grid-cols-3 gap-8 items-center">
                    {currentContent.teamMembers?.map((member, index) => (
                      <div key={index} className="text-center">
                        {member.image && (
                          <Image 
                            src={member.image}
                            alt={member.name}
                            width={180}
                            height={180}
                            className="mx-auto mb-6 rounded-full border-4 border-greenhouse-200"
                          />
                        )}
                        <h3 className="text-2xl font-montserrat font-semibold text-marble-900 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-lg font-hind text-marble-600">
                          {member.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Slide */}
              {currentContent.type === 'slide' && (
                <div className="flex-1 flex flex-col">
                  <h2 className="text-6xl font-montserrat font-bold text-marble-900 mb-6">{currentContent.title}</h2>
                  {currentContent.subtitle && (
                    <h3 className="text-3xl font-lora font-semibold text-marble-700 mb-8">{currentContent.subtitle}</h3>
                  )}
                  <p className="text-xl font-hind italic text-gray-500 mb-10">{currentContent.content}</p>
                  
                  <div className={`flex gap-8 flex-1 ${currentContent.imageUrl || currentContent.id === 14 || currentContent.id === 15 ? 'items-start' : ''}`}>
                    {/* Left side - Content */}
                    <div className={`${currentContent.imageUrl || currentContent.id === 14 || currentContent.id === 15 ? 'flex-1' : 'w-full'}`}>
                      {currentContent.bulletPoints && (
                        <ul className="space-y-4">
                          {currentContent.bulletPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                              {point.trim().startsWith('◦') ? (
                                <>
                                  <span className="mr-6 mt-2 text-3xl invisible">•</span>
                                  <span className="text-xl font-hind text-marble-700 leading-relaxed ml-4">
                                    <span dangerouslySetInnerHTML={{
                                      __html: point.replace(/^\s*◦\s*/, '◦ ').replace(/\*(.*?)\*/g, '<em>$1</em>')
                                    }} />
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className={`text-${sectionColor}-500 mr-6 mt-2 text-3xl`}>•</span>
                                  <span className="text-2xl font-hind text-marble-700 leading-relaxed">{point}</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Right side - Image or Prompt Examples */}
                    {currentContent.imageUrl && (
                      <div className="flex-1 flex items-center justify-center">
                        <Image 
                          src={currentContent.imageUrl}
                          alt={currentContent.title}
                          width={520}
                          height={520}
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                    {currentContent.id === 14 && !currentContent.imageUrl && (
                      <div className="flex-1">
                        <PromptExamples />
                      </div>
                    )}
                    {currentContent.id === 15 && !currentContent.imageUrl && (
                      <div className="flex-1">
                        <PromptEngineeringExamples />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quiz Slide */}
              {currentContent.type === 'quiz' && (
                <div className="flex-1 flex flex-col">
                  <h2 className="text-5xl font-montserrat font-bold text-marble-900 mb-8">
                    <BarChart3 className="inline w-12 h-12 text-orange-500 mr-4" />
                    {currentContent.title}
                  </h2>
                  <p className="text-xl font-hind italic text-gray-500 mb-10">{currentContent.content}</p>
                  
                  <div className="space-y-4 flex-1">
                    {currentContent.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full text-left p-6 rounded-lg border-2 transition-all text-2xl ${
                          selectedAnswer === index
                            ? showResult
                              ? index === currentContent.correctAnswer
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-blue-500 bg-blue-50'
                            : 'border-marble-200 hover:border-marble-300'
                        } ${showResult && index === currentContent.correctAnswer ? 'border-green-500 bg-green-50' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && index === currentContent.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                          {showResult && selectedAnswer === index && index !== currentContent.correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {!showResult && selectedAnswer !== null && (
                    <button
                      onClick={handleSubmitAnswer}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
              )}

              {/* Discussion Slide */}
              {currentContent.type === 'discussion' && (
                <div className="flex-1 flex flex-col">
                  <h2 className="text-5xl font-tanker text-marble-900 mb-8">
                    <MessageSquare className="inline w-12 h-12 text-purple-500 mr-4" />
                    {currentContent.title}
                  </h2>
                  <p className="text-xl font-hind italic text-gray-500 mb-10">{currentContent.content}</p>
                  
                  {currentContent.discussionPrompts && (
                    <div className="bg-purple-50 rounded-lg p-8 border border-purple-200 flex-1">
                      <h3 className="text-2xl font-lora font-semibold text-purple-900 mb-8">Discussion Points:</h3>
                      <ul className="space-y-4">
                        {currentContent.discussionPrompts.map((prompt, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-600 mr-6 text-2xl font-montserrat font-semibold">{index + 1}.</span>
                            <span className="text-2xl font-hind text-purple-800">{prompt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentContent.bulletPoints && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-marble-900 mb-3">Key Topics:</h3>
                      <ul className="space-y-2">
                        {currentContent.bulletPoints.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-500 mr-3">•</span>
                            <span className="text-marble-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Visualization Slide */}
              {currentContent.type === 'visualization' && (
                <div className="flex-1 flex flex-col">
                  <h2 className="text-5xl font-bold text-marble-900 mb-6">
                    <BarChart3 className="inline w-12 h-12 text-blue-500 mr-4" />
                    {currentContent.title}
                  </h2>
                  <p className="text-2xl text-marble-700 mb-8">{currentContent.content}</p>
                  
                  <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg border border-blue-200 overflow-auto min-h-[600px]">
                    {currentContent.visualizationType === 'temperature' && <TemperatureControl />}
                    {currentContent.visualizationType === 'context-window' && <ContextWindow />}
                    {currentContent.visualizationType === 'roi-calculator' && <ROICalculator />}
                    {currentContent.visualizationType === 'greenhouse-control' && <GreenhouseControl />}
                    {currentContent.visualizationType === 'ai-taxonomy-flowchart' && <AITaxonomyFlowchart />}
                    {currentContent.visualizationType === 'generative-ai-modalities-flowchart' && <GenerativeAIModalitiesFlowchart />}
                    {currentContent.visualizationType === 'prompt-examples' && <PromptExamples />}
                    {currentContent.visualizationType === 'ai-greenhouse-demo' && <AIGreenhouseDemo />}
                    {currentContent.visualizationType === 'document-processing-demo' && <DocumentProcessingDemo />}
                    {currentContent.visualizationType === 'digital-twin-ai-demo' && <DigitalTwinAIDemo />}
                    {currentContent.visualizationType === 'resource-dashboard' && (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">📊</div>
                        <p className="text-blue-800 font-semibold">
                          Resource Dashboard Visualization
                        </p>
                        <p className="text-blue-600 text-sm mt-2">
                          [Coming soon - Real-time resource monitoring]
                        </p>
                      </div>
                    )}
                    {currentContent.visualizationType === 'digital-twin' && (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏭</div>
                        <p className="text-blue-800 font-semibold">
                          Digital Twin Visualization
                        </p>
                        <p className="text-blue-600 text-sm mt-2">
                          [Coming soon - Virtual greenhouse replica]
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Demo Slide */}
              {currentContent.type === 'demo' && (
                <div className="flex-1 flex flex-col">
                  <h2 className="text-4xl font-tanker text-marble-900 mb-6">
                    <Monitor className="inline w-10 h-10 text-green-500 mr-3" />
                    {currentContent.title}
                  </h2>
                  <p className="text-xl font-hind text-marble-700 mb-8">{currentContent.content}</p>
                  
                  <div className="flex-1 bg-green-50 rounded-lg p-12 border-2 border-dashed border-green-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-6">🖥️</div>
                      <p className="text-green-800 font-semibold text-2xl">Live Demonstration</p>
                      <p className="text-green-600 mt-3 text-lg">Switch to demo application</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Resources */}
              {currentContent.resources && currentContent.resources.length > 0 && (
                <div className="mt-8 p-4 bg-marble-50 rounded-lg">
                  <h3 className="font-semibold text-marble-900 mb-2">Resources:</h3>
                  <div className="space-y-1">
                    {currentContent.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        className="text-blue-600 hover:text-blue-800 text-sm block"
                      >
                        → {resource.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Speaker Notes (Presenter Mode) */}
              {presenterMode && currentContent.speakerNotes && (
                <div className="mt-auto pt-6">
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h3 className="font-semibold text-yellow-900 mb-2 text-sm">Speaker Notes:</h3>
                    <p className="text-yellow-800 text-sm">{currentContent.speakerNotes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation and Controls */}
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
                    {currentSlide + 1} of {workshopSlides.length}
                  </span>
                  {currentContent.estimatedTime && (
                    <span className="text-xs text-marble-500">
                      Est: {Math.round(currentContent.estimatedTime / 60)} min
                    </span>
                  )}
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={currentSlide === workshopSlides.length - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentSlide === workshopSlides.length - 1
                      ? 'text-marble-400 cursor-not-allowed'
                      : 'text-marble-700 hover:bg-marble-200'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Dots Navigation */}
              {presenterMode && (
                <div className="mt-4 flex justify-center space-x-1 overflow-x-auto">
                  {workshopSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => handleSlideJump(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? `bg-${sectionColor}-500 w-8`
                          : slide.sectionId === currentContent.sectionId
                          ? `bg-${sectionColor}-300 hover:bg-${sectionColor}-400`
                          : 'bg-marble-300 hover:bg-marble-400'
                      }`}
                      title={`${slide.title} (${slide.sectionName})`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          {presenterMode && (
            <div className="mt-4 text-center text-xs text-marble-500">
              ← → Navigate slides · Space: Start/Stop timer · Ctrl+F: Toggle presenter mode
            </div>
          )}
        </div>
      </div>
      
      <JoinSessionModal isOpen={joinOpen} onJoined={onJoined} />
    </>
  )
}
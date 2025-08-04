'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, BookOpen, Zap, Target, TrendingUp, Lightbulb } from 'lucide-react'
import Image from 'next/image'

interface WorkshopSession {
  id: string
  title: string
  description: string
  format: string
  duration: string
  time: string
  day: 1 | 2 | 3
  icon: React.ReactNode
  category: string
  learningObjectives: string[]
  materials: string[]
  expert: Expert
}

interface Expert {
  id: string
  name: string
  role: string
  funFact: string
  photo: string
  color: string // tailwind hex or class prefix without bg-
  bio: string
}

const experts: Expert[] = [
  { id: 'cal', name: 'Cal Leung', role: 'Partner, AI Pontiff', funFact: '', photo: '/Cal.png', color: '#059669', bio: `Cal is tech adventurer driven by a lifelong curiosity of people, places, and systems. This passion has led to the exploration of how technology can solve real-world problems and shape the future of society.\n\nHe specializes in strategic planning and innovative problem solving, but is perhaps best known for his love of roping along talented individuals into new (ad)ventures.\n\nAs an AI enthusiast, Cal is committed to discovering how AI can bring positive change to industries and society, helping businesses and individuals implement AI to enhance performance and improve quality of life.` },
  { id: 'deji', name: 'Deji Erinle', role: 'Partner, AI Maven', funFact: '', photo: '/Deji.png', color: '#0284c7', bio: `Deji brings a sharp, analytical perspective to problem-solving, an approach significantly shaped by his experience navigating the complexities of financial advisory, particularly within insolvency.\n\nThis demanding background has equipped him with a keen ability to dissect intricate situations and identify crucial pathways toward clarity and efficiency.\n\nThis experience fuels Deji's fascination with the potential of artificial intelligence.\n\nAs an AI Maven, he explores how AI can enhance analytical capabilities, optimize complex processes, and support smarter decision-making across various domains. Leveraging his foundational knowledge in business analysis, Deji aims to apply AI tools to tackle sophisticated challenges.` },
  { id: 'simon', name: 'Simon Loewen', role: 'Partner, AI Fanatic', funFact: '', photo: '/Simon.png', color: '#7c3aed', bio: `Simon is a strong believer in the positive impact of artificial intelligence and aims to use this technology to benefit individuals and businesses. He has worked for fourteen years in commercial horticulture, focusing on technical sales and account management.\n\nHe applies his industry knowledge and practical experience to build and deploy AI-driven business solutions. Initially developing customized AI applications for the horticulture sector, including businesses such as producers, distributors, and manufacturers, Simon's objective is to make these new technologies more accessible and user-friendly, facilitating seamless integration into diverse business operations.` },
]

// Quick utility to pick an expert round-robin
let expertIndex = 0
const nextExpert = () => {
  const exp = experts[expertIndex % experts.length]
  expertIndex += 1
  return exp
}

const workshopSessions: WorkshopSession[] = [
  {
    id: 'session1',
    title: 'AI Fundamentals & Terminology',
    description: "Basic AI concepts and key terminology for greenhouse operations",
    format: 'Interactive Workshop',
    duration: '30 minutes',
    time: 'TBD',
    day: 1,
    icon: <BookOpen className="w-6 h-6" />,
    category: 'Strategy',
    learningObjectives: [
      'Master AI terminology and concepts',
      'Understand machine learning basics',
      'Explore computer vision applications',
      'Introduction to digital twins'
    ],
    materials: ['AI Fundamentals Guide', 'Glossary', 'Concept Cards'],
    expert: nextExpert()
  },
  {
    id: 'session2',
    title: 'Greenhouse AI Applications',
    description: 'Real-world AI applications in crop production optimization including climate, irrigation, and crop modeling',
    format: 'Case Study Review',
    duration: '45 minutes',
    time: 'TBD',
    day: 1,
    icon: <Lightbulb className="w-6 h-6" />,
    category: 'Technology',
    learningObjectives: [
      'Climate control AI systems',
      'Irrigation optimization techniques',
      'Crop modeling and yield prediction',
      'Data-driven decision making'
    ],
    materials: ['Case Studies', 'Application Examples', 'ROI Analysis'],
    expert: nextExpert()
  },
  {
    id: 'session3',
    title: 'Operational AI Systems',
    description: 'AI systems that enhance operational efficiency in packhouse optimization, labour planning, logistics coordination, and energy management',
    format: 'Interactive Demo',
    duration: '60 minutes',
    time: 'TBD',
    day: 1,
    icon: <TrendingUp className="w-6 h-6" />,
    category: 'Implementation',
    learningObjectives: [
      'Packhouse optimization systems',
      'AI-driven labour planning',
      'Logistics coordination automation',
      'Energy management solutions'
    ],
    materials: ['System Demos', 'Implementation Guide', 'Efficiency Metrics'],
    expert: nextExpert()
  },
  {
    id: 'session4',
    title: 'Data Requirements & Implementation',
    description: 'Understanding data needs, system integration, and practical implementation strategies for AI in greenhouse operations',
    format: 'Workshop Discussion',
    duration: '30 minutes',
    time: 'TBD',
    day: 1,
    icon: <Target className="w-6 h-6" />,
    category: 'Planning',
    learningObjectives: [
      'Data collection requirements',
      'System integration strategies',
      'ROI measurement techniques',
      'Success metrics definition'
    ],
    materials: ['Data Framework', 'Integration Checklist', 'Success Metrics'],
    expert: nextExpert()
  },
  {
    id: 'session5',
    title: 'Q&A & Discussion',
    description: 'Interactive discussion and questions specific to Big Marble Farms operations and implementation roadmap',
    format: 'Open Discussion',
    duration: '15 minutes',
    time: 'TBD',
    day: 1,
    icon: <Users className="w-6 h-6" />,
    category: 'Discussion',
    learningObjectives: [
      'Address BMF-specific challenges',
      'Develop implementation roadmap',
      'Define next steps',
      'Establish support network'
    ],
    materials: ['Discussion Guide', 'Action Plan Template', 'Contact List'],
    expert: nextExpert()
  }
]

export function WorkshopOverview() {
  const [hoveredSession, setHoveredSession] = useState<WorkshopSession | null>(null)
  const [hoveredExpert, setHoveredExpert] = useState<Expert | null>(null)

  return (
    <div className="bg-white rounded-xl border border-marble-200">
      <div className="bg-gradient-to-r from-greenhouse-600 to-marble-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Workshop Overview</h2>
        <p className="text-white text-opacity-90 text-base font-medium mb-0">
          This portal access is included complimentary with your AI Leadership Accelerator Workshop attendance.
        </p>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-marble-900 mb-2">Course Outline</h3>
          <p className="text-marble-700 mb-4">Introductory Training Module on AI for Enterprise Greenhouse Operations - a comprehensive 3-hour session designed to provide foundational knowledge and practical applications.</p>
          <div className="bg-marble-50 border border-marble-200 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div><strong>Duration:</strong> ~3 hours (2 hours + Q&A)</div>
              <div><strong>Format:</strong> On-site Interactive Session</div>
              <div><strong>Participants:</strong> Up to 5 per micro-cohort</div>
            </div>
          </div>
        </div>
        
        <div className="border border-marble-300 rounded-xl bg-white">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-center">
              <span className="px-6 py-2 rounded-full font-bold text-lg bg-greenhouse-600 text-white">Training Session</span>
            </div>
            <div className="space-y-4">
              {workshopSessions.map((session) => (
                <div
                  key={session.id}
                  className="group relative"
                  onMouseEnter={() => {
                    setHoveredSession(session)
                    setHoveredExpert(session.expert)
                  }}
                  onMouseLeave={() => {
                    setHoveredSession(null)
                    setHoveredExpert(null)
                  }}
                >
                  <div
                    className="border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md"
                    style={{
                      borderColor: hoveredSession?.id === session.id ? session.expert.color : '#e5e7eb',
                      backgroundColor: hoveredSession?.id === session.id ? `${session.expert.color}20` : 'white'
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-1" style={{ color: session.expert.color }}>
                        {session.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-marble-900 mb-1">{session.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-marble-600 mb-2">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {session.duration}
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {session.format}
                          </div>
                        </div>
                        <p className="text-sm text-marble-600">{session.description}</p>
                      </div>
                    </div>
                  </div>
                  {/* Hover Popup */}
                  {hoveredSession?.id === session.id && (
                    <div className="absolute z-[9999] left-0 right-0 top-full mt-2 bg-gradient-to-br from-greenhouse-900 to-marble-900 border-2 border-greenhouse-600 rounded-xl shadow-xl p-4 max-w-md">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-greenhouse-200">
                          <span className="font-semibold">{session.title}</span>
                          <span className="px-2 py-1 rounded bg-greenhouse-800 text-greenhouse-100">{session.format}</span>
                        </div>
                        <p className="text-greenhouse-100 text-xs mb-2">{session.description}</p>
                        <div className="flex items-center justify-between text-xs text-greenhouse-300 mb-2">
                          <span>Duration: {session.duration}</span>
                          <span className="px-2 py-1 rounded" style={{ backgroundColor: `${session.expert.color}20`, color: session.expert.color }}>{session.category}</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-greenhouse-200 text-xs mb-1">Learning Objectives</h5>
                          <ul className="text-xs text-greenhouse-100 space-y-1 mb-2">
                            {session.learningObjectives.map((objective, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2" style={{ color: session.expert.color }}>•</span>
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-greenhouse-200 text-xs mb-1">Materials</h5>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {session.materials.map((material, index) => (
                              <span key={index} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${session.expert.color}20`, color: session.expert.color }}>
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-greenhouse-300 text-xs italic">Key technical note: {session.category === 'Strategy' ? 'Frameworks: OKR, KPI mapping, business model canvas.' : session.category === 'Technology' ? 'AI methods: ML, digital twins, data pipelines.' : session.category === 'Implementation' ? 'Roadmapping, automation, workflow design.' : session.category === 'Planning' ? 'Pilot design, metrics, stakeholder mapping.' : session.category === 'Discussion' ? 'Interactive problem-solving, next steps planning.' : 'AI best practices, data sources, and integration.'}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experts Carousel (not full width) */}
        <div className="mt-10 max-w-4xl mx-auto flex flex-col items-center">
          <h3 className="text-lg font-semibold text-marble-900 mb-4">Meet Your Experts</h3>
          <div className="flex space-x-6 pb-4">
            {experts.map((exp) => {
              // Default: partially grey; on hover, assigned expert is full color, others are more grey
              let imgClass = 'rounded-full object-cover border-4 transition-all duration-200 grayscale opacity-90'
              if (hoveredSession) {
                if (hoveredSession.expert.id === exp.id) {
                  imgClass = 'rounded-full object-cover border-4 transition-all duration-200'
                } else {
                  imgClass = 'rounded-full object-cover border-4 transition-all duration-200 grayscale opacity-30'
                }
              } else if (hoveredExpert) {
                if (hoveredExpert.id === exp.id) {
                  imgClass = 'rounded-full object-cover border-4 transition-all duration-200'
                } else {
                  imgClass = 'rounded-full object-cover border-4 transition-all duration-200 grayscale opacity-30'
                }
              }
              return (
                <div 
                  key={exp.id} 
                  className="flex-shrink-0 flex flex-col items-center group" 
                  style={{ width: '120px' }}
                  onMouseEnter={() => setHoveredExpert(exp)}
                  onMouseLeave={() => setHoveredExpert(null)}
                >
                  <div className="relative">
                    <img
                      src={exp.photo}
                      alt={exp.name}
                      className={`w-[120px] h-[120px] rounded-full border-4 transition-all duration-200 object-cover ${imgClass.replace('rounded-full', '')}`}
                      style={{ borderColor: exp.color }}
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLDivElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div
                      className={`w-[120px] h-[120px] rounded-full border-4 transition-all duration-200 items-center justify-center text-white text-2xl font-bold hidden ${imgClass}`}
                      style={{ 
                        borderColor: exp.color,
                        backgroundColor: exp.color
                      }}
                    >
                      {exp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-gradient-to-br from-greenhouse-900 to-marble-900 border-2 border-greenhouse-600 rounded-xl shadow-xl p-4 text-xs text-greenhouse-100 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                      <p className="font-semibold text-red-600 mb-1">{exp.name}</p>
                      <p className="mb-1 italic text-greenhouse-300">{exp.role}</p>
                      <div className="whitespace-pre-line text-greenhouse-100">{exp.bio}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 
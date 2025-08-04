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
  { id: 'drea', name: 'Drea Valim', role: 'Partner, AI Connector', funFact: '', photo: '/Drea.png', color: '#be123c', bio: `Drea is a relationship builder at heart, with a sharp instinct for uncovering human needs and translating them into strategies that help organizations unlock their full potential—whether through AI or mental wellbeing.\n\nWith a background in behavioral science, mental health innovation, B2B, B2C, and enterprise training, she's passionate about leveraging AI to improve how people think, work, communicate, and thrive.\n\nDrea specializes in translating organizational goals into AI-aligned strategies that enhance resilience, reduce risk, and drive scalable ROI. She believes the key to successful AI integration isn't just the tech—it's the people, culture, and clarity behind it.\n\nAs an AI Connector, she helps teams and organizations navigate change with empathy, precision, and a touch of magic. Whether she's co-designing solutions with clients or sparking the next big idea over a coffee chat, Drea brings positivity, heart, hustle, and a human-first lens to every challenge.` },
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
    id: 'day1-morning',
    title: 'AI Leadership Foundations',
    description: "Kick off your AI leadership journey with strategic insights and foundational concepts for greenhouse business transformation.",
    format: 'Interactive Workshop',
    duration: '2 hours',
    time: '9:00 AM - 11:00 AM',
    day: 1,
    icon: <Target className="w-6 h-6" />,
    category: 'Strategy',
    learningObjectives: [
              "Understand AI's role in modern Horticulture",
      'Identify leadership opportunities in AI adoption',
      'Develop strategic thinking for AI implementation'
    ],
    materials: ['AI Strategy Workbook', 'Case Studies', 'Leadership Assessment'],
    expert: nextExpert()
  },
  {
    id: 'day1-midmorning',
    title: 'AI Tools Discovery & Evaluation',
    description: 'Explore the AI tools landscape and learn systematic approaches to evaluate and select the right tools for your operations.',
    format: 'Hands-on Demo',
    duration: '1.5 hours',
    time: '11:15 AM - 12:45 PM',
    day: 1,
    icon: <Zap className="w-6 h-6" />,
    category: 'Tools',
    learningObjectives: [
      'Navigate the AI tools ecosystem',
      'Evaluate tool suitability for specific use cases',
      'Understand ROI considerations for AI investments'
    ],
    materials: ['AI Tools Catalog', 'Evaluation Framework', 'ROI Calculator'],
    expert: nextExpert()
  },
  {
    id: 'day1-afternoon',
    title: 'Workflow Automation Workshop',
    description: 'Design and implement automated workflows to streamline your greenhouse operations and increase efficiency.',
    format: 'Group Exercise',
    duration: '2.5 hours',
    time: '2:00 PM - 4:30 PM',
    day: 1,
    icon: <TrendingUp className="w-6 h-6" />,
    category: 'Implementation',
    learningObjectives: [
      'Map current workflows and identify automation opportunities',
      'Design automated processes using AI tools',
      'Create implementation roadmaps for automation projects'
    ],
    materials: ['Workflow Mapping Templates', 'Automation Tools', 'Implementation Guide'],
    expert: nextExpert()
  },
  {
    id: 'day1-evening',
    title: 'Digital Twin Energy Simulation',
    description: 'Experience the power of digital twins through hands-on simulation of energy optimization in greenhouse environments.',
    format: 'Interactive Simulation',
    duration: '1.5 hours',
    time: '5:00 PM - 6:30 PM',
    day: 1,
    icon: <Lightbulb className="w-6 h-6" />,
    category: 'Advanced',
    learningObjectives: [
      'Understand digital twin technology and applications',
      'Simulate energy optimization scenarios',
      'Analyze cost-benefit of energy efficiency improvements'
    ],
    materials: ['Digital Twin Platform', 'Energy Data Sets', 'Simulation Scenarios'],
    expert: nextExpert()
  },
  {
    id: 'day2-morning',
    title: 'Pilot Project Design',
    description: 'Design your first AI pilot project with expert guidance and peer collaboration to ensure successful implementation.',
    format: 'Design Sprint',
    duration: '2.5 hours',
    time: '9:00 AM - 11:30 AM',
    day: 2,
    icon: <BookOpen className="w-6 h-6" />,
    category: 'Planning',
    learningObjectives: [
      'Define clear pilot project objectives and success metrics',
      'Design pilot project scope and timeline',
      'Identify key stakeholders and resource requirements'
    ],
    materials: ['Pilot Project Template', 'Success Metrics Framework', 'Stakeholder Map'],
    expert: nextExpert()
  },
  {
    id: 'day2-midmorning',
    title: 'Change Management Strategies',
    description: 'Learn proven strategies for leading organizational change and ensuring successful AI adoption across your team.',
    format: 'Case Study Discussion',
    duration: '1.5 hours',
    time: '11:45 AM - 1:15 PM',
    day: 2,
    icon: <Users className="w-6 h-6" />,
    category: 'Leadership',
    learningObjectives: [
      'Understand change management principles for AI adoption',
      'Develop communication strategies for AI initiatives',
      'Build team buy-in and engagement for AI projects'
    ],
    materials: ['Change Management Playbook', 'Communication Templates', 'Team Engagement Tools'],
    expert: nextExpert()
  },
  {
    id: 'day2-afternoon',
    title: 'Implementation Roadmapping',
    description: 'Create a comprehensive 90-day implementation roadmap for your AI initiatives with actionable milestones and timelines.',
    format: 'Workshop & Planning',
    duration: '2 hours',
    time: '2:00 PM - 4:00 PM',
    day: 2,
    icon: <Calendar className="w-6 h-6" />,
    category: 'Execution',
    learningObjectives: [
      'Develop detailed implementation timelines',
      'Create milestone tracking systems',
      'Plan resource allocation and risk mitigation'
    ],
    materials: ['Roadmap Template', 'Milestone Tracker', 'Risk Assessment Tool'],
    expert: nextExpert()
  },
  {
    id: 'day2-evening',
    title: 'Future Vision & Next Steps',
    description: 'Envision the future of AI in agriculture and create your personal action plan for continued AI leadership development.',
    format: 'Visioning Session',
    duration: '1 hour',
    time: '4:15 PM - 5:15 PM',
    day: 2,
    icon: <Target className="w-6 h-6" />,
    category: 'Vision',
    learningObjectives: [
      'Envision long-term AI transformation goals',
      'Create personal development plans for AI leadership',
      'Establish ongoing learning and support networks'
    ],
    materials: ['Vision Board Template', 'Personal Development Plan', 'Network Directory'],
    expert: nextExpert()
  },
  {
    id: 'day3-morning',
    title: 'Mapping AI to Business Strategy',
    description: 'Connect AI initiatives directly to KPIs and competitive edge with hands-on frameworks.',
    format: 'Strategy Workshop',
    duration: '2 hours',
    time: '9:00 AM - 11:00 AM',
    day: 3,
    icon: <TrendingUp className="w-6 h-6" />,
    category: 'Strategy',
    learningObjectives: [
      'Link AI initiatives to measurable business outcomes',
      'Identify strategic opportunities for AI',
      'Prioritize projects based on impact'
    ],
    materials: ['Strategy Canvas', 'KPI Library', 'Impact Matrix'],
    expert: nextExpert()
  },
  {
    id: 'day3-midmorning',
    title: 'Advanced CEA Systems Overview',
    description: 'Deep dive into digital twins, machine-learning forecasting, and data-driven greenhouse management.',
    format: 'Tech Briefing',
    duration: '1.5 hours',
    time: '11:15 AM - 12:45 PM',
    day: 3,
    icon: <Lightbulb className="w-6 h-6" />,
    category: 'Technology',
    learningObjectives: [
      'Understand advanced controlled-environment agriculture systems',
      'Explore predictive analytics for crop steering',
      'Assess digital-twin applications'
    ],
    materials: ['CEA Tech Deck', 'Case Studies', 'Vendor Matrix'],
    expert: nextExpert()
  },
  {
    id: 'day3-afternoon',
    title: 'Ethical Oversight & Responsible AI',
    description: 'Establish governance, privacy, and bias-mitigation practices for sustainable AI deployment.',
    format: 'Policy Workshop',
    duration: '1.5 hours',
    time: '2:00 PM - 3:30 PM',
    day: 3,
    icon: <Users className="w-6 h-6" />,
    category: 'Governance',
    learningObjectives: [
      'Identify ethical risks in AI systems',
      'Define governance structures',
      'Create an AI ethics checklist'
    ],
    materials: ['Governance Framework', 'Risk Register', 'Checklist Template'],
    expert: nextExpert()
  },
  {
    id: 'day3-evening',
    title: 'Closing & Next-Step Commitments',
    description: 'Wrap-up reflections, share insights, and commit to actionable next steps for AI leadership.',
    format: 'Reflection Session',
    duration: '1 hour',
    time: '4:00 PM - 5:00 PM',
    day: 3,
    icon: <BookOpen className="w-6 h-6" />,
    category: 'Reflection',
    learningObjectives: [
      'Synthesize key learnings',
      'Define personal action plans',
      'Establish peer accountability'
    ],
    materials: ['Reflection Workbook', 'Action Plan Template', 'Peer Network List'],
    expert: nextExpert()
  }
]

export function WorkshopOverview() {
  const [hoveredSession, setHoveredSession] = useState<WorkshopSession | null>(null)
  const [hoveredExpert, setHoveredExpert] = useState<Expert | null>(null)
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3>(1)

  const day1Sessions = workshopSessions.filter(session => session.day === 1)
  const day2Sessions = workshopSessions.filter(session => session.day === 2)
  const day3Sessions = workshopSessions.filter(session => session.day === 3)
  const sessionsToShow = selectedDay === 1 ? day1Sessions : selectedDay === 2 ? day2Sessions : day3Sessions

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
          <h3 className="text-xl font-semibold text-marble-900 mb-2">Program Outline</h3>
          <p className="text-marble-700 mb-4">Your 3-Day AI Leadership Accelerator Journey is designed to give you strategic insight, hands-on experience, and a clear roadmap for AI leadership in Horticulture.</p>
        </div>
        <div className="flex items-center justify-center mb-6 space-x-4">
          <button
            className={`flex items-center px-6 py-2 rounded-full font-bold transition-colors duration-200 focus:outline-none text-lg ${selectedDay === 1 ? 'bg-greenhouse-600 text-white' : 'bg-marble-200 text-marble-900'}`}
            onClick={() => setSelectedDay(1)}
          >
            Day 1
          </button>
          <button
            className={`flex items-center px-6 py-2 rounded-full font-bold transition-colors duration-200 focus:outline-none text-lg ${selectedDay === 2 ? 'bg-blue-600 text-white' : 'bg-marble-200 text-marble-900'}`}
            onClick={() => setSelectedDay(2)}
          >
            Day 2
          </button>
          <button
            className={`flex items-center px-6 py-2 rounded-full font-bold transition-colors duration-200 focus:outline-none text-lg ${selectedDay === 3 ? 'bg-purple-600 text-white' : 'bg-marble-200 text-marble-900'}`}
            onClick={() => setSelectedDay(3)}
          >
            Day 3
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full border border-marble-300 rounded-xl">
          {[1,2,3].map((day) => (
            <div key={day} className={selectedDay !== day ? 'opacity-40 grayscale pointer-events-none' : ''} style={{ minWidth: 0, borderRight: day !== 3 ? '1px solid #e5e7eb' : 'none', background: '#fff' }}>
              <div className="mb-4 flex items-center justify-center">
                <span className={`px-4 py-2 rounded-full font-bold text-lg ${selectedDay === day ? 'bg-marble-900 text-white' : 'bg-marble-200 text-marble-700'}`}>Day {day}</span>
              </div>
              <div className="space-y-4">
                {(day === 1 ? day1Sessions : day === 2 ? day2Sessions : day3Sessions).map((session) => (
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
                          <div className="flex items-center space-x-4 text-sm text-marble-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {session.time}
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              {session.format}
                            </div>
                          </div>
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
                          <div className="text-greenhouse-300 text-xs italic">Key technical note: {session.category === 'Strategy' ? 'Frameworks: OKR, KPI mapping, business model canvas.' : session.category === 'Technology' ? 'AI methods: ML, digital twins, data pipelines.' : session.category === 'Governance' ? 'Ethics, privacy, bias mitigation, compliance.' : session.category === 'Implementation' ? 'Roadmapping, automation, workflow design.' : session.category === 'Planning' ? 'Pilot design, metrics, stakeholder mapping.' : session.category === 'Leadership' ? 'Change management, communication, team engagement.' : session.category === 'Vision' ? 'Long-term planning, personal development, networks.' : 'AI best practices, data sources, and integration.'}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
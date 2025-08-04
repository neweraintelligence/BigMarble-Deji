'use client'

import { useState } from 'react'
import Image from 'next/image'

interface StatsProps {
  stats: {
    modules_completed: number
    total_modules: number
    time_spent_minutes: number
    progress_percentage: number
  }
}

export function DashboardStats({ stats }: StatsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const getTooltipContent = (cardType: string) => {
    switch (cardType) {
      case 'modules':
        return `You've completed ${stats.modules_completed} out of ${stats.total_modules} modules in your learning path. ${stats.total_modules - stats.modules_completed} modules remaining.`
      case 'time':
        const hours = Math.floor(stats.time_spent_minutes / 60)
        const minutes = stats.time_spent_minutes % 60
        return `Total time spent learning: ${hours}h ${minutes}m. Average of ${Math.round(stats.time_spent_minutes / Math.max(stats.modules_completed, 1))} minutes per completed module.`
      case 'progress':
        const remainingModules = stats.total_modules - stats.modules_completed
        return `Overall completion rate: ${stats.progress_percentage}%. ${remainingModules} modules left to complete your AI leadership journey.`
      default:
        return ''
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        className="bg-white rounded-xl p-6 border-2 border-marble-200 hover:border-greenhouse-300 hover:shadow-lg transition-all duration-200 cursor-pointer relative group"
        onMouseEnter={() => setHoveredCard('modules')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-marble-600">Modules Completed</p>
            <p className="text-3xl font-bold text-marble-900">
              {stats.modules_completed}
            </p>
            <p className="text-sm text-marble-500">of {stats.total_modules}</p>
          </div>
          <div className="w-12 h-12 bg-greenhouse-100 rounded-full flex items-center justify-center group-hover:bg-greenhouse-200 transition-colors duration-200">
            <Image src="/greenhouse-emoji.png" alt="" width={32} height={32} className="w-8 h-8" />
          </div>
        </div>
        {hoveredCard === 'modules' && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-marble-900 text-white text-sm rounded-lg shadow-lg z-10 w-64 text-center">
            {getTooltipContent('modules')}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-marble-900"></div>
          </div>
        )}
      </div>

      <div 
        className="bg-white rounded-xl p-6 border-2 border-marble-200 hover:border-greenhouse-300 hover:shadow-lg transition-all duration-200 cursor-pointer relative group"
        onMouseEnter={() => setHoveredCard('time')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-marble-600">Time Spent</p>
            <p className="text-3xl font-bold text-marble-900">
              {Math.floor(stats.time_spent_minutes / 60)}h
            </p>
            <p className="text-sm text-marble-500">learning time</p>
          </div>
          <div className="w-12 h-12 bg-greenhouse-100 rounded-full flex items-center justify-center group-hover:bg-greenhouse-200 transition-colors duration-200">
            <Image src="/time-spent.png" alt="" width={32} height={32} className="w-8 h-8" />
          </div>
        </div>
        {hoveredCard === 'time' && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-marble-900 text-white text-sm rounded-lg shadow-lg z-10 w-64 text-center">
            {getTooltipContent('time')}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-marble-900"></div>
          </div>
        )}
      </div>

      <div 
        className="bg-white rounded-xl p-6 border-2 border-marble-200 hover:border-greenhouse-300 hover:shadow-lg transition-all duration-200 cursor-pointer relative group"
        onMouseEnter={() => setHoveredCard('progress')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-marble-600">Progress</p>
            <p className="text-3xl font-bold text-marble-900">
              {stats.progress_percentage}%
            </p>
            <p className="text-sm text-marble-500">overall completion</p>
          </div>
          <div className="w-12 h-12 bg-greenhouse-100 rounded-full flex items-center justify-center group-hover:bg-greenhouse-200 transition-colors duration-200">
            <Image src="/progress.png" alt="" width={32} height={32} className="w-8 h-8" />
          </div>
        </div>
        {hoveredCard === 'progress' && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-marble-900 text-white text-sm rounded-lg shadow-lg z-10 w-64 text-center">
            {getTooltipContent('progress')}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-marble-900"></div>
          </div>
        )}
      </div>
    </div>
  )
}
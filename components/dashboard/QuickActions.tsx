'use client'

import Link from 'next/link'

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl p-6 border border-marble-200">
      <h3 className="text-lg font-semibold text-marble-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/tools#curated-tools" className="p-4 bg-greenhouse-50 border border-greenhouse-200 rounded-lg hover:bg-greenhouse-100 transition-colors flex flex-col items-center justify-center">
          <div className="text-2xl mb-2">🛠️</div>
          <div className="text-sm font-medium text-marble-900">Curated Tools</div>
        </Link>
        <Link href="/modules" className="p-4 bg-greenhouse-50 border border-greenhouse-200 rounded-lg hover:bg-greenhouse-100 transition-colors flex flex-col items-center justify-center">
          <div className="text-2xl mb-2">📚</div>
          <div className="text-sm font-medium text-marble-900">Modules</div>
        </Link>
        <Link href="/pilot" className="p-4 bg-greenhouse-50 border border-greenhouse-200 rounded-lg hover:bg-greenhouse-100 transition-colors flex flex-col items-center justify-center">
          <div className="text-2xl mb-2">🎯</div>
                        <div className="text-sm font-medium text-marble-900">Workflow Planner</div>
        </Link>
      </div>
    </div>
  )
}
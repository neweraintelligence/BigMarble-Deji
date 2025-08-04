'use client'

interface RecentActivityProps {
  userId: string
}

export function RecentActivity({ userId }: RecentActivityProps) {
  const activities = [
    {
      id: 1,
      action: 'Completed AI Fundamentals',
      time: '2 hours ago',
      type: 'module'
    },
    {
      id: 2,
      action: 'Selected 5 AI tools',
      time: '1 day ago',
      type: 'exercise'
    },
    {
      id: 3,
      action: 'Chat with AI Assistant',
      time: '2 days ago',
      type: 'chat'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 border border-marble-200">
      <h3 className="text-lg font-semibold text-marble-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-greenhouse-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-marble-900">{activity.action}</p>
              <p className="text-xs text-marble-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
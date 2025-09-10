'use client'

import React, { useState } from 'react'

export function AIGreenhouseDemo() {
  const [activeDemo, setActiveDemo] = useState('dashboard')
  const [query, setQuery] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  const demoQueries = {
    'Why are labor costs up this week?': 'Labor hours increased 23% due to harvesting premium tomatoes 3 days early to meet Loblaws delivery deadline. This decision generated $4,200 additional revenue, making the overtime cost-effective.',
    'What should we prioritize next week?': 'Focus on Zone 1 climate optimization - current settings may reduce yield by 8%. Recommended: Increase nighttime temperature by 2°C and reduce humidity to 65%. Expected ROI: $1,800/week.',
    'Show me energy patterns when yield was highest': 'Analyzing periods with top 10% yields... Energy consumption averaged 15% lower during peak yield weeks due to optimal temperature cycling. Pattern: 72°F nights, 78°F days, with CO2 at 1200ppm during photosynthesis hours.',
    'Create a slice: tomato variety vs customer satisfaction': 'Cross-referencing tomato varieties with customer feedback scores... Cherry tomatoes to premium restaurants: 96% satisfaction. Beefsteak to grocery chains: 89% satisfaction. Roma for processing: 94% satisfaction. Recommendation: Increase cherry production by 15%.',
    'Find connections between weather and labor efficiency': 'Discovered correlation: Labor efficiency drops 12% on days with external temperature >85°F. Workers 23% more productive during overcast conditions. Recommend scheduling harvest work during cooler morning hours and cloudy days.'
  }

  const handleQuerySubmit = (selectedQuery: string) => {
    setQuery(selectedQuery)
    setTimeout(() => {
      setAiResponse(demoQueries[selectedQuery as keyof typeof demoQueries] || 'AI analysis in progress...')
    }, 1000)
  }

  const kpiData = [
    { metric: 'Yield', value: '847 lbs/week', change: '+12%', ai: 'Yield up 12% vs last month due to optimal humidity control in Zones 2-4' },
    { metric: 'Energy Cost', value: '$2,340', change: '+15%', ai: 'Energy 15% above normal due to cold snap protection. AI optimized heating zones, preventing $8,200 in crop loss while adding only $340 in energy costs' },
    { metric: 'Labor Hours', value: '156 hrs', change: '+23%', ai: 'Labor hours increased for early premium harvest. Decision generated $4,200 additional revenue' },
    { metric: 'Quality Score', value: '94%', change: '+3%', ai: 'Quality improved through AI-optimized nutrition timing and climate control' }
  ]

  return (
    <div className="w-full h-full bg-gray-50 p-4">
      {/* Demo Selector */}
      <div className="mb-4 flex space-x-2">
        {['dashboard', 'chat', 'data-slicing', 'alerts', 'predictions'].map((demo) => (
          <button
            key={demo}
            onClick={() => setActiveDemo(demo)}
            className={`px-3 py-1 rounded text-sm font-medium ${
              activeDemo === demo 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            {demo === 'data-slicing' ? 'Data Slicing' : demo.charAt(0).toUpperCase() + demo.slice(1)}
          </button>
        ))}
      </div>

      {/* AI Dashboard Demo */}
      {activeDemo === 'dashboard' && (
        <div className="grid grid-cols-2 gap-4 h-96">
          {/* Traditional KPIs */}
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-3">Traditional Dashboard</h3>
            <div className="space-y-3">
              {kpiData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{item.metric}</span>
                  <div className="text-right">
                    <div className="font-medium">{item.value}</div>
                    <div className={`text-xs ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI-Enhanced Insights */}
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-3">AI-Generated Insights</h3>
            <div className="space-y-3">
              {kpiData.map((item, idx) => (
                <div key={idx} className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <div className="font-medium text-blue-800 text-sm mb-1">{item.metric}</div>
                  <div className="text-xs text-blue-700 leading-relaxed">{item.ai}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Natural Language Chat Demo */}
      {activeDemo === 'chat' && (
        <div className="bg-white rounded-lg p-4 border h-96">
          <h3 className="font-semibold text-gray-800 mb-3">Ask AI About Your Operations</h3>
          
          {/* Sample Questions */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Try these questions:</p>
            <div className="space-y-2">
              {Object.keys(demoQueries).map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuerySubmit(q)}
                  className="block text-left w-full p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          {query && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-lg px-3 py-2 max-w-xs text-sm">
                  {query}
                </div>
              </div>
              
              {aiResponse && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-md text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        AI
                      </div>
                      <div className="text-gray-800">{aiResponse}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Data Slicing Demo */}
      {activeDemo === 'data-slicing' && (
        <div className="bg-white rounded-lg p-4 border h-96">
          <h3 className="font-semibold text-gray-800 mb-3">AI Data Slicing - Create New Insights</h3>
          
          {/* Data Slicing Examples */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">Ask AI to create new data combinations and find hidden patterns:</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                'Show me energy patterns when yield was highest',
                'Create a slice: tomato variety vs customer satisfaction', 
                'Find connections between weather and labor efficiency'
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuerySubmit(q)}
                  className="text-left p-3 text-sm bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded border border-purple-200"
                >
                  <span className="font-medium text-purple-700">🔗</span> "{q}"
                </button>
              ))}
            </div>
          </div>

          {/* Response Area */}
          {query && query.includes('slice') || query.includes('patterns') || query.includes('connections') ? (
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-purple-600 text-white rounded-lg px-3 py-2 max-w-md text-sm">
                  {query}
                </div>
              </div>
              
              {aiResponse && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg px-4 py-3 max-w-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        🧠
                      </div>
                      <div>
                        <div className="font-medium text-purple-800 text-sm mb-1">AI Data Analyst</div>
                        <div className="text-sm text-gray-800 leading-relaxed">{aiResponse}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : query ? (
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-lg px-3 py-2 max-w-xs text-sm">
                  {query}
                </div>
              </div>
              
              {aiResponse && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-md text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        AI
                      </div>
                      <div className="text-gray-800">{aiResponse}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                🔗
              </div>
              <p className="text-sm">Select a data slicing query to see AI create new insights</p>
            </div>
          )}
        </div>
      )}

      {/* Smart Alerts Demo */}
      {activeDemo === 'alerts' && (
        <div className="space-y-4 h-96 overflow-y-auto">
          <h3 className="font-semibold text-gray-800">Smart Alert System</h3>
          
          {/* Traditional vs AI Alerts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium text-gray-700 mb-3">Traditional Alerts</h4>
              <div className="space-y-2">
                <div className="p-2 bg-red-50 border-l-4 border-red-400 text-sm">
                  ⚠️ Temperature: 89°F
                </div>
                <div className="p-2 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
                  ⚠️ CO2 levels low
                </div>
                <div className="p-2 bg-orange-50 border-l-4 border-orange-400 text-sm">
                  ⚠️ Humidity: 75%
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium text-gray-700 mb-3">AI-Enhanced Alerts</h4>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border-l-4 border-red-400">
                  <div className="font-medium text-red-800 text-sm">Zone 3 Temperature Critical</div>
                  <div className="text-xs text-red-700 mt-1">
                    89°F detected - 4°F above optimal for tomato flowering. Reduce heating 20% and increase ventilation. 
                    Cost to fix: $45. Risk if ignored: $680 yield loss.
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                  <div className="font-medium text-yellow-800 text-sm">CO2 Optimization Opportunity</div>
                  <div className="text-xs text-yellow-700 mt-1">
                    Zone 2 CO2 at 320ppm - 28% below optimal for current growth stage. 
                    Recommend immediate supplementation. Expected benefit: $680 yield protection.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Predictions Demo */}
      {activeDemo === 'predictions' && (
        <div className="bg-white rounded-lg p-4 border h-96">
          <h3 className="font-semibold text-gray-800 mb-4">AI Predictions & Recommendations</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  📈
                </div>
                <div>
                  <div className="font-medium text-green-800">Yield Forecast - Next Week</div>
                  <div className="text-sm text-green-700 mt-1">
                    Based on current plant health, weather patterns, and growth stage analysis, 
                    expect 12% yield increase next week. Peak harvest window: Tuesday-Thursday. 
                    Recommend scheduling 3 additional workers.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  💡
                </div>
                <div>
                  <div className="font-medium text-blue-800">Optimization Recommendation</div>
                  <div className="text-sm text-blue-700 mt-1">
                    Nitrogen levels in Zone 3 optimal for fruit development. Recommend reducing feeding 20% 
                    next 5 days to concentrate flavors for premium market. This typically increases selling price 12%.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  🎯
                </div>
                <div>
                  <div className="font-medium text-purple-800">Market Intelligence</div>
                  <div className="text-sm text-purple-700 mt-1">
                    Premium tomato demand up 30% due to competitor supply shortage. 
                    Recommend increasing prices 18% for next 2 weeks. Expected additional revenue: $3,200.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
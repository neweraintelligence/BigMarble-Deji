'use client'

import React, { useState } from 'react'

export function DigitalTwinAIDemo() {
  const [selectedZone, setSelectedZone] = useState('zone1')
  const [scenarioMode, setScenarioMode] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState<any>(null)

  const zones = {
    zone1: {
      name: "Zone 1 - Cherry Tomatoes",
      temp: 72,
      humidity: 68,
      co2: 850,
      yield: "projected: 245 lbs",
      status: "optimal"
    },
    zone2: {
      name: "Zone 2 - Beefsteak Tomatoes", 
      temp: 75,
      humidity: 72,
      co2: 920,
      yield: "projected: 310 lbs",
      status: "suboptimal"
    },
    zone3: {
      name: "Zone 3 - Roma Tomatoes",
      temp: 74,
      humidity: 65,
      co2: 780,
      yield: "projected: 280 lbs", 
      status: "optimal"
    }
  }

  const runOptimization = () => {
    setScenarioMode(true)
    setTimeout(() => {
      setOptimizationResults({
        tempAdjustment: "+2°F",
        humidityAdjustment: "-3%",
        co2Adjustment: "+150ppm",
        yieldIncrease: "+8%",
        energyImpact: "+$45/week",
        netBenefit: "+$680/week",
        explanation: "AI analysis shows current settings are 8% below optimal for fruiting stage. Recommended adjustments will increase photosynthesis efficiency while maintaining fruit quality. Energy cost increase is offset by yield improvement.",
        timeline: "Implement gradually over 48 hours to prevent plant shock"
      })
    }, 2000)
  }

  return (
    <div className="w-full h-full bg-gray-50 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Digital Twin AI Optimization</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Zone Selector */}
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium text-gray-800 mb-3">Select Zone</h4>
          <div className="space-y-2">
            {Object.entries(zones).map(([key, zone]) => (
              <button
                key={key}
                onClick={() => setSelectedZone(key)}
                className={`w-full p-3 text-left rounded border ${
                  selectedZone === key 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="font-medium text-sm">{zone.name}</div>
                <div className={`text-xs mt-1 ${
                  zone.status === 'optimal' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {zone.status}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current State */}
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium text-gray-800 mb-3">Current Conditions</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Temperature:</span>
              <span className="text-sm font-medium">{zones[selectedZone as keyof typeof zones].temp}°F</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Humidity:</span>
              <span className="text-sm font-medium">{zones[selectedZone as keyof typeof zones].humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">CO2:</span>
              <span className="text-sm font-medium">{zones[selectedZone as keyof typeof zones].co2}ppm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Yield:</span>
              <span className="text-sm font-medium">{zones[selectedZone as keyof typeof zones].yield}</span>
            </div>
            
            {!scenarioMode && (
              <button
                onClick={runOptimization}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Run AI Optimization
              </button>
            )}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium text-gray-800 mb-3">AI Recommendations</h4>
          
          {!scenarioMode && (
            <div className="text-center py-8 text-gray-500">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                🤖
              </div>
              <p className="text-sm">Click "Run AI Optimization" to see recommendations</p>
            </div>
          )}

          {scenarioMode && !optimizationResults && (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                ⚙️
              </div>
              <p className="text-sm text-gray-600">AI analyzing optimal conditions...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
          )}

          {optimizationResults && (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded border border-green-200">
                <div className="font-medium text-green-800 text-sm">Optimization Results</div>
                <div className="text-xs text-green-700 mt-1">
                  <div>Temperature: {optimizationResults.tempAdjustment}</div>
                  <div>Humidity: {optimizationResults.humidityAdjustment}</div>
                  <div>CO2: {optimizationResults.co2Adjustment}</div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <div className="font-medium text-blue-800 text-sm">Expected Impact</div>
                <div className="text-xs text-blue-700 mt-1">
                  <div>Yield increase: <span className="font-medium">{optimizationResults.yieldIncrease}</span></div>
                  <div>Energy cost: <span className="text-orange-600">{optimizationResults.energyImpact}</span></div>
                  <div>Net benefit: <span className="font-medium text-green-600">{optimizationResults.netBenefit}</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Analysis Explanation */}
      {optimizationResults && (
        <div className="bg-white rounded-lg border p-4 mb-4">
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            <span className="w-6 h-6 bg-purple-500 text-white rounded-full text-xs flex items-center justify-center mr-2">AI</span>
            Optimization Analysis
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            {optimizationResults.explanation}
          </p>
          <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
            <div className="font-medium text-yellow-800 text-sm">Implementation Timeline</div>
            <div className="text-xs text-yellow-700 mt-1">{optimizationResults.timeline}</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {optimizationResults && (
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Apply Recommendations
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Schedule Gradual Implementation
          </button>
          <button 
            onClick={() => {setScenarioMode(false); setOptimizationResults(null)}}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Reset Simulation
          </button>
        </div>
      )}

      {/* Performance Metrics */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-3 text-center">
          <div className="text-2xl font-bold text-green-600">98.5%</div>
          <div className="text-xs text-gray-600">Digital Twin Accuracy</div>
        </div>
        <div className="bg-white rounded-lg border p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">12%</div>
          <div className="text-xs text-gray-600">Avg Yield Improvement</div>
        </div>
        <div className="bg-white rounded-lg border p-3 text-center">
          <div className="text-2xl font-bold text-purple-600">15min</div>
          <div className="text-xs text-gray-600">Analysis Time</div>
        </div>
        <div className="bg-white rounded-lg border p-3 text-center">
          <div className="text-2xl font-bold text-orange-600">$2.3K</div>
          <div className="text-xs text-gray-600">Weekly Value</div>
        </div>
      </div>
    </div>
  )
}
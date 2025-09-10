'use client'

import { useState, useEffect } from 'react'
import { Thermometer, Droplets, Sun, Wind, Activity } from 'lucide-react'

export function GreenhouseControl() {
  const [temperature, setTemperature] = useState(22)
  const [humidity, setHumidity] = useState(70)
  const [lightLevel, setLightLevel] = useState(60)
  const [co2Level, setCo2Level] = useState(800)
  const [aiEnabled, setAiEnabled] = useState(false)
  
  // AI optimization targets
  const optimalTemp = 23
  const optimalHumidity = 75
  const optimalLight = 80
  const optimalCO2 = 1000

  // Simulate AI optimization
  useEffect(() => {
    if (!aiEnabled) return

    const interval = setInterval(() => {
      setTemperature(prev => {
        const diff = optimalTemp - prev
        return prev + diff * 0.1
      })
      setHumidity(prev => {
        const diff = optimalHumidity - prev
        return prev + diff * 0.1
      })
      setLightLevel(prev => {
        const diff = optimalLight - prev
        return prev + diff * 0.1
      })
      setCo2Level(prev => {
        const diff = optimalCO2 - prev
        return prev + diff * 0.1
      })
    }, 500)

    return () => clearInterval(interval)
  }, [aiEnabled])

  const getStatusColor = (value: number, optimal: number, tolerance: number = 5) => {
    const diff = Math.abs(value - optimal)
    if (diff < tolerance) return 'green'
    if (diff < tolerance * 2) return 'yellow'
    return 'red'
  }

  const calculateEfficiency = () => {
    const tempScore = 100 - Math.abs(temperature - optimalTemp) * 5
    const humidityScore = 100 - Math.abs(humidity - optimalHumidity) * 2
    const lightScore = 100 - Math.abs(lightLevel - optimalLight) * 1.5
    const co2Score = 100 - Math.abs(co2Level - optimalCO2) * 0.05
    
    return Math.max(0, Math.min(100, (tempScore + humidityScore + lightScore + co2Score) / 4))
  }

  const efficiency = calculateEfficiency()

  return (
    <div className="space-y-6">
      {/* AI Control Toggle */}
      <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Greenhouse AI Control System</h3>
            <p className="text-sm text-gray-600 mt-1">
              {aiEnabled ? 'AI is optimizing conditions' : 'Manual control mode'}
            </p>
          </div>
          <button
            onClick={() => setAiEnabled(!aiEnabled)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              aiEnabled 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {aiEnabled ? 'AI ACTIVE' : 'ACTIVATE AI'}
          </button>
        </div>

        {aiEnabled && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              🤖 AI is continuously adjusting parameters to maintain optimal growing conditions
            </p>
          </div>
        )}
      </div>

      {/* Control Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Temperature */}
        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Thermometer className={`w-5 h-5 text-${getStatusColor(temperature, optimalTemp)}-600`} />
              <span className="font-medium">Temperature</span>
            </div>
            <span className="text-2xl font-bold">{temperature.toFixed(1)}°C</span>
          </div>
          
          <input
            type="range"
            min="15"
            max="30"
            step="0.1"
            value={temperature}
            onChange={(e) => !aiEnabled && setTemperature(parseFloat(e.target.value))}
            disabled={aiEnabled}
            className="w-full mb-2"
          />
          
          <div className="flex justify-between text-xs text-gray-600">
            <span>15°C</span>
            <span className="font-medium text-green-600">Optimal: {optimalTemp}°C</span>
            <span>30°C</span>
          </div>

          <div className={`mt-2 h-2 rounded-full bg-${getStatusColor(temperature, optimalTemp)}-100`}>
            <div 
              className={`h-full rounded-full bg-${getStatusColor(temperature, optimalTemp)}-500 transition-all duration-500`}
              style={{ width: `${100 - Math.abs(temperature - optimalTemp) * 5}%` }}
            />
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className={`w-5 h-5 text-${getStatusColor(humidity, optimalHumidity, 10)}-600`} />
              <span className="font-medium">Humidity</span>
            </div>
            <span className="text-2xl font-bold">{humidity.toFixed(0)}%</span>
          </div>
          
          <input
            type="range"
            min="40"
            max="90"
            value={humidity}
            onChange={(e) => !aiEnabled && setHumidity(parseInt(e.target.value))}
            disabled={aiEnabled}
            className="w-full mb-2"
          />
          
          <div className="flex justify-between text-xs text-gray-600">
            <span>40%</span>
            <span className="font-medium text-green-600">Optimal: {optimalHumidity}%</span>
            <span>90%</span>
          </div>

          <div className={`mt-2 h-2 rounded-full bg-${getStatusColor(humidity, optimalHumidity, 10)}-100`}>
            <div 
              className={`h-full rounded-full bg-${getStatusColor(humidity, optimalHumidity, 10)}-500 transition-all duration-500`}
              style={{ width: `${100 - Math.abs(humidity - optimalHumidity) * 2}%` }}
            />
          </div>
        </div>

        {/* Light Level */}
        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sun className={`w-5 h-5 text-${getStatusColor(lightLevel, optimalLight, 15)}-600`} />
              <span className="font-medium">Light Intensity</span>
            </div>
            <span className="text-2xl font-bold">{lightLevel.toFixed(0)}%</span>
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value={lightLevel}
            onChange={(e) => !aiEnabled && setLightLevel(parseInt(e.target.value))}
            disabled={aiEnabled}
            className="w-full mb-2"
          />
          
          <div className="flex justify-between text-xs text-gray-600">
            <span>0%</span>
            <span className="font-medium text-green-600">Optimal: {optimalLight}%</span>
            <span>100%</span>
          </div>

          <div className={`mt-2 h-2 rounded-full bg-${getStatusColor(lightLevel, optimalLight, 15)}-100`}>
            <div 
              className={`h-full rounded-full bg-${getStatusColor(lightLevel, optimalLight, 15)}-500 transition-all duration-500`}
              style={{ width: `${100 - Math.abs(lightLevel - optimalLight) * 1.5}%` }}
            />
          </div>
        </div>

        {/* CO2 Level */}
        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wind className={`w-5 h-5 text-${getStatusColor(co2Level, optimalCO2, 200)}-600`} />
              <span className="font-medium">CO₂ Level</span>
            </div>
            <span className="text-2xl font-bold">{co2Level.toFixed(0)} ppm</span>
          </div>
          
          <input
            type="range"
            min="400"
            max="1500"
            value={co2Level}
            onChange={(e) => !aiEnabled && setCo2Level(parseInt(e.target.value))}
            disabled={aiEnabled}
            className="w-full mb-2"
          />
          
          <div className="flex justify-between text-xs text-gray-600">
            <span>400</span>
            <span className="font-medium text-green-600">Optimal: {optimalCO2} ppm</span>
            <span>1500</span>
          </div>

          <div className={`mt-2 h-2 rounded-full bg-${getStatusColor(co2Level, optimalCO2, 200)}-100`}>
            <div 
              className={`h-full rounded-full bg-${getStatusColor(co2Level, optimalCO2, 200)}-500 transition-all duration-500`}
              style={{ width: `${100 - Math.abs(co2Level - optimalCO2) * 0.05}%` }}
            />
          </div>
        </div>
      </div>

      {/* Efficiency Dashboard */}
      <div className="bg-white rounded-lg p-6 border-2 border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Efficiency
          </h4>
          <span className={`text-3xl font-bold ${
            efficiency > 80 ? 'text-green-600' : efficiency > 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {efficiency.toFixed(1)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              efficiency > 80 ? 'bg-green-500' : efficiency > 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${efficiency}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Energy Usage:</span>
            <span className="ml-2 font-medium">
              {aiEnabled ? `${(100 - efficiency / 2).toFixed(0)}%` : '100%'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Yield Forecast:</span>
            <span className="ml-2 font-medium text-green-600">
              {aiEnabled ? '+15%' : 'Baseline'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Water Efficiency:</span>
            <span className="ml-2 font-medium">
              {aiEnabled ? '92%' : '78%'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Plant Health:</span>
            <span className="ml-2 font-medium text-green-600">
              {efficiency > 80 ? 'Excellent' : efficiency > 60 ? 'Good' : 'Fair'}
            </span>
          </div>
        </div>
      </div>

      {/* Benefits Summary */}
      {aiEnabled && (
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 className="font-medium text-green-900 mb-2">AI Optimization Benefits:</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Maintains optimal conditions 24/7 without manual intervention</li>
            <li>• Reduces energy consumption by {(100 - efficiency / 2).toFixed(0)}%</li>
            <li>• Increases yield potential by 15-20%</li>
            <li>• Prevents stress conditions before they impact plants</li>
          </ul>
        </div>
      )}
    </div>
  )
}
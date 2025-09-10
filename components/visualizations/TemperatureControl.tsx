'use client'

import { useState, useEffect } from 'react'
import { Thermometer, Zap, Snowflake, HelpCircle, CheckCircle, XCircle } from 'lucide-react'

interface Scenario {
  prompt: string
  lowTemp: string
  medTemp: string
  highTemp: string
  expected: string
  explanation: string
}

const scenarios: Scenario[] = [
  {
    prompt: "A bird in the hand is worth two in the",
    lowTemp: "bush",
    medTemp: "tree",
    highTemp: "clouds",
    expected: "bush",
    explanation: "This is a well-known idiom. At low temperature, AI picks the most statistically common completion."
  },
  {
    prompt: "The greenhouse tomatoes are",
    lowTemp: "growing",
    medTemp: "ripening",
    highTemp: "singing",
    expected: "growing",
    explanation: "In agricultural context, 'growing' is the most frequent and logical continuation."
  },
  {
    prompt: "Optimal humidity for tomato cultivation is",
    lowTemp: "60-80%",
    medTemp: "important",
    highTemp: "mysterious",
    expected: "60-80%",
    explanation: "Technical contexts benefit from low temperature for factual accuracy."
  },
  {
    prompt: "To increase yield, we should",
    lowTemp: "optimize",
    medTemp: "consider",
    highTemp: "dance",
    expected: "optimize",
    explanation: "Business contexts often have predictable, action-oriented completions."
  },
  {
    prompt: "The early bird catches the",
    lowTemp: "worm",
    medTemp: "sunrise",
    highTemp: "WiFi",
    expected: "worm",
    explanation: "Another idiom where low temperature ensures the traditional completion."
  }
]

export function TemperatureControl() {
  const [temperature, setTemperature] = useState(0.1)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [userGuess, setUserGuess] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  
  const scenario = scenarios[currentScenario]

  const getTemperatureLabel = () => {
    if (temperature < 0.5) return 'Low'
    if (temperature < 1.0) return 'Medium'
    return 'High'
  }

  const getTemperatureColor = () => {
    if (temperature < 0.5) return 'blue'
    if (temperature < 1.0) return 'green'
    return 'orange'
  }

  const getAIChoice = () => {
    if (temperature < 0.5) return scenario.lowTemp
    if (temperature < 1.0) return scenario.medTemp
    return scenario.highTemp
  }

  const handleGuess = (guess: string) => {
    setUserGuess(guess)
    setShowResult(true)
  }

  const handleReveal = () => {
    setIsRevealed(true)
  }

  const handleNext = () => {
    setCurrentScenario((prev) => (prev + 1) % scenarios.length)
    setUserGuess(null)
    setShowResult(false)
    setIsRevealed(false)
    setTemperature(0.1)
  }

  const handleTemperatureSelect = (value: number) => {
    setTemperature(value)
    setUserGuess(null)
    setShowResult(false)
    setIsRevealed(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Thermometer className="w-6 h-6 text-yellow-400" />
            AI Temperature Control
          </h3>
          <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm font-mono">
            Interactive Word Prediction Game
          </span>
        </div>

        {/* Prompt Display */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <div className="text-2xl font-mono text-white text-center mb-2">
            {scenario.prompt}{' '}
            <span className="inline-block">
              {isRevealed ? (
                <span className={`text-${getTemperatureColor()}-400 font-bold animate-pulse`}>
                  {getAIChoice()}
                </span>
              ) : (
                <span className="text-gray-500">?</span>
              )}
            </span>
          </div>
        </div>

        {/* Temperature Selector */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => handleTemperatureSelect(0.1)}
            className={`p-4 rounded-lg border-2 transition-all ${
              temperature < 0.5
                ? 'border-blue-500 bg-blue-900/50 shadow-lg shadow-blue-500/25'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <Snowflake className={`w-8 h-8 ${temperature < 0.5 ? 'text-blue-400' : 'text-gray-500'}`} />
            </div>
            <div className={`font-bold ${temperature < 0.5 ? 'text-blue-400' : 'text-gray-400'}`}>Low</div>
            <div className="text-2xl font-mono text-white my-1">0.1</div>
            <div className={`text-xs ${temperature < 0.5 ? 'text-blue-300' : 'text-gray-500'}`}>Predictable</div>
          </button>

          <button
            onClick={() => handleTemperatureSelect(0.7)}
            className={`p-4 rounded-lg border-2 transition-all ${
              temperature >= 0.5 && temperature < 1.0
                ? 'border-green-500 bg-green-900/50 shadow-lg shadow-green-500/25'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <Thermometer className={`w-8 h-8 ${temperature >= 0.5 && temperature < 1.0 ? 'text-green-400' : 'text-gray-500'}`} />
            </div>
            <div className={`font-bold ${temperature >= 0.5 && temperature < 1.0 ? 'text-green-400' : 'text-gray-400'}`}>Medium</div>
            <div className="text-2xl font-mono text-white my-1">0.7</div>
            <div className={`text-xs ${temperature >= 0.5 && temperature < 1.0 ? 'text-green-300' : 'text-gray-500'}`}>Balanced</div>
          </button>

          <button
            onClick={() => handleTemperatureSelect(1.5)}
            className={`p-4 rounded-lg border-2 transition-all ${
              temperature >= 1.0
                ? 'border-orange-500 bg-orange-900/50 shadow-lg shadow-orange-500/25'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <Zap className={`w-8 h-8 ${temperature >= 1.0 ? 'text-orange-400' : 'text-gray-500'}`} />
            </div>
            <div className={`font-bold ${temperature >= 1.0 ? 'text-orange-400' : 'text-gray-400'}`}>High</div>
            <div className="text-2xl font-mono text-white my-1">1.5</div>
            <div className={`text-xs ${temperature >= 1.0 ? 'text-orange-300' : 'text-gray-500'}`}>Creative</div>
          </button>
        </div>

        {/* Audience Interaction */}
        {!isRevealed && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-3 text-center">
              What word will the AI choose at this temperature?
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => handleGuess(scenario.lowTemp)}
                className={`p-3 rounded border ${
                  userGuess === scenario.lowTemp
                    ? 'border-blue-500 bg-blue-900/50 text-blue-300'
                    : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                }`}
              >
                {scenario.lowTemp}
              </button>
              <button
                onClick={() => handleGuess(scenario.medTemp)}
                className={`p-3 rounded border ${
                  userGuess === scenario.medTemp
                    ? 'border-green-500 bg-green-900/50 text-green-300'
                    : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                }`}
              >
                {scenario.medTemp}
              </button>
              <button
                onClick={() => handleGuess(scenario.highTemp)}
                className={`p-3 rounded border ${
                  userGuess === scenario.highTemp
                    ? 'border-orange-500 bg-orange-900/50 text-orange-300'
                    : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                }`}
              >
                {scenario.highTemp}
              </button>
            </div>

            <button
              onClick={handleReveal}
              disabled={!userGuess}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                userGuess
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {userGuess ? 'REVEAL AI CHOICE' : 'Make Your Guess First'}
            </button>
          </div>
        )}

        {/* Result Display */}
        {isRevealed && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 ${
              userGuess === getAIChoice()
                ? 'border-green-500 bg-green-900/30'
                : 'border-red-500 bg-red-900/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Your Guess:</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-mono">{userGuess}</span>
                  {userGuess === getAIChoice() ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">AI Choice:</span>
                <span className={`font-mono text-${getTemperatureColor()}-400 font-bold`}>
                  {getAIChoice()}
                </span>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Next Example →
            </button>
          </div>
        )}
      </div>

      {/* Explanation Panel */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
        <div className="flex items-start gap-3">
          <div className={`w-2 h-2 rounded-full bg-${getTemperatureColor()}-500 mt-2 animate-pulse`} />
          <div>
            <div className="text-sm font-medium text-gray-300 mb-1">
              Temperature Setting: {temperature} ({getTemperatureLabel()})
            </div>
            <p className="text-sm text-gray-400">
              {temperature < 0.5 && "At low temperature, the AI selects the most statistically probable completion - the word that appears most frequently in training data for this context."}
              {temperature >= 0.5 && temperature < 1.0 && "At medium temperature, the AI balances between common and creative choices, occasionally selecting less obvious but still reasonable completions."}
              {temperature >= 1.0 && "At high temperature, the AI becomes highly creative and unpredictable, often choosing unusual or unexpected completions that might surprise you."}
            </p>
            {isRevealed && (
              <p className="text-sm text-blue-300 mt-2">
                💡 {scenario.explanation}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2">
        {scenarios.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentScenario
                ? `bg-${getTemperatureColor()}-500 w-8`
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
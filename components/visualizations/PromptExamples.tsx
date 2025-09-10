'use client'

import React from 'react'

export function PromptExamples() {
  const examples = [
    {
      category: "Clear Instructions",
      bad: "Help me with my greenhouse",
      good: "Create weekly watering schedule for 200 tomato plants in Zone A"
    },
    {
      category: "Context Setting", 
      bad: "My plants are dying",
      good: "Tomato plants showing yellow leaves, 90°F+ temps for 5 days"
    },
    {
      category: "Role Definition",
      bad: "What should I do?",
      good: "As an experienced greenhouse manager, recommend solutions for..."
    },
    {
      category: "Output Format",
      bad: "Tell me about pest management",
      good: "Create bullet-point action plan: 1) Immediate steps 2) Weekly monitoring"
    }
  ]

  return (
    <div className="w-full h-full flex flex-col justify-center p-3 space-y-4">
      <h3 className="text-lg font-semibold text-center text-gray-700 mb-2">Examples</h3>
      
      {examples.map((example, index) => (
        <div key={index} className="space-y-2">
          <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">{example.category}</h4>
          
          {/* Bad Example */}
          <div className="flex justify-start">
            <div className="max-w-xs bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 relative shadow-sm">
              <div className="absolute -left-1 top-3 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-100"></div>
              <div className="flex items-start space-x-2">
                <span className="text-gray-400 font-normal text-xs mt-0.5">—</span>
                <p className="text-xs text-gray-600 leading-tight font-light">{example.bad}</p>
              </div>
            </div>
          </div>
          
          {/* Good Example */}
          <div className="flex justify-end">
            <div className="max-w-xs bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 relative shadow-sm">
              <div className="absolute -right-1 top-3 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-800"></div>
              <div className="flex items-start space-x-2">
                <span className="text-gray-300 font-normal text-xs mt-0.5">+</span>
                <p className="text-xs text-gray-100 leading-tight font-light">{example.good}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
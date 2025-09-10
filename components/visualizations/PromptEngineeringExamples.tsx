'use client'

import React from 'react'

export function PromptEngineeringExamples() {
  const techniques = [
    {
      name: "Chain-of-Thought",
      bad: "Optimize energy costs",
      good: "1) Analyze → 2) Find peaks → 3) Calculate ROI"
    },
    {
      name: "Few-Shot Learning",
      bad: "Single request",
      good: "Show 3 examples → Better output"
    },
    {
      name: "Context Engineering",
      bad: "Write report",
      good: "Weekly report for ops director: energy, pests"
    },
    {
      name: "Cross-Modal",
      bad: "Text only",
      good: "Photo → Analysis → Visual diagram"
    },
    {
      name: "Iterative Refinement", 
      bad: "Single attempt",
      good: "V1 → Feedback → V2 → Better result"
    }
  ]

  return (
    <div className="w-full h-full flex flex-col justify-center p-4 space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Techniques in Practice</h3>
      
      {techniques.map((technique, index) => (
        <div key={index} className="bg-white rounded border border-gray-200 p-3 shadow-sm">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">{technique.name}</h4>
          
          {/* Before Example */}
          <div className="mb-1 p-1.5 bg-gray-50 rounded text-xs">
            <span className="text-gray-400 font-medium">Basic:</span>
            <span className="text-gray-600 italic ml-1">"{technique.bad}"</span>
          </div>
          
          {/* After Example */}
          <div className="p-1.5 bg-blue-50 rounded text-xs">
            <span className="text-blue-600 font-medium">Advanced:</span>
            <span className="text-gray-800 font-medium ml-1">"{technique.good}"</span>
          </div>
        </div>
      ))}
    </div>
  )
}
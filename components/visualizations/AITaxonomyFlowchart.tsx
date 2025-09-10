'use client'

import React from 'react'

export function AITaxonomyFlowchart() {
  return (
    <div className="w-full h-full flex gap-8 p-6">
      {/* Left side - Flowchart */}
      <div className="flex-1 flex items-center justify-center p-2">
        <svg viewBox="0 0 900 650" className="w-full h-full max-h-[500px]" preserveAspectRatio="xMidYMid meet">
          {/* Background */}
          <rect width="900" height="650" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" rx="8" />
          
          {/* AI Root Node - Centered */}
          <rect x="350" y="60" width="200" height="50" rx="8" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />
          <text x="450" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            ARTIFICIAL INTELLIGENCE
          </text>
          <text x="450" y="95" textAnchor="middle" fill="white" fontSize="10">
            (Top Level)
          </text>
          
          {/* Machine Learning Node */}
          <rect x="350" y="150" width="200" height="50" rx="8" fill="#059669" stroke="#047857" strokeWidth="2" />
          <text x="450" y="170" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
            MACHINE LEARNING
          </text>
          <text x="450" y="185" textAnchor="middle" fill="white" fontSize="10">
            (Learns from data)
          </text>
          
          {/* ML Branches - More spread out */}
          <rect x="80" y="260" width="150" height="45" rx="6" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
          <text x="155" y="278" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
            COMPUTER VISION
          </text>
          <text x="155" y="292" textAnchor="middle" fill="white" fontSize="9">
            Images/Video
          </text>
          
          <rect x="250" y="260" width="150" height="45" rx="6" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1" />
          <text x="325" y="278" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
            NATURAL LANGUAGE
          </text>
          <text x="325" y="292" textAnchor="middle" fill="white" fontSize="9">
            Text/Speech
          </text>
          
          <rect x="420" y="260" width="150" height="45" rx="6" fill="#ea580c" stroke="#dc2626" strokeWidth="1" />
          <text x="495" y="278" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
            GENERATIVE AI
          </text>
          <text x="495" y="292" textAnchor="middle" fill="white" fontSize="9">
            Creates content
          </text>
          
          <rect x="590" y="260" width="150" height="45" rx="6" fill="#10b981" stroke="#059669" strokeWidth="1" />
          <text x="665" y="278" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
            ROBOTICS
          </text>
          <text x="665" y="292" textAnchor="middle" fill="white" fontSize="9">
            Physical AI
          </text>
          
          {/* Generative AI Sub-branches - Better spacing */}
          <rect x="320" y="350" width="90" height="40" rx="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
          <text x="365" y="365" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            TEXT
          </text>
          <text x="365" y="378" textAnchor="middle" fill="white" fontSize="8">
            ChatGPT
          </text>
          
          <rect x="430" y="350" width="90" height="40" rx="4" fill="#ec4899" stroke="#db2777" strokeWidth="1" />
          <text x="475" y="365" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            IMAGES
          </text>
          <text x="475" y="378" textAnchor="middle" fill="white" fontSize="8">
            DALL-E
          </text>
          
          <rect x="540" y="350" width="90" height="40" rx="4" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1" />
          <text x="585" y="365" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            VIDEO
          </text>
          <text x="585" y="378" textAnchor="middle" fill="white" fontSize="8">
            Sora
          </text>
          
          <rect x="375" y="420" width="90" height="40" rx="4" fill="#06b6d4" stroke="#0891b2" strokeWidth="1" />
          <text x="420" y="435" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            AUDIO
          </text>
          <text x="420" y="448" textAnchor="middle" fill="white" fontSize="8">
            ElevenLabs
          </text>
          
          <rect x="485" y="420" width="90" height="40" rx="4" fill="#10b981" stroke="#059669" strokeWidth="1" />
          <text x="530" y="435" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            CODE
          </text>
          <text x="530" y="448" textAnchor="middle" fill="white" fontSize="8">
            Copilot
          </text>
          
          {/* Connection Lines - Clean and simple */}
          {/* AI to ML */}
          <line x1="450" y1="110" x2="450" y2="150" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* ML to branches */}
          <path d="M 450 200 Q 300 230 155 260" stroke="#374151" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 450 200 Q 380 230 325 260" stroke="#374151" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" />
          <line x1="450" y1="200" x2="495" y2="260" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <path d="M 450 200 Q 560 230 665 260" stroke="#374151" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" />
          
          {/* Generative AI to sub-branches */}
          <path d="M 495 305 Q 430 330 365 350" stroke="#374151" strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 495 305 Q 485 330 475 350" stroke="#374151" strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 495 305 Q 540 330 585 350" stroke="#374151" strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 495 305 Q 460 390 420 420" stroke="#374151" strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 495 305 Q 515 390 530 420" stroke="#374151" strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />
          
          {/* Arrow marker definition */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
            </marker>
          </defs>
        </svg>
      </div>
      
      {/* Right side - Key Points */}
      <div className="flex-1 flex flex-col justify-center p-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">Key Relationships</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 bg-blue-600 rounded-full mt-1 flex-shrink-0"></div>
            <p className="text-xl text-gray-700">AI is the umbrella term for all machine intelligence</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 bg-green-600 rounded-full mt-1 flex-shrink-0"></div>
            <p className="text-xl text-gray-700">Machine Learning is the primary method for creating AI</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 bg-orange-600 rounded-full mt-1 flex-shrink-0"></div>
            <p className="text-xl text-gray-700">Generative AI creates new content (text, images, video)</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 bg-purple-600 rounded-full mt-1 flex-shrink-0"></div>
            <p className="text-xl text-gray-700">Each technology serves different business needs</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
            <p className="text-xl text-gray-700">Understanding the hierarchy helps choose the right tool</p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-lg text-blue-800 font-medium">
            💡 Business Insight: Start with your specific problem, then choose the appropriate AI technology
          </p>
        </div>
      </div>
    </div>
  )
}
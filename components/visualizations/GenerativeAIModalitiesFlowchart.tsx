'use client'

import React from 'react'

export function GenerativeAIModalitiesFlowchart() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-5xl mx-auto">
        <svg viewBox="0 0 900 500" className="w-full h-auto">
          {/* Background */}
          <rect width="900" height="500" fill="#f8fafc" />
          
          {/* Central Generative AI Node */}
          <rect x="350" y="50" width="200" height="60" rx="8" fill="#ea580c" stroke="#dc2626" strokeWidth="3" />
          <text x="450" y="75" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
            GENERATIVE AI
          </text>
          <text x="450" y="95" textAnchor="middle" fill="white" fontSize="14">
            Creates New Content
          </text>
          
          {/* Text Generation Branch */}
          <rect x="50" y="180" width="160" height="80" rx="6" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />
          <text x="130" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            TEXT GENERATION
          </text>
          <text x="130" y="225" textAnchor="middle" fill="white" fontSize="11">
            ChatGPT, Claude, Gemini
          </text>
          <text x="130" y="240" textAnchor="middle" fill="white" fontSize="10">
            • Business documentation
          </text>
          <text x="130" y="252" textAnchor="middle" fill="white" fontSize="10">
            • Customer service
          </text>
          
          {/* Image Generation Branch */}
          <rect x="240" y="180" width="160" height="80" rx="6" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" />
          <text x="320" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            IMAGE GENERATION
          </text>
          <text x="320" y="225" textAnchor="middle" fill="white" fontSize="11">
            DALL-E, Midjourney
          </text>
          <text x="320" y="240" textAnchor="middle" fill="white" fontSize="10">
            • Marketing materials
          </text>
          <text x="320" y="252" textAnchor="middle" fill="white" fontSize="10">
            • Training visuals
          </text>
          
          {/* Video Generation Branch */}
          <rect x="430" y="180" width="160" height="80" rx="6" fill="#7c3aed" stroke="#6d28d9" strokeWidth="2" />
          <text x="510" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            VIDEO GENERATION
          </text>
          <text x="510" y="225" textAnchor="middle" fill="white" fontSize="11">
            Sora, Runway ML
          </text>
          <text x="510" y="240" textAnchor="middle" fill="white" fontSize="10">
            • Training videos
          </text>
          <text x="510" y="252" textAnchor="middle" fill="white" fontSize="10">
            • Product demos
          </text>
          
          {/* Audio Generation Branch */}
          <rect x="620" y="180" width="160" height="80" rx="6" fill="#059669" stroke="#047857" strokeWidth="2" />
          <text x="700" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            AUDIO GENERATION
          </text>
          <text x="700" y="225" textAnchor="middle" fill="white" fontSize="11">
            ElevenLabs, Murf
          </text>
          <text x="700" y="240" textAnchor="middle" fill="white" fontSize="10">
            • Voiceovers
          </text>
          <text x="700" y="252" textAnchor="middle" fill="white" fontSize="10">
            • Multilingual content
          </text>
          
          {/* Code Generation Branch */}
          <rect x="340" y="320" width="160" height="80" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <text x="420" y="345" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            CODE GENERATION
          </text>
          <text x="420" y="365" textAnchor="middle" fill="white" fontSize="11">
            GitHub Copilot, CodeT5
          </text>
          <text x="420" y="380" textAnchor="middle" fill="white" fontSize="10">
            • Development automation
          </text>
          <text x="420" y="392" textAnchor="middle" fill="white" fontSize="10">
            • Code assistance
          </text>
          
          {/* Cross-modal Applications */}
          <rect x="100" y="320" width="200" height="50" rx="6" fill="#6366f1" stroke="#4f46e5" strokeWidth="2" />
          <text x="200" y="340" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
            CROSS-MODAL WORKFLOWS
          </text>
          <text x="200" y="355" textAnchor="middle" fill="white" fontSize="10">
            Text → Image → Video → Audio
          </text>
          
          <rect x="540" y="320" width="200" height="50" rx="6" fill="#ec4899" stroke="#db2777" strokeWidth="2" />
          <text x="640" y="340" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
            MULTIMODAL INTEGRATION
          </text>
          <text x="640" y="355" textAnchor="middle" fill="white" fontSize="10">
            Combined content creation
          </text>
          
          {/* Connection Lines */}
          <line x1="450" y1="110" x2="130" y2="180" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="450" y1="110" x2="320" y2="180" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="450" y1="110" x2="510" y2="180" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="450" y1="110" x2="700" y2="180" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="450" y1="110" x2="420" y2="320" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* Cross-connections for workflows */}
          <line x1="210" y1="260" x2="200" y2="320" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="590" y1="260" x2="640" y2="320" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="5,5" />
          
          {/* Arrow marker definition */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
            </marker>
          </defs>
        </svg>
        
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">
            Each modality serves different business needs and can be combined for comprehensive solutions
          </p>
        </div>
      </div>
    </div>
  )
}
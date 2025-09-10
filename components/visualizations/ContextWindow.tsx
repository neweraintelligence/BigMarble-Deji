'use client'

import { useState, useEffect, useRef } from 'react'
import { Flashlight, FileText, AlertCircle } from 'lucide-react'

export function ContextWindow() {
  const [flashlightPos, setFlashlightPos] = useState({ x: 200, y: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [contextSize, setContextSize] = useState(150) // radius of flashlight
  const containerRef = useRef<HTMLDivElement>(null)

  const documentText = `
    Big Marble Farms Greenhouse Operations Manual
    
    Chapter 1: Climate Control Systems
    The greenhouse climate control system is crucial for maintaining optimal growing conditions. 
    Temperature should be maintained between 18-24°C during the day and 16-20°C at night.
    Humidity levels must stay between 60-80% for tomato cultivation.
    
    Chapter 2: Irrigation Management
    Automated irrigation systems deliver precise amounts of water and nutrients.
    The system monitors soil moisture levels every 30 minutes.
    Nutrient solution pH should be maintained between 5.5 and 6.5.
    EC levels typically range from 2.0 to 3.5 mS/cm depending on growth stage.
    
    Chapter 3: Pest and Disease Control
    Regular scouting is essential for early detection of pests and diseases.
    Biological control agents are preferred over chemical pesticides.
    Beneficial insects like Encarsia formosa control whitefly populations.
    
    Chapter 4: Harvest Procedures
    Tomatoes should be harvested when they show first color break.
    Handle fruit carefully to avoid bruising and damage.
    Sort by size and quality grade immediately after harvest.
    
    Chapter 5: Energy Management
    LED grow lights supplement natural sunlight during winter months.
    Heat recovery systems capture waste heat from equipment.
    Thermal screens reduce heat loss during cold nights.
  `.trim()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setFlashlightPos({ x, y })
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  // Calculate which text is "in context" (visible in flashlight)
  const getVisibleText = () => {
    const words = documentText.split(/\s+/).filter(w => w.length > 0)
    const containerWidth = 600
    const lineHeight = 24
    
    const visibleWords: { word: string; isVisible: boolean; index: number }[] = []
    let currentX = 20
    let currentY = 20
    
    words.forEach((word, index) => {
      // Simple text layout calculation
      if (currentX + word.length * 8 > containerWidth - 20) {
        currentX = 20
        currentY += lineHeight
      }
      
      const wordCenterX = currentX + (word.length * 4)
      const wordCenterY = currentY
      
      const distance = Math.sqrt(
        Math.pow(wordCenterX - flashlightPos.x, 2) + 
        Math.pow(wordCenterY - flashlightPos.y, 2)
      )
      
      const isVisible = distance < contextSize
      visibleWords.push({ word, isVisible, index })
      
      currentX += (word.length + 1) * 8
    })
    
    return visibleWords
  }

  const [visibleWords, setVisibleWords] = useState<{ word: string; isVisible: boolean; index: number }[]>([])
  
  // Initialize visible words on mount and update when position/size changes
  useEffect(() => {
    const words = getVisibleText()
    setVisibleWords(words)
  }, [flashlightPos.x, flashlightPos.y, contextSize])
  
  // Initialize on first render
  useEffect(() => {
    const words = getVisibleText()
    setVisibleWords(words)
  }, [])

  const visibleCount = visibleWords.filter(w => w.isVisible).length
  const totalWords = Math.max(1, visibleWords.length) // Prevent division by zero
  const percentageVisible = totalWords > 0 ? ((visibleCount / totalWords) * 100).toFixed(1) : '0'

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Flashlight className="w-5 h-5" />
            Context Window Size
          </h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {visibleCount} / {totalWords} words
          </span>
        </div>
        
        <div className="space-y-2">
          <input
            type="range"
            min="50"
            max="300"
            value={contextSize}
            onChange={(e) => setContextSize(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>Small (GPT-3.5)</span>
            <span>Medium</span>
            <span>Large (GPT-4)</span>
          </div>
        </div>

        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
            <p className="text-sm text-amber-800">
              AI can only "see" {percentageVisible}% of the document. 
              Information outside the context window is invisible to the AI.
            </p>
          </div>
        </div>
      </div>

      {/* Document Viewer with Flashlight */}
      <div className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Greenhouse Operations Manual (Drag the flashlight to explore)
          </span>
        </div>
        
        <div 
          ref={containerRef}
          className="relative h-96 bg-gray-900 cursor-move overflow-hidden select-none"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{ userSelect: 'none' }}
        >
          {/* Document Text */}
          <div className="absolute inset-0 p-4 font-mono text-sm leading-6">
            {documentText.split('\n').map((line, lineIndex) => (
              <div key={lineIndex} className="whitespace-pre-wrap">
                {line.length === 0 ? (
                  <br />
                ) : (
                  line.split(/(\s+)/).map((part, partIndex) => {
                    if (part.trim().length === 0) {
                      return <span key={`${lineIndex}-${partIndex}`}>{part}</span>
                    }
                    
                    // Find this word in our visibleWords array
                    const wordData = visibleWords.find(w => w.word === part)
                    const isHighlighted = wordData?.isVisible || false
                    
                    return (
                      <span
                        key={`${lineIndex}-${partIndex}`}
                        className={`transition-all duration-300 ${
                          isHighlighted
                            ? 'text-white font-semibold drop-shadow-lg' 
                            : 'text-gray-500'
                        }`}
                      >
                        {part}
                      </span>
                    )
                  })
                )}
              </div>
            ))}
          </div>

          {/* Flashlight Effect */}
          <div 
            className="absolute pointer-events-none"
            style={{
              left: flashlightPos.x,
              top: flashlightPos.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Glow effect */}
            <div 
              className="absolute rounded-full"
              style={{
                width: contextSize * 2,
                height: contextSize * 2,
                background: `radial-gradient(circle, 
                  rgba(255,255,255,0.3) 0%, 
                  rgba(255,255,255,0.1) 40%, 
                  transparent 70%)`,
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
              }}
            />
            
            {/* Center indicator */}
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </div>

          {/* Dark overlay with cutout */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${flashlightPos.x}px ${flashlightPos.y}px, 
                transparent ${contextSize * 0.5}px, 
                rgba(0,0,0,0.7) ${contextSize}px)`,
            }}
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{visibleCount}</div>
          <div className="text-xs text-gray-600">Words in Context</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">{totalWords - visibleCount}</div>
          <div className="text-xs text-gray-600">Words Hidden</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{percentageVisible}%</div>
          <div className="text-xs text-gray-600">Document Visible</div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Key Concept:</h4>
        <p className="text-sm text-blue-800">
          Just like this flashlight can only illuminate part of the document, AI models have a "context window" 
          that limits how much text they can process at once. Larger models like GPT-4 have bigger context windows, 
          allowing them to "see" more information simultaneously.
        </p>
      </div>
    </div>
  )
}
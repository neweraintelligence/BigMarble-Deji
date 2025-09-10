'use client'

import React, { useState } from 'react'

export function DocumentProcessingDemo() {
  const [activeStep, setActiveStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const processDocument = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setActiveStep(1)
      setIsProcessing(false)
    }, 2000)
  }

  const steps = [
    {
      title: "Upload Document",
      content: "Drag and drop invoice, packing slip, or regulatory form"
    },
    {
      title: "AI Processing Complete", 
      content: "Document analyzed and data extracted"
    }
  ]

  const extractedData = {
    invoice: {
      vendor: "GreenTech Supplies",
      amount: "$2,847.50", 
      items: ["Tomato trays (200)", "Nutrient solution (50L)", "pH strips (100)"],
      dueDate: "Dec 15, 2024"
    },
    aiGenerated: {
      summary: "Standard supply order within budget parameters. Tomato tray quantity supports projected harvest volume. Recommend scheduling delivery for Dec 10 to align with transplanting schedule.",
      actions: [
        "Schedule payment for Dec 12 (3 days early payment discount available)",
        "Coordinate delivery with Zone 2 transplanting timeline", 
        "Add recurring order reminder for Feb 2025"
      ],
      compliance: "All items meet CFIA organic certification requirements. Documentation automatically filed in audit folder."
    }
  }

  return (
    <div className="w-full h-full bg-gray-50 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Document Processing Demo</h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Upload Area */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            {activeStep === 0 && !isProcessing && (
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  📄
                </div>
                <p className="text-gray-600 mb-4">Drop invoice or regulatory document here</p>
                <button 
                  onClick={processDocument}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Demo: Process Sample Invoice
                </button>
              </div>
            )}
            
            {isProcessing && (
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
                  ⚙️
                </div>
                <p className="text-gray-600">AI analyzing document...</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  ✅
                </div>
                <p className="text-green-600 font-medium">Processing Complete!</p>
                <p className="text-sm text-gray-600 mt-2">Data extracted and analyzed</p>
              </div>
            )}
          </div>

          {/* Sample Document Preview */}
          {activeStep === 1 && (
            <div className="bg-white rounded-lg border p-4">
              <h4 className="font-medium text-gray-800 mb-3">Extracted Data</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Vendor:</span> {extractedData.invoice.vendor}</div>
                <div><span className="font-medium">Amount:</span> {extractedData.invoice.amount}</div>
                <div><span className="font-medium">Due Date:</span> {extractedData.invoice.dueDate}</div>
                <div className="pt-2">
                  <span className="font-medium">Items:</span>
                  <ul className="ml-4 mt-1">
                    {extractedData.invoice.items.map((item, idx) => (
                      <li key={idx} className="text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI-Generated Insights */}
        <div className="space-y-4">
          {activeStep === 1 && (
            <>
              <div className="bg-white rounded-lg border p-4">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mr-2">AI</span>
                  Business Summary
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {extractedData.aiGenerated.summary}
                </p>
              </div>

              <div className="bg-white rounded-lg border p-4">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-2">✓</span>
                  Recommended Actions
                </h4>
                <ul className="space-y-2">
                  {extractedData.aiGenerated.actions.map((action, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center mr-2">🛡️</span>
                  Compliance Check
                </h4>
                <p className="text-sm text-green-700">
                  {extractedData.aiGenerated.compliance}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg border border-blue-200 p-3">
                <h5 className="text-sm font-medium text-blue-800 mb-2">Time Savings</h5>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-gray-600">Manual Processing:</div>
                    <div className="font-medium">15-20 minutes</div>
                  </div>
                  <div>
                    <div className="text-gray-600">AI Processing:</div>
                    <div className="font-medium text-blue-600">30 seconds</div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeStep === 0 && (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-500">AI insights will appear here after document processing</p>
            </div>
          )}
        </div>
      </div>

      {activeStep === 1 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button 
            onClick={() => {setActiveStep(0); setIsProcessing(false)}}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mr-4"
          >
            Reset Demo
          </button>
          <span className="text-sm text-gray-600">
            Ready for next document. AI learns from each processing session to improve accuracy.
          </span>
        </div>
      )}
    </div>
  )
}
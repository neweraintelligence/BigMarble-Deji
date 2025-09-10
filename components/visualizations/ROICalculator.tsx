'use client'

import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react'

export function ROICalculator() {
  const [laborHours, setLaborHours] = useState(40)
  const [hourlyWage, setHourlyWage] = useState(25)
  const [errorRate, setErrorRate] = useState(15)
  const [aiCost, setAiCost] = useState(500)
  const [timeSavings, setTimeSavings] = useState(30)

  // Calculate ROI metrics
  const currentLaborCost = laborHours * hourlyWage * 52 // Annual
  const errorCost = currentLaborCost * (errorRate / 100)
  const totalCurrentCost = currentLaborCost + errorCost

  const savedHours = laborHours * (timeSavings / 100)
  const savedLaborCost = savedHours * hourlyWage * 52
  const reducedErrorCost = errorCost * 0.7 // Assume 70% error reduction with AI
  const totalSavings = savedLaborCost + reducedErrorCost

  const annualAICost = aiCost * 12
  const netSavings = totalSavings - annualAICost
  const roi = ((netSavings / annualAICost) * 100).toFixed(1)
  const paybackMonths = (annualAICost / (totalSavings / 12)).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Input Parameters */}
      <div className="bg-white rounded-lg p-6 border-2 border-gray-300">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          ROI Calculator - Greenhouse AI Implementation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Labor Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weekly Labor Hours (Manual Tasks)
            </label>
            <input
              type="range"
              min="10"
              max="80"
              value={laborHours}
              onChange={(e) => setLaborHours(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>{laborHours} hours/week</span>
              <span className="text-gray-500">${(laborHours * hourlyWage).toFixed(0)}/week</span>
            </div>
          </div>

          {/* Hourly Wage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Hourly Wage
            </label>
            <input
              type="range"
              min="15"
              max="50"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>${hourlyWage}/hour</span>
              <span className="text-gray-500">CAD</span>
            </div>
          </div>

          {/* Error Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Error/Rework Rate
            </label>
            <input
              type="range"
              min="5"
              max="30"
              value={errorRate}
              onChange={(e) => setErrorRate(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>{errorRate}% of time</span>
              <span className="text-gray-500">${(errorCost / 52).toFixed(0)}/week cost</span>
            </div>
          </div>

          {/* AI Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly AI Investment
            </label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={aiCost}
              onChange={(e) => setAiCost(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>${aiCost}/month</span>
              <span className="text-gray-500">${annualAICost}/year</span>
            </div>
          </div>

          {/* Time Savings */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Time Savings with AI
            </label>
            <input
              type="range"
              min="10"
              max="60"
              value={timeSavings}
              onChange={(e) => setTimeSavings(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>10%</span>
              <span className="font-medium">{timeSavings}% reduction</span>
              <span>60%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Net Savings */}
        <div className={`bg-white rounded-lg p-4 border-2 ${netSavings > 0 ? 'border-green-500' : 'border-red-500'}`}>
          <div className="flex items-center justify-between mb-2">
            <DollarSign className={`w-5 h-5 ${netSavings > 0 ? 'text-green-600' : 'text-red-600'}`} />
            <span className="text-xs text-gray-600">Annual</span>
          </div>
          <div className={`text-2xl font-bold ${netSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(netSavings).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {netSavings > 0 ? 'Net Savings' : 'Net Cost'}
          </div>
        </div>

        {/* ROI Percentage */}
        <div className="bg-white rounded-lg p-4 border-2 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-xs text-gray-600">ROI</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {roi}%
          </div>
          <div className="text-sm text-gray-600">
            Return on Investment
          </div>
        </div>

        {/* Payback Period */}
        <div className="bg-white rounded-lg p-4 border-2 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-gray-600">Payback</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {paybackMonths}
          </div>
          <div className="text-sm text-gray-600">
            Months to Break Even
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Cost Breakdown Analysis</h4>
        
        <div className="space-y-3">
          {/* Current Costs */}
          <div className="pb-3 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">Current Annual Costs</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Labor Cost:</span>
                <span className="font-mono">${currentLaborCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Error/Rework Cost:</span>
                <span className="font-mono">${errorCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total Current Cost:</span>
                <span className="font-mono">${totalCurrentCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* With AI */}
          <div className="pb-3 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">With AI Implementation</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">AI Investment:</span>
                <span className="font-mono">${annualAICost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Labor Savings:</span>
                <span className="font-mono text-green-600">-${savedLaborCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Error Reduction:</span>
                <span className="font-mono text-green-600">-${reducedErrorCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className={`p-3 rounded-lg ${netSavings > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">
                First Year Result:
              </span>
              <span className={`text-xl font-bold ${netSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netSavings > 0 ? '+' : ''} ${netSavings.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Key Insights:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Saving {savedHours} hours per week frees staff for higher-value tasks</li>
          <li>• 70% reduction in errors improves quality and customer satisfaction</li>
          <li>• {paybackMonths < 12 ? 'Quick payback period makes this a low-risk investment' : 'Consider starting with a smaller pilot to prove value'}</li>
          <li>• ROI improves further as AI capabilities expand to more use cases</li>
        </ul>
      </div>
    </div>
  )
}
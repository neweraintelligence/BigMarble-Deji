'use client'

import { useState } from 'react'
import { Building2, Cog, Leaf, Zap, Monitor, Database, Shield, Globe, Target, Users } from 'lucide-react'
import Image from 'next/image'

interface EnterpriseSolution {
  id: string
  name: string
  description: string
  category: string
  pricing: string
  features: string[]
  benefits: string[]
  useCases: string[]
  logo: string
  website: string
}

interface CustomSystem {
  id: string
  name: string
  description: string
  category: string
  components: string[]
  benefits: string[]
  applications: string[]
}

const enterpriseSolutions: EnterpriseSolution[] = [
  {
    id: 'ridder',
    name: 'Ridder',
    description: 'Advanced greenhouse automation and control systems with AI-driven optimization for climate, irrigation, and energy management.',
    category: 'Automation & Control',
    pricing: 'Enterprise Pricing',
    features: [
      'Climate Control Systems',
      'Irrigation Management',
      'Energy Optimization',
      'Crop Steering',
      'Data Integration',
      'Remote Monitoring'
    ],
    benefits: [
      'Precise climate control',
      'Water and energy savings',
      'Improved crop steering',
      'Centralized management',
      'Scalable solutions'
    ],
    useCases: [
      'Climate control automation',
      'Irrigation optimization',
      'Energy management',
      'Crop steering',
      'Multi-zone control'
    ],
    logo: '/ridder-logo.png',
    website: 'https://ridder.com'
  },
  {
    id: 'iunu',
    name: 'IUNU',
    description: 'Computer vision and AI platform for greenhouse monitoring, providing plant-level insights and automated quality control.',
    category: 'Computer Vision',
    pricing: 'Custom Pricing',
    features: [
      'Plant-level Monitoring',
      'Computer Vision AI',
      'Quality Control Automation',
      'Growth Tracking',
      'Disease Detection',
      'Yield Prediction'
    ],
    benefits: [
      'Early disease detection',
      'Improved crop quality',
      'Reduced labor costs',
      'Real-time plant insights',
      'Automated quality control'
    ],
    useCases: [
      'Plant health monitoring',
      'Quality control automation',
      'Disease detection',
      'Growth optimization',
      'Yield forecasting'
    ],
    logo: '/iunu-logo.png',
    website: 'https://iunu.com'
  },
  {
    id: 'certhon',
    name: 'Certhon',
    description: 'Turnkey greenhouse solutions with integrated AI systems for climate control, automation, and crop management.',
    category: 'Turnkey Solutions',
    pricing: 'Project-based',
    features: [
      'Turnkey Installation',
      'Climate Control',
      'Automation Systems',
      'Crop Management',
      'Data Integration',
      'Support Services'
    ],
    benefits: [
      'Complete solution',
      'Expert installation',
      'Integrated systems',
      'Ongoing support',
      'Proven technology'
    ],
    useCases: [
      'New greenhouse construction',
      'System integration',
      'Automation implementation',
      'Technology upgrades',
      'Process optimization'
    ],
    logo: '/certhon-logo.png',
    website: 'https://certhon.com'
  },
  {
    id: 'hortilux',
    name: 'Hortilux',
    description: 'Smart lighting solutions with AI-driven control for optimal plant growth and energy efficiency in greenhouse environments.',
    category: 'Smart Lighting',
    pricing: 'Enterprise Pricing',
    features: [
      'Smart LED Lighting',
      'Growth Optimization',
      'Energy Management',
      'Spectral Control',
      'Automated Scheduling',
      'Performance Analytics'
    ],
    benefits: [
      'Optimized plant growth',
      'Energy cost reduction',
      'Year-round production',
      'Spectral optimization',
      'Automated control'
    ],
    useCases: [
      'Supplemental lighting',
      'Growth optimization',
      'Energy management',
      'Spectral control',
      'Production scheduling'
    ],
    logo: '/hortilux-logo.png',
    website: 'https://hortilux.com'
  },
  {
    id: 'blue-radix',
    name: 'Blue Radix',
    description: 'AI-powered autonomous growing platform for greenhouse operations, optimizing climate control and crop management.',
    category: 'Autonomous Growing',
    pricing: 'Enterprise Pricing',
    features: [
      'Autonomous Climate Control',
      'Crop Optimization AI',
      'Predictive Analytics',
      'Energy Management',
      'Real-time Monitoring',
      'Multi-location Support'
    ],
    benefits: [
      'Reduce energy costs by 20-30%',
      'Increase crop yield by 15-25%',
      'Minimize manual intervention',
      '24/7 autonomous operation',
      'Data-driven decision making'
    ],
    useCases: [
      'Greenhouse climate optimization',
      'Crop yield maximization',
      'Energy efficiency management',
      'Predictive maintenance',
      'Multi-site operations'
    ],
    logo: '/blueradix-logo.png',
    website: 'https://blueradix.com'
  },
  {
    id: 'priva',
    name: 'Priva',
    description: 'Sustainable greenhouse technology with AI-powered climate and process control for optimal growing conditions.',
    category: 'Climate Control',
    pricing: 'Custom Pricing',
    features: [
      'Climate Management',
      'Process Control',
      'Energy Recovery',
      'Water Management',
      'CO2 Optimization',
      'Sustainability Tools'
    ],
    benefits: [
      'Sustainable operations',
      'Energy efficiency',
      'Optimal growing conditions',
      'Resource conservation',
      'Compliance support'
    ],
    useCases: [
      'Climate optimization',
      'Energy recovery systems',
      'Water management',
      'CO2 enrichment',
      'Sustainability reporting'
    ],
    logo: '/Priva-Logo.png',
    website: 'https://priva.com'
  }
]

const customSystems = [
  {
    id: 'modular-climate',
    name: 'Modular Climate Control',
    description: 'Customizable climate control modules that can be scaled and configured for specific greenhouse requirements.',
    category: 'Climate Control',
    components: ['Sensors', 'Controllers', 'Actuators', 'Software'],
    benefits: ['Scalable', 'Customizable', 'Cost-effective', 'Easy maintenance'],
    applications: ['Small greenhouses', 'Research facilities', 'Specialty crops']
  },
  {
    id: 'greenhouse-digital-twin',
    name: 'Greenhouse Digital Twin',
    description: 'Virtual replica of your greenhouse environment for optimization through simulation, predictive modeling, and data-driven decision making.',
    category: 'Simulation & Optimization',
    components: ['Simulation Engine', 'Data Models', 'IoT Integration', 'Analytics Dashboard'],
    benefits: ['Virtual testing', 'Predictive optimization', 'Risk-free scenarios', 'Data-driven insights'],
    applications: ['Climate optimization', 'Energy efficiency', 'Crop yield modeling', 'Resource planning']
  },
  {
    id: 'automation-platform',
    name: 'Automation Platform',
    description: 'Modular automation platform that can integrate with existing greenhouse systems and scale as needed.',
    category: 'Automation',
    components: ['Controllers', 'Drivers', 'Software', 'APIs'],
    benefits: ['Integration ready', 'Scalable', 'Open source', 'Customizable'],
    applications: ['Irrigation control', 'Climate automation', 'Equipment control', 'Data collection']
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics Platform',
    description: 'Custom data analytics platform for greenhouse operations with machine learning and predictive modeling.',
    category: 'Analytics',
    components: ['Data Pipeline', 'ML Models', 'Visualization', 'APIs'],
    benefits: ['Custom insights', 'Predictive modeling', 'Data integration', 'Scalable'],
    applications: ['Performance optimization', 'Predictive maintenance', 'Yield forecasting', 'Resource planning']
  }
]

export function EnterpriseSolutions() {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'custom'>('enterprise');
  const [currentPage, setCurrentPage] = useState(1);
  const solutionsPerPage = 4;
  
  // Calculate total pages based on active tab
  const totalPages = Math.ceil(
    activeTab === 'enterprise' 
      ? enterpriseSolutions.length / solutionsPerPage 
      : customSystems.length / solutionsPerPage
  );

  // Get current items based on active tab
  const indexOfLastItem = currentPage * solutionsPerPage;
  const indexOfFirstItem = indexOfLastItem - solutionsPerPage;
  const currentItems = activeTab === 'enterprise'
    ? enterpriseSolutions.slice(indexOfFirstItem, indexOfLastItem)
    : customSystems.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page when switching tabs
  const handleTabChange = (tab: 'enterprise' | 'custom') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex mb-8 bg-white rounded-lg shadow-sm">
        <button
          onClick={() => handleTabChange('enterprise')}
          className={`flex-1 px-6 py-4 text-sm font-medium rounded-l-lg transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'enterprise'
              ? 'bg-green-500 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Enterprise Solutions
        </button>
        <button
          onClick={() => handleTabChange('custom')}
          className={`flex-1 px-6 py-4 text-sm font-medium rounded-r-lg transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'custom'
              ? 'bg-green-500 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Cog className="w-4 h-4" />
          Custom & Modular Systems
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activeTab === 'enterprise' ? (
          // Enterprise Solutions
          (currentItems as EnterpriseSolution[]).map((solution) => (
            <div key={solution.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col border-2 border-marble-200 hover:border-greenhouse-300 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <Image 
                  src={solution.logo} 
                  alt={`${solution.name} logo`} 
                  width={solution.id === 'hortilux' ? 120 : 80}
                  height={solution.id === 'hortilux' ? 96 : 48}
                  className={`object-contain ${solution.id === 'hortilux' ? 'h-24' : 'h-12'}`}
                />
                <span className="text-sm font-medium text-gray-500">{solution.category}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{solution.name}</h3>
              <p className="text-gray-600 mb-4">{solution.description}</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center text-marble-900">
                    <Zap className="w-4 h-4 mr-1 text-green-600" />
                    Key Features
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {solution.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center text-marble-900">
                    <Target className="w-4 h-4 mr-1 text-green-600" />
                    Benefits
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {solution.benefits.slice(0, 3).map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center text-marble-900">
                    <Users className="w-4 h-4 mr-1 text-green-600" />
                    Use Cases
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {solution.useCases.slice(0, 3).map((useCase: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-4">
                <a
                  href={solution.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-center"
                >
                  Visit Website
                </a>
                <button
                  onClick={() => {}}
                  className="flex-1 border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-50 transition-colors text-center"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          // Custom Solutions
          (currentItems as CustomSystem[]).map((system) => (
            <div key={system.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col border-2 border-marble-200 hover:border-greenhouse-300 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Cog className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">{system.category}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{system.name}</h3>
              <p className="text-gray-600 mb-4">{system.description}</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center text-marble-900">
                    <Monitor className="w-4 h-4 mr-1 text-green-600" />
                    Components
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {system.components.slice(0, 3).map((component: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {component}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center text-marble-900">
                    <Target className="w-4 h-4 mr-1 text-green-600" />
                    Benefits
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {system.benefits.slice(0, 3).map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center text-marble-900">
                    <Globe className="w-4 h-4 mr-1 text-green-600" />
                    Applications
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {system.applications.slice(0, 3).map((application: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {application}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {}}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-center"
                >
                  Explore Options
                </button>
                <button
                  onClick={() => {}}
                  className="flex-1 border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-50 transition-colors text-center"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 
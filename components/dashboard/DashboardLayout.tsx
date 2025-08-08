'use client'

import { useState, useEffect } from 'react'
import { Menu, X, LogOut, Settings, Home, BookOpen, Bot, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react'
import { NavIcon } from './NavIcon'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: Home,
    subItems: [
      { name: 'Training Overview', anchor: 'training-overview' },
      { name: 'Session Overview', anchor: 'session-progress' }
    ]
  },
  // Modules removed per simplification request
  { 
    name: 'AI Tools Explorer', 
    href: '/tools', 
    icon: Bot,
    subItems: [
      { name: 'Greenhouse AI Tools', anchor: 'greenhouse-tools' },
      { name: 'Workflow AI Tools', anchor: 'ai-tools-collection' }
    ]
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings,
    subItems: []
  },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const { profile, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Auto-expand current page menu
  useEffect(() => {
    const currentItem = navigationItems.find(item => pathname === item.href)
    if (currentItem && !expandedMenus.includes(currentItem.name)) {
      setExpandedMenus(prev => [...prev, currentItem.name])
    }
  }, [pathname])

  const toggleSubmenu = (itemName: string) => {
    setExpandedMenus(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const handleNavigation = (href: string, anchor?: string) => {
    if (anchor) {
      // If we're already on the page, just scroll to the section
      if (pathname === href) {
        const element = document.getElementById(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        // Navigate to page and then scroll
        router.push(href)
        setTimeout(() => {
          const element = document.getElementById(anchor)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    } else {
      router.push(href)
    }
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-marble-50 flex">
      {/* Sidebar */}
      <div className={cn(
        "z-50 bg-white border-r border-marble-200 flex flex-col h-screen transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64",
        sidebarOpen ? "fixed inset-y-0 left-0 translate-x-0" : "fixed inset-y-0 left-0 -translate-x-full lg:relative lg:translate-x-0"
      )}>
        <div className="flex flex-col flex-1 min-h-0">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-marble-200">
            {!sidebarCollapsed && (
              <div className="text-lg font-bold text-marble-900 text-left w-full">
                AI Greenhouse Training:
                <br />
                Big Marble Farms
              </div>
            )}
            <div className="flex items-center space-x-2">
              {/* Collapse button for desktop */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-2 hover:bg-marble-100 rounded-lg"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </button>
              {/* Close button for mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-marble-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          {/* Company Logo Section */}
          <div className={cn(
            "p-6 border-b border-marble-200 flex flex-col items-center",
            sidebarCollapsed && "px-2"
          )}>
            {sidebarCollapsed ? (
              <div className="flex flex-col items-center space-y-3">
                <Image src="/bmf-logo.png" alt="Big Marble Farms Logo" width={32} height={32} className="w-8 h-8 object-contain" />
              </div>
            ) : (
              <>
                <div className="text-center mb-3">
                  <p className="font-medium text-marble-900">General Access</p>
                  <p className="text-sm text-marble-600">Training Participants</p>
                </div>
                {/* BMF Logo */}
                <Image src="/bmf-logo.png" alt="Big Marble Farms Logo" width={80} height={80} className="mt-2 w-20 h-20 object-contain" />
              </>
            )}
          </div>
          {/* Navigation */}
          <nav className={cn(
            "flex-1 overflow-y-auto p-4 space-y-1",
            sidebarCollapsed && "px-2"
          )}>
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              const isExpanded = expandedMenus.includes(item.name)
              
              return (
                <div key={item.name} className="space-y-1">
                  <div
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer",
                      isActive 
                        ? "bg-greenhouse-100 text-greenhouse-900" 
                        : "text-marble-700 hover:bg-marble-100 hover:text-marble-900",
                      sidebarCollapsed && "px-2 justify-center"
                    )}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <div 
                      className={cn(
                        "flex items-center flex-1",
                        sidebarCollapsed ? "justify-center" : "space-x-3"
                      )}
                      onClick={() => handleNavigation(item.href)}
                    >
                      <NavIcon icon={Icon} alt={item.name} />
                      {!sidebarCollapsed && <span>{item.name}</span>}
                    </div>
                    {!sidebarCollapsed && item.subItems.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSubmenu(item.name)
                        }}
                        className="p-1 hover:bg-marble-200 rounded"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  {/* Submenu - only show when not collapsed */}
                  {!sidebarCollapsed && isExpanded && (
                    <div className="ml-6 space-y-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.anchor}
                          onClick={() => handleNavigation(item.href, subItem.anchor)}
                          className="w-full text-left px-3 py-2 text-sm text-marble-600 hover:text-marble-900 hover:bg-marble-50 rounded-lg transition-colors"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
        {/* Bottom Actions */}
        <div className={cn(
          "p-4 border-t border-marble-200",
          sidebarCollapsed && "px-2"
        )}>
          <Button
            onClick={signOut}
            variant="ghost"
            className={cn(
              "w-full text-marble-700 hover:text-marble-900",
              sidebarCollapsed ? "justify-center px-2" : "justify-start"
            )}
            title={sidebarCollapsed ? "Sign Out" : undefined}
          >
            <LogOut className={cn("h-4 w-4", !sidebarCollapsed && "mr-3")} />
            {!sidebarCollapsed && "Sign Out"}
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
        "mr-0"
      )}>
        {/* Top bar */}
        <header className="bg-white border-b border-marble-200 px-6 py-4">
          <div className="flex items-center">
            <div className="flex-1 flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-marble-100 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="lg:hidden flex-1 text-center">
                <span className="text-lg font-semibold text-marble-900">AI Greenhouse Training</span>
              </div>
              <div className="flex items-center space-x-4 justify-end" />
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
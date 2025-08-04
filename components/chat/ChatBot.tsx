'use client'

import { useState } from 'react'
import { Send, X, Bot, User, ChevronRight } from 'lucide-react'
import { useChat } from '@/components/chat/ChatProvider'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function ChatBot() {
  const { isOpen, closeChat } = useChat()
  const { profile } = useAuth()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: `Hello ${profile?.full_name || 'there'}! I'm your Custom AI Copilot for the AI Leadership Accelerator. I'm here to help you navigate your AI transformation journey at Big Marble Farms, answer questions about workshop content, AI tools, automation strategies, and provide guidance specific to your role. How can I assist you today?`,
      created_at: new Date().toISOString()
    }
  ])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')

    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString()
    }

    setMessages(prev => [...prev, newUserMessage])

    // Simulate AI response for demo
    setTimeout(() => {
      const responses = [
        `Great question, ${profile?.full_name || 'there'}! For Big Marble Farms' AI implementation, I'd recommend focusing on...`,
        `Based on your role at Big Marble Farms, you might find these AI tools particularly beneficial for your operations...`,
        `For Big Marble Farms' automation strategy, consider starting with these agriculture-focused approaches...`,
        `Let me help you understand that concept better in the context of Big Marble Farms' goals...`,
        `That's an excellent point! Given Big Marble Farms' unique position in the industry, here's what I'd suggest...`,
        `Absolutely! In the agricultural sector, Big Marble Farms can leverage AI to optimize greenhouse operations and...`
      ]
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)] + ` This is a demo response. In the full version, I'd provide detailed, role-specific guidance tailored to Big Marble Farms' greenhouse operations and your leadership goals.`,
        created_at: new Date().toISOString()
      }

      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className={cn(
      "fixed top-0 right-0 h-full bg-gradient-to-b from-white via-marble-50/30 to-white border-l-2 border-marble-300 shadow-2xl z-[9999] transition-transform duration-300 ease-in-out flex flex-col backdrop-blur-sm",
      "w-full sm:w-96",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-marble-200/50 bg-gradient-to-r from-greenhouse-600 via-greenhouse-500 to-marble-600 text-white relative overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
              <Image
                src="/greenhouse-emoji.png"
                alt="Greenhouse AI"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">AI Assistant</h3>
              <p className="text-xs text-white/90">Big Marble Farms Copilot</p>
            </div>
          </div>
          <button
            onClick={closeChat}
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-105 relative z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent via-marble-50/20 to-transparent">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-full",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "max-w-[85%] relative",
                  message.role === 'user' 
                    ? "bg-gradient-to-br from-greenhouse-500 to-greenhouse-600 text-white rounded-2xl rounded-tr-md shadow-lg border border-greenhouse-400/30" 
                    : "bg-gradient-to-br from-white to-marble-50 text-marble-900 rounded-2xl rounded-tl-md shadow-lg border border-marble-200/50 backdrop-blur-sm"
                )}>
                  {/* Subtle inner glow */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl pointer-events-none",
                    message.role === 'user' 
                      ? "bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-tr-md"
                      : "bg-gradient-to-br from-white/60 via-transparent to-transparent rounded-tl-md"
                  )}></div>
                  
                  <div className="flex items-start gap-3 p-4 relative z-10">
                    {message.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-greenhouse-100 to-greenhouse-200 flex items-center justify-center border border-greenhouse-300/30 flex-shrink-0 mt-0.5">
                        <Image
                          src="/tomato.png"
                          alt="AI Assistant"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    )}
                    {message.role === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center border border-white/30 flex-shrink-0 mt-0.5">
                        <User className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
                      <p className={cn(
                        "text-xs mt-2 font-medium",
                        message.role === 'user' ? "text-white/70" : "text-marble-500"
                      )}>
                        {new Date(message.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t-2 border-marble-200/50 bg-gradient-to-r from-white via-marble-50/30 to-white backdrop-blur-sm relative">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-marble-50/20 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="flex gap-3 relative z-10">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about AI, greenhouse automation, or the workshop..."
                className="w-full resize-none border-2 border-marble-300/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-greenhouse-500 focus:border-greenhouse-400 min-h-[50px] max-h-32 bg-white/80 backdrop-blur-sm shadow-inner transition-all duration-200 placeholder:text-marble-400"
                rows={2}
              />
              {/* Input glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
            <Button
              onClick={sendMessage}
              disabled={!input.trim()}
              size="sm"
              className="bg-gradient-to-br from-greenhouse-500 to-greenhouse-600 hover:from-greenhouse-600 hover:to-greenhouse-700 text-white flex-shrink-0 self-end shadow-lg border border-greenhouse-400/30 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 rounded-xl px-4 py-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
       </div>
   )
}
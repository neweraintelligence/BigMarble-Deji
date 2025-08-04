'use client'

import { createContext, useContext, useState } from 'react'
import { ChatSession, ChatMessage } from '@/types/database'

interface ChatContextType {
  isOpen: boolean
  toggleChat: () => void
  closeChat: () => void
  openChat: () => void
  currentSession: ChatSession | null
  setCurrentSession: (session: ChatSession | null) => void
  messages: ChatMessage[]
  setMessages: (messages: ChatMessage[]) => void
  isTyping: boolean
  setIsTyping: (typing: boolean) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const toggleChat = () => setIsOpen(!isOpen)
  const closeChat = () => setIsOpen(false)
  const openChat = () => setIsOpen(true)

  const value = {
    isOpen,
    toggleChat,
    closeChat,
    openChat,
    currentSession,
    setCurrentSession,
    messages,
    setMessages,
    isTyping,
    setIsTyping
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
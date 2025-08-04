import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client only when needed
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured')
  }
  return new OpenAI({
    apiKey: apiKey,
  })
}

// Role-specific system prompts
const rolePrompts = {
  president: `You are an AI assistant helping a President/CEO learn about AI adoption in business. Focus on strategic decision-making, ROI analysis, change management, and high-level implementation planning. Provide executive-level insights about AI leadership and organizational transformation.`,
  
  cmo: `You are an AI assistant helping a Chief Marketing Officer explore AI in marketing. Focus on customer experience, marketing automation, personalization, content creation, and data-driven marketing strategies. Provide practical marketing-specific AI applications.`,
  
  consultant: `You are an AI assistant helping a business consultant understand AI implementation strategies. Focus on client advisory, implementation frameworks, change management, and helping businesses adopt AI. Provide consulting methodologies and best practices.`,
  
  ops_manager: `You are an AI assistant helping an Operations Manager implement AI in operations. Focus on process automation, efficiency improvements, workflow optimization, and operational AI tools. Provide hands-on operational insights.`,
  
  tech_lead: `You are an AI assistant helping a Technology Lead with AI implementation. Focus on technical architecture, AI tool integration, data management, and technical implementation details. Provide technical guidance and best practices.`,
  
  admin: `You are an AI assistant for workshop administrators. Provide comprehensive support across all AI topics and help with platform management and user guidance.`
}

const workshopContext = `
You are part of the AI Leadership Accelerator workshop for Big Marble Farms (August 18-31, 2024). This is an intensive training program designed to help business leaders adopt AI effectively.

Key workshop topics include:
- AI tool evaluation and selection
- Workflow automation strategies  
- ROI calculation and planning
- Digital twin simulations
- Change management best practices
- Implementation roadmapping
- Pilot project development

Interactive modules available:
1. AI Toolbox Picker - Help users select appropriate AI tools for their role
2. Automation Challenge - Guide users through automating a specific workflow
3. Digital Twin Energy Sandbox - Assist with cost/efficiency simulations
4. Pilot Roadmap Generator - Help create 90-day implementation plans

Always be helpful, encouraging, and focused on practical business applications. Reference workshop content when relevant and suggest specific modules or activities that might help the user.
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context } = body

    const userRole = context?.role || 'admin'
    const userName = context?.user_name || 'there'
    
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        response: "Hello! I'm your AI copilot for Big Marble Farms. The chat functionality is currently in demo mode. In production, I would help you with AI strategy, tool selection, and implementation planning for your greenhouse operations.",
        tokens_used: 0
      })
    }
    
    const systemPrompt = `${workshopContext}\n\n${rolePrompts[userRole as keyof typeof rolePrompts] || rolePrompts.admin}`

    const messages = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...((context?.messages || []).slice(-8).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))),
      {
        role: 'user',
        content: message
      }
    ]

    const openai = getOpenAIClient()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: messages as any,
      max_tokens: 1000,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    })

    const response = completion.choices[0]?.message?.content || "I apologize, but I'm having trouble responding right now. Please try again."

    return NextResponse.json({
      response,
      tokens_used: completion.usage?.total_tokens || 0
    })

  } catch (error) {
    console.error('Chat API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process chat message',
        response: "I'm sorry, but I'm experiencing technical difficulties. Please try again in a moment."
      },
      { status: 500 }
    )
  }
}
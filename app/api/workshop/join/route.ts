import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { quizState } from '@/lib/quizState'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const displayName: string = (body?.displayName || '').toString().trim()
    const sessionId: string = (body?.sessionId || '').toString()

    if (!displayName || !sessionId) {
      return NextResponse.json({ error: 'Missing displayName or sessionId' }, { status: 400 })
    }

    const session = quizState.getSessionById(sessionId)
    if (!session || !session.isActive) {
      return NextResponse.json({ error: 'Invalid or inactive session' }, { status: 400 })
    }

    // Restore existing participant if cookie present, else create new
    const cookieStore = cookies()
    let participantId = cookieStore.get('participant_id')?.value
    if (!participantId) participantId = randomUUID()

    const participant = quizState.ensureParticipant(participantId, displayName, sessionId)

    // Set httpOnly cookie for seamless rejoin (expires in ~1 day)
    const response = NextResponse.json({ participantId: participant.id, sessionId: participant.sessionId, displayName: participant.displayName })
    response.cookies.set('participant_id', participant.id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    })
    return response
  } catch (e) {
    return NextResponse.json({ error: 'Failed to join session' }, { status: 500 })
  }
}



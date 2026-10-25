import { ALL } from 'lorentz-event-bus'

export const TIMELINES = ['1953', '1986', '2019'] as const

export type TimelineYear = typeof TIMELINES[number]

// A message goes to one timeline or to all of them.
export type Recipient = TimelineYear | typeof ALL

export interface Timeline {
  year: TimelineYear
  character: string
}

// Only the application messages received from the other timelines are listed.
export interface ChatMessage {
  id: number
  from: TimelineYear
  to: Recipient
  text: string
  at: Date
}

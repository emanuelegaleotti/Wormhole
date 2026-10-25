export const TIMELINES = ['1953', '1986', '2019'] as const

export interface Timeline {
  year: string
  character: string
}

// Only the messages received from the other timelines are listed.
export interface ChatMessage {
  id: number
  from: string
  to: string
  text: string
  presence: boolean
  at: Date
}

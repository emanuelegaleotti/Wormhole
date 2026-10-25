// user: authentication and authorization, service: bus housekeeping without application data, application: application data.
export type EventMessageType = 'user' | 'service' | 'application'

// Address that reaches every listener.
export const ALL = 'all'

// A listener address or ALL; the intersection keeps ALL suggested by the editor instead of collapsing into string.
export type EventAddress = typeof ALL | (string & Record<never, never>)

export class EventMessage {
  constructor (
    public to: EventAddress,
    public message: string,
    public from?: string,
    public type: EventMessageType = 'application'
  ) {}
}

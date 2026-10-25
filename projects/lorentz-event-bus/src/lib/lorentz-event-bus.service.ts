import { Injectable } from '@angular/core'
import { filter, fromEvent, map, Observable } from 'rxjs'
import { ALL, EventAddress, EventMessage } from './event-message.model'

export const PRESENCE_MESSAGE = 'lorentz-event-bus:connected'

@Injectable({
  providedIn: 'root'
})
export class LorentzEventBusService {
  eventBus: CustomEvent = new CustomEvent(
    'lorentz-event-bus',
    { detail: new EventMessage(ALL, 'Init event bus', 'lorentz service', 'service') })

  constructor () {
    this.dispatchEvent()
  }

  sendEventBusMessage (message: EventMessage): void {
    this.eventBus = new CustomEvent(
      'lorentz-event-bus',
      { detail: message }
    )
    this.dispatchEvent()
  }

  // Messages addressed to `address` or broadcast to everybody (`to: ALL`).
  listen (address: EventAddress): Observable<EventMessage> {
    return fromEvent<CustomEvent<EventMessage>>(window, 'lorentz-event-bus').pipe(
      map(event => event.detail),
      filter(message => message.to === address || message.to === ALL)
    )
  }

  // Tells the others that `from` is connected to the bus and available.
  announcePresence (from: string): void {
    this.sendEventBusMessage(new EventMessage(ALL, PRESENCE_MESSAGE, from, 'service'))
  }

  dispatchEvent (): void {
    window.dispatchEvent(this.eventBus)
  }
}


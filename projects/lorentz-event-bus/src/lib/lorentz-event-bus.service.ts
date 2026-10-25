import { Injectable, inject } from '@angular/core'
import { filter, fromEvent, map, Observable } from 'rxjs'
import { EventMessage } from './event-message.model'
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage'

export const PRESENCE_MESSAGE = 'lorentz-event-bus:connected'

@Injectable({
  providedIn: 'root'
})
export class LorentzEventBusService {
  eventBus: CustomEvent = new CustomEvent(
    'lorentz-event-bus',
    { detail: new EventMessage('all', 'Init event bus', 'lorentz service') })

  private readonly sessionStorage = inject(SessionStorageService)
  private readonly localStorage = inject(LocalStorageService)

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

  // Messages addressed to `address` or broadcast to everybody (`to: 'all'`).
  listen (address: string): Observable<EventMessage> {
    return fromEvent<CustomEvent<EventMessage>>(window, 'lorentz-event-bus').pipe(
      map(event => event.detail),
      filter(message => message.to === address || message.to === 'all')
    )
  }

  // Tells the others that `from` is connected to the bus and available.
  announcePresence (from: string): void {
    this.sendEventBusMessage(new EventMessage('all', PRESENCE_MESSAGE, from))
  }

  dispatchEvent (): void {
    window.dispatchEvent(this.eventBus)
  }

  sendSessionBusMessage (message: EventMessage): void {
    this.sessionStorage.store('lorentz-event-bus', JSON.stringify(message))
  }

  sendLocalBusMessage (message: EventMessage): void {
    this.localStorage.store('lorentz-event-bus', JSON.stringify(message))
  }

  clearSessionBusMessage (): void {
    this.sessionStorage.clear('lorentz-event-bus')
  }

  clearLocalBusMessage (): void {
    this.localStorage.clear('lorentz-event-bus')
  }

}

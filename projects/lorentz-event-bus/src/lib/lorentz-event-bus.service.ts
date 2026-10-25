import { Injectable, inject } from '@angular/core'
import { EventMessage } from './event-message.model'
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage'

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

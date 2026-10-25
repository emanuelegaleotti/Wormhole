import { TestBed } from '@angular/core/testing'
import { ALL, EventMessage } from './event-message.model'
import { LorentzEventBusService, PRESENCE_MESSAGE } from './lorentz-event-bus.service'

describe('LorentzEventBusService', () => {
  let service: LorentzEventBusService

  beforeEach(() => {
    service = TestBed.inject(LorentzEventBusService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should deliver the messages addressed to a listener and the broadcasts', () => {
    const received: string[] = []
    const subscription = service.listen('1986').subscribe(m => received.push(m.message))
    service.sendEventBusMessage(new EventMessage('1986', 'direct', '2019'))
    service.sendEventBusMessage(new EventMessage(ALL, 'broadcast', '2019'))
    service.sendEventBusMessage(new EventMessage('1953', 'other', '2019'))
    subscription.unsubscribe()
    service.sendEventBusMessage(new EventMessage('1986', 'late', '2019'))
    expect(received).toEqual(['direct', 'broadcast'])
  })

  it('should announce the presence to everybody', () => {
    let received: EventMessage | undefined
    const subscription = service.listen('1953').subscribe(m => (received = m))
    service.announcePresence('2019')
    subscription.unsubscribe()
    expect(received).toEqual(new EventMessage(ALL, PRESENCE_MESSAGE, '2019', 'service'))
  })
})

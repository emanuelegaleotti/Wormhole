import { TestBed } from '@angular/core/testing'
import { ALL, EventMessage, LorentzEventBusService, PRESENCE_MESSAGE } from 'lorentz-event-bus'
import { TimelineChatComponent } from '../../../timeline-chat/timeline-chat.component'

describe('TimelineChatComponent', () => {
  let bus: LorentzEventBusService
  let sent: EventMessage[]

  const create = () => {
    const fixture = TestBed.createComponent(TimelineChatComponent)
    fixture.componentRef.setInput('timeline', { year: '1986', character: 'Egon Tiedemann' })
    return fixture
  }

  beforeEach(() => {
    bus = TestBed.inject(LorentzEventBusService)
    sent = []
    const original = bus.sendEventBusMessage.bind(bus)
    spyOn(bus, 'sendEventBusMessage').and.callFake(m => {
      sent.push(m)
      original(m)
    })
  })

  it('should announce itself on the bus with a service message', async () => {
    const fixture = create()
    await fixture.whenStable()
    expect(sent).toEqual([new EventMessage(ALL, PRESENCE_MESSAGE, '1986', 'service')])
  })

  it('should log the service messages instead of listing them', async () => {
    const log = spyOn(console, 'log')
    const fixture = create()
    await fixture.whenStable()
    bus.announcePresence('2019')
    await fixture.whenStable()
    expect(log).toHaveBeenCalledWith(jasmine.stringContaining('2019'))
    expect(fixture.nativeElement.querySelectorAll('.messages li:not(.empty)').length).toBe(0)
  })

  it('should list the application messages coming from the other timelines', async () => {
    const fixture = create()
    await fixture.whenStable()
    bus.sendEventBusMessage(new EventMessage(ALL, 'Hello everybody', '2019'))
    bus.sendEventBusMessage(new EventMessage('1986', 'Hello from the future', '2019'))
    bus.sendEventBusMessage(new EventMessage('1953', 'Not for you', '2019'))
    await fixture.whenStable()
    const items: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('.messages li'))
    expect(items.length).toBe(2)
    expect(items[0].textContent).toContain('to all')
    expect(items[1].textContent).toContain('Hello from the future')
  })

  it('should send the typed message to the selected timeline', async () => {
    const fixture = create()
    await fixture.whenStable()
    const element: HTMLElement = fixture.nativeElement
    const select = element.querySelector('select') as HTMLSelectElement
    select.value = '1953'
    select.dispatchEvent(new Event('change'))
    const input = element.querySelector('input') as HTMLInputElement
    input.value = 'Anybody there?'
    input.dispatchEvent(new Event('input'))
    await fixture.whenStable()
    element.querySelector('form')?.dispatchEvent(new Event('submit'))
    await fixture.whenStable()
    expect(sent[sent.length - 1]).toEqual(new EventMessage('1953', 'Anybody there?', '1986', 'application'))
    expect(input.value).toBe('')
  })
})

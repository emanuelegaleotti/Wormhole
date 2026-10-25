import { TestBed } from '@angular/core/testing'
import { EventMessage, LorentzEventBusService, PRESENCE_MESSAGE } from 'lorentz-event-bus'
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage'
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
    TestBed.configureTestingModule({ providers: [provideNgxWebstorage(withLocalStorage(), withSessionStorage())] })
    bus = TestBed.inject(LorentzEventBusService)
    sent = []
    const original = bus.sendEventBusMessage.bind(bus)
    spyOn(bus, 'sendEventBusMessage').and.callFake(m => {
      sent.push(m)
      original(m)
    })
  })

  it('should announce itself on the bus when it connects', async () => {
    const fixture = create()
    await fixture.whenStable()
    expect(sent).toEqual([new EventMessage('all', PRESENCE_MESSAGE, '1986')])
  })

  it('should list the messages and the presences coming from the other timelines', async () => {
    const fixture = create()
    await fixture.whenStable()
    bus.sendEventBusMessage(new EventMessage('all', PRESENCE_MESSAGE, '2019'))
    bus.sendEventBusMessage(new EventMessage('1986', 'Hello from the future', '2019'))
    bus.sendEventBusMessage(new EventMessage('1953', 'Not for you', '2019'))
    await fixture.whenStable()
    const items: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('.messages li'))
    expect(items.length).toBe(2)
    expect(items[0].textContent).toContain('2019 is connected and available')
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
    expect(sent[sent.length - 1]).toEqual(new EventMessage('1953', 'Anybody there?', '1986'))
    expect(input.value).toBe('')
  })
})

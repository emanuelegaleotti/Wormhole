import { TestBed } from '@angular/core/testing'
import { provideTestApp } from '../testing/test-providers'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: provideTestApp() }))

  it('should render the layout', async () => {
    const fixture = TestBed.createComponent(AppComponent)
    await fixture.whenStable()
    const el: HTMLElement = fixture.nativeElement
    expect(el.querySelector('wormhole-header')).toBeTruthy()
    expect(el.querySelector('wormhole-aside')).toBeTruthy()
    expect(el.querySelector('wormhole-footer')).toBeTruthy()
  })
})

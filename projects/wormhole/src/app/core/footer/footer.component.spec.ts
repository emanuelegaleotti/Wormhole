import { TestBed } from '@angular/core/testing'
import { provideTestApp } from '../../../testing/test-providers'
import { FooterComponent } from './footer.component'

describe('FooterComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: provideTestApp() }))

  it('should render the navigation links and the locale selector', async () => {
    const fixture = TestBed.createComponent(FooterComponent)
    await fixture.whenStable()
    const el: HTMLElement = fixture.nativeElement
    expect(el.querySelectorAll('a').length).toBe(2)
    expect(el.querySelector('wormhole-locale-selector')).toBeTruthy()
  })
})

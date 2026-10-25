import { TestBed } from '@angular/core/testing'
import { provideTestApp } from '../../../testing/test-providers'
import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: provideTestApp() }))

  it('should link to the home page', async () => {
    const fixture = TestBed.createComponent(HeaderComponent)
    await fixture.whenStable()
    expect(fixture.nativeElement.querySelector('a')).toBeTruthy()
  })
})

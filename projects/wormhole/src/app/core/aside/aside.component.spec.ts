import { TestBed } from '@angular/core/testing'
import { provideTestApp } from '../../../testing/test-providers'
import { AsideComponent } from './aside.component'

describe('AsideComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: provideTestApp() }))

  it('should render the navigation links', async () => {
    const fixture = TestBed.createComponent(AsideComponent)
    await fixture.whenStable()
    expect(fixture.nativeElement.querySelectorAll('a').length).toBe(2)
  })
})

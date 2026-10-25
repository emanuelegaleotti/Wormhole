import { HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { provideTestApp } from '../../../testing/test-providers'
import { CarbonComponent } from './carbon.component'

describe('CarbonComponent', () => {
  it('should compute the emissions from the current intensity', async () => {
    TestBed.configureTestingModule({ providers: provideTestApp() })
    const fixture = TestBed.createComponent(CarbonComponent)
    const http = TestBed.inject(HttpTestingController)
    fixture.detectChanges()

    http.expectOne(req => req.url.endsWith('/intensity')).flush({
      data: [{ from: 'a', to: 'b', intensity: { forecast: 50, actual: 60, index: 'low' } }]
    })
    http.expectOne(req => req.url.endsWith('/generation')).flush({
      data: { generationmix: [{ fuel: 'wind', perc: 40 }] }
    })
    await fixture.whenStable()

    const component = fixture.componentInstance
    expect(component.currentValue()).toBe(60)
    component.kwh.set(10)
    expect(component.emissions()).toBe(600)
    expect(component.mix().length).toBe(1)
  })
})

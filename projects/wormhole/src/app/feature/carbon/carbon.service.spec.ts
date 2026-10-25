import { HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { provideTestApp } from '../../../testing/test-providers'
import { CarbonService } from './carbon.service'

describe('CarbonService', () => {
  let service: CarbonService
  let http: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: provideTestApp() })
    service = TestBed.inject(CarbonService)
    http = TestBed.inject(HttpTestingController)
  })

  afterEach(() => http.verify())

  it('should return the current intensity', () => {
    const intensity = { from: 'a', to: 'b', intensity: { forecast: 50, actual: 57, index: 'low' } }
    let result: unknown
    service.getIntensity().subscribe(r => (result = r))
    http.expectOne(req => req.url.endsWith('/intensity')).flush({ data: [intensity] })
    expect(result).toEqual(intensity)
  })

  it('should drop empty fuels and sort the generation mix', () => {
    let result: unknown
    service.getGenerationMix().subscribe(r => (result = r))
    http.expectOne(req => req.url.endsWith('/generation')).flush({
      data: { generationmix: [{ fuel: 'coal', perc: 0 }, { fuel: 'gas', perc: 10 }, { fuel: 'wind', perc: 40 }] }
    })
    expect(result).toEqual([{ fuel: 'wind', perc: 40 }, { fuel: 'gas', perc: 10 }])
  })
})

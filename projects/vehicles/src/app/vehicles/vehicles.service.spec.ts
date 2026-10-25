import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { VehiclesService } from './vehicles.service'

describe('VehiclesService', () => {
  let service: VehiclesService
  let http: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] })
    service = TestBed.inject(VehiclesService)
    http = TestBed.inject(HttpTestingController)
  })

  afterEach(() => http.verify())

  it('should map the vehicles of a page', () => {
    let count = 0
    let firstId = ''
    service.getVehicles(1).subscribe(r => {
      count = r.count
      firstId = r.results[0].id
    })
    http.expectOne(req => req.url.includes('/vehicles/?page=1')).flush({
      count: 1,
      results: [{ url: 'https://swapi.dev/api/vehicles/4/', name: 'Sand Crawler' }]
    })
    expect(count).toBe(1)
    expect(firstId).toBe('4')
  })
})

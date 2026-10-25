import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { WeatherService } from './weather.service'

describe('WeatherService', () => {
  let service: WeatherService
  let http: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] })
    service = TestBed.inject(WeatherService)
    http = TestBed.inject(HttpTestingController)
  })

  afterEach(() => http.verify())

  it('should map the weather of a city', () => {
    let name = ''
    let temp = 0
    service.getWeatherByCity('Rome').subscribe(w => {
      name = w.name
      temp = w.temp
    })
    http.expectOne(req => req.url.includes('q=Rome')).flush({
      name: 'Rome',
      weather: [{ main: 'Clouds', description: 'overcast clouds' }],
      main: { temp: 290, temp_min: 288, temp_max: 292, humidity: 70, pressure: 1010 }
    })
    expect(name).toBe('Rome')
    expect(temp).toBe(290)
  })
})

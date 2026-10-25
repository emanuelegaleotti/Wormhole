import { TestBed } from '@angular/core/testing'
import { Weather } from '../weather.model'
import { WeatherService } from '../weather.service'
import { WeatherComponent } from './weather.component'

describe('WeatherComponent', () => {
  it('should show the weather of the current position', () => {
    const weather = new Weather('Rome', [], 290, 292, 288, 70, 1010)
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(cb => {
      cb({ coords: { latitude: 1, longitude: 2 } } as GeolocationPosition)
    })
    const getWeather = jasmine.createSpy('getWeather').and.returnValue({ subscribe: (fn: (w: Weather) => void) => fn(weather) })
    TestBed.configureTestingModule({ providers: [{ provide: WeatherService, useValue: { getWeather } }] })

    const component = TestBed.createComponent(WeatherComponent).componentInstance
    expect(getWeather).toHaveBeenCalledWith(1, 2)
    expect(component.weather()).toBe(weather)
  })
})

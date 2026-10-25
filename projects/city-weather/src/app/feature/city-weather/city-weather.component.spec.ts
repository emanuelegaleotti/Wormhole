import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { Weather } from '../weather.model'
import { WeatherService } from '../weather.service'
import { CityWeatherComponent } from './city-weather.component'

describe('CityWeatherComponent', () => {
  const weather = new Weather('Rome', [], 290, 292, 288, 70, 1010)
  const getWeatherByCity = jasmine.createSpy('getWeatherByCity').and.returnValue(of(weather))

  beforeEach(() => {
    getWeatherByCity.calls.reset()
    TestBed.configureTestingModule({ providers: [{ provide: WeatherService, useValue: { getWeatherByCity } }] })
  })

  it('should search the weather of the typed city', () => {
    const component = TestBed.createComponent(CityWeatherComponent).componentInstance
    component.city.set(' Rome ')
    component.getWeather(new Event('submit'))
    expect(getWeatherByCity).toHaveBeenCalledWith('Rome')
    expect(component.weather()).toBe(weather)
  })

  it('should ignore an empty city', () => {
    const component = TestBed.createComponent(CityWeatherComponent).componentInstance
    component.getWeather(new Event('submit'))
    expect(getWeatherByCity).not.toHaveBeenCalled()
  })
})

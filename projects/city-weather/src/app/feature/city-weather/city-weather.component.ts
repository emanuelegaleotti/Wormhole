import { Component, inject, signal } from '@angular/core'
import { WeatherService } from '../weather.service'
import { Weather } from '../weather.model'
import { ToCelsiusPipe } from '../../shared/pipes/to-celsius.pipe'

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
  imports: [ToCelsiusPipe]
})
export class CityWeatherComponent {
  private readonly weatherService = inject(WeatherService)

  readonly weather = signal<Weather | null>(null)
  readonly city = signal('')

  getWeather (event: Event): void {
    event.preventDefault()
    const city = this.city().trim()
    if (!city) {
      return
    }
    this.weatherService.getWeatherByCity(city).subscribe(r => this.weather.set(r))
  }
}

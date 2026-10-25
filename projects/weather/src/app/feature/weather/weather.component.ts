import { Component, inject, signal } from '@angular/core'
import { Weather } from '../weather.model'
import { WeatherService } from '../weather.service'
import { ToCelsiusPipe } from '../../shared/pipes/to-celsius.pipe'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  imports: [ToCelsiusPipe]
})
export class WeatherComponent {
  private readonly weatherService = inject(WeatherService)

  readonly weather = signal<Weather | null>(null)

  constructor () {
    navigator.geolocation.getCurrentPosition(position => {
      this.weatherService
        .getWeather(position.coords.latitude, position.coords.longitude)
        .subscribe(r => this.weather.set(r))
    })
  }
}

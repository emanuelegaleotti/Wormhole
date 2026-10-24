import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms'
import { WeatherService } from '../weather.service'
import { Weather } from '../weather.model'

@Component({
    selector: 'app-city-weather',
    templateUrl: './city-weather.component.html',
    styleUrls: ['./city-weather.component.scss'],
    standalone: false
})
export class CityWeatherComponent  {
  weather: Weather | null = null
  cityForm: FormGroup = new FormGroup({
    city: new FormControl('', [Validators.required])
  })
  constructor(
    private readonly weatherService: WeatherService
  ) { }
  getWeather(): void {
    this.weatherService.getWeatherByCity(
      this.cityForm.controls['city']?.value
    ).subscribe(r => {
      this.weather = r
    })
  }

}

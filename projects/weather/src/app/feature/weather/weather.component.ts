import { Component, OnInit } from '@angular/core';
import { Weather } from '../weather.model';
import { WeatherService } from '../weather.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    standalone: false
})
export class WeatherComponent implements OnInit {
  lat: number = 0
  long: number = 0
  weather: Weather | null = null
  constructor(
    private readonly weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.getLatLong()
  }
  getLatLong(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude
      this.long = position.coords.longitude
      this.getWeather()
    })
  }
  getWeather(): void {
    this.weatherService.getWeather(this.lat, this.long).subscribe(r => {
      this.weather = r
    })
  }

}

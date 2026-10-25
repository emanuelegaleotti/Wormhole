import { Component } from '@angular/core'
import { CityWeatherComponent } from './feature/city-weather/city-weather.component'

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CityWeatherComponent]
})
export class AppComponent {}

import { Component } from '@angular/core'
import { WeatherComponent } from './feature/weather/weather.component'

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [WeatherComponent]
})
export class AppComponent {}

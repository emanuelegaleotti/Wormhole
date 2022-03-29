import { Component } from '@angular/core'
import { environment } from '../environments/environment'

@Component({
  selector: 'wormhole-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wormhole'
  test(): boolean {
    return environment.production
  }
}

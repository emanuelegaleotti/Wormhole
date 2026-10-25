import { Component } from '@angular/core'
import { Timeline2019Component } from './timeline-2019.component'

@Component({
  standalone: true,
  selector: 'app-root',
  template: '<app-timeline-2019 />',
  imports: [Timeline2019Component]
})
export class AppComponent {}

import { Component } from '@angular/core'
import { Timeline1953Component } from './timeline-1953.component'

@Component({
  selector: 'app-root',
  template: '<app-timeline-1953 />',
  imports: [Timeline1953Component]
})
export class AppComponent {}

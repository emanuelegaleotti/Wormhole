import { Component } from '@angular/core'
import { TimelineChatComponent } from '../../../timeline-chat/timeline-chat.component'
import { Timeline } from '../../../timeline-chat/timeline-chat.model'

@Component({
  standalone: true,
  selector: 'app-timeline-1953',
  template: '<app-timeline-chat [timeline]="timeline" />',
  styles: ':host { display: contents }',
  imports: [TimelineChatComponent]
})
export class Timeline1953Component {
  readonly timeline: Timeline = { year: '1953', character: 'Claudia Tiedemann' }
}

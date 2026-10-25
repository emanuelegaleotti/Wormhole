import { Component } from '@angular/core'
import { TimelineChatComponent } from '../../../timeline-chat/timeline-chat.component'
import { Timeline } from '../../../timeline-chat/timeline-chat.model'

@Component({
  selector: 'app-timeline-1986',
  template: '<app-timeline-chat [timeline]="timeline" />',
  styles: ':host { display: contents }',
  imports: [TimelineChatComponent]
})
export class Timeline1986Component {
  readonly timeline: Timeline = { year: '1986', character: 'Egon Tiedemann' }
}

import { Component } from '@angular/core'
import { TimelineChatComponent } from '../../../timeline-chat/timeline-chat.component'
import { Timeline } from '../../../timeline-chat/timeline-chat.model'

@Component({
  standalone: true,
  selector: 'app-timeline-2019',
  template: '<app-timeline-chat [timeline]="timeline" />',
  styles: ':host { display: contents }',
  imports: [TimelineChatComponent]
})
export class Timeline2019Component {
  readonly timeline: Timeline = { year: '2019', character: 'Jonas Kahnwald' }
}

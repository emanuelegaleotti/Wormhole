import { Component } from '@angular/core'
import { CardComponent } from '../../shared/card/card.component'

@Component({
  selector: 'wormhole-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.scss'],
  imports: [CardComponent]
})
export class NotAllowedComponent {}

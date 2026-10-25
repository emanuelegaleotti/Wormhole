import { Component } from '@angular/core'
import { CardComponent } from '../../shared/card/card.component'

@Component({
  standalone: true,
  selector: 'wormhole-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [CardComponent]
})
export class NotFoundComponent {}

import { Component } from '@angular/core'
import { TranslocoDirective } from '@jsverse/transloco'
import { CardComponent } from '../../shared/card/card.component'
import { SetComponentDirective } from 'lorentz-event-bus'

@Component({
  selector: 'wormhole-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CardComponent, SetComponentDirective, TranslocoDirective]
})
export class HomeComponent {}

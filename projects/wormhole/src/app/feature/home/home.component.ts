import { Component } from '@angular/core'
import { TranslocoDirective } from '@jsverse/transloco'
import { CardComponent } from '../../shared/card/card.component'
import { SetComponentDirective } from '../../shared/directive/set-component.directive'

@Component({
  selector: 'wormhole-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CardComponent, SetComponentDirective, TranslocoDirective]
})
export class HomeComponent {}

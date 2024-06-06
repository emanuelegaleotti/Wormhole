import { Component } from '@angular/core'
import { LorentzComponentsModule } from '../../../../../lorentz-components'

@Component({
  selector: 'wormhole-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.scss'],
  standalone: true,
  imports: [
    LorentzComponentsModule
  ],
})
export class NotAllowedComponent {

}

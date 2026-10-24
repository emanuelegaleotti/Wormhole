import { Component } from '@angular/core'
import {  LorentzComponentsModule } from '../../../../../lorentz-components'

@Component({
    selector: 'wormhole-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    imports: [
        LorentzComponentsModule
    ]
})
export class NotFoundComponent {

}

import { Component, ChangeDetectionStrategy } from '@angular/core'
import {  LorentzComponentsModule } from '../../../../../lorentz-components'

@Component({
    selector: 'wormhole-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        LorentzComponentsModule
    ]
})
export class NotFoundComponent {

}

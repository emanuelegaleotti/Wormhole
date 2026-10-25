import { Component, ChangeDetectionStrategy } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'

@Component({
    selector: 'wormhole-not-allowed',
    templateUrl: './not-allowed.component.html',
    styleUrls: ['./not-allowed.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        SharedModule
    ]
})
export class NotAllowedComponent {

}

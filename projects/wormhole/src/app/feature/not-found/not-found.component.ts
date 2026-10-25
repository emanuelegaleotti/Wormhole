import { Component, ChangeDetectionStrategy } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'

@Component({
    selector: 'wormhole-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        SharedModule
    ]
})
export class NotFoundComponent {

}

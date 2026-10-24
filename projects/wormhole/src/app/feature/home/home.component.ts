import { Component, ChangeDetectionStrategy } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'
import { TranslocoModule } from '@ngneat/transloco'

@Component({
    selector: 'wormhole-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        SharedModule,
        TranslocoModule
    ]
})
export class HomeComponent {

}

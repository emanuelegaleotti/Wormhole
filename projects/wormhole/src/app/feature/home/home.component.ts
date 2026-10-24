import { Component } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'
import { TranslocoModule } from '@ngneat/transloco'

@Component({
    selector: 'wormhole-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        SharedModule,
        TranslocoModule
    ]
})
export class HomeComponent {

}

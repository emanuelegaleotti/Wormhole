import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'wormhole-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CardComponent {

}

import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'wormhole-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FooterComponent {}

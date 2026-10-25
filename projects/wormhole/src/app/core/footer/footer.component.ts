import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { TranslocoDirective } from '@jsverse/transloco'
import { LocaleSelectorComponent } from './locale-selector/locale-selector.component'

@Component({
  selector: 'wormhole-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [RouterLink, RouterLinkActive, TranslocoDirective, LocaleSelectorComponent]
})
export class FooterComponent {}

import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { TranslocoDirective } from '@jsverse/transloco'

@Component({
  selector: 'wormhole-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  imports: [RouterLink, RouterLinkActive, TranslocoDirective]
})
export class AsideComponent {}

import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslocoDirective } from '@jsverse/transloco'

@Component({
  standalone: true,
  selector: 'wormhole-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, TranslocoDirective]
})
export class HeaderComponent {}

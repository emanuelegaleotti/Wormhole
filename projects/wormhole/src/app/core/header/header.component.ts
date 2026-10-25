import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslocoDirective } from '@jsverse/transloco'
import { TriquetraComponent } from '../../shared/triquetra/triquetra.component'

@Component({
  selector: 'wormhole-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, TranslocoDirective, TriquetraComponent]
})
export class HeaderComponent {}

import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AsideComponent } from './core/aside/aside.component'
import { SnackbarComponent } from './core/dialog'
import { FooterComponent } from './core/footer/footer.component'
import { HeaderComponent } from './core/header/header.component'
import { LoaderComponent } from './core/loader/loader.component'

@Component({
  standalone: true,
  selector: 'wormhole-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    LoaderComponent,
    SnackbarComponent
  ]
})
export class AppComponent {}

import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { LoaderSelectors } from '../dialog/loader/loader-state/selectors'

@Component({
  selector: 'wormhole-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  readonly loading = inject(Store).selectSignal(LoaderSelectors.selectLoaders)
}

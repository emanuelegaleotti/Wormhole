import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { TranslocoDirective } from '@jsverse/transloco'
import { SnackbarActions } from '../snackbar-state/actions/snackbar.action'
import { SnackbarSelectors } from '../snackbar-state/selectors'

@Component({
  selector: 'lorentz-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  imports: [TranslocoDirective]
})
export class SnackbarComponent {
  private readonly store = inject(Store)

  readonly isOpen = this.store.selectSignal(SnackbarSelectors.selectIsOpen)
  readonly message = this.store.selectSignal(SnackbarSelectors.selectMessage)

  close (): void {
    this.store.dispatch(SnackbarActions.close_snackbar())
  }
}

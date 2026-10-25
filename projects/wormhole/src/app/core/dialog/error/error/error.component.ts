import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { TranslocoDirective } from '@jsverse/transloco'
import { ErrorSelectors } from '../error-state/selectors'
import { ErrorActions } from '../error-state/actions/error.action'

@Component({
  selector: 'lorentz-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  imports: [TranslocoDirective]
})
export class ErrorComponent {
  private readonly store = inject(Store)

  readonly isOpen = this.store.selectSignal(ErrorSelectors.selectIsOpen)
  readonly error = this.store.selectSignal(ErrorSelectors.selectError)

  closeModal (): void {
    this.store.dispatch(ErrorActions.close_dialog())
  }
}

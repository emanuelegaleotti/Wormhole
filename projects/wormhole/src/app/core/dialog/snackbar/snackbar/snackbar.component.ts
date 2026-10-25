import { Component, ChangeDetectionStrategy } from '@angular/core'
import {  Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { SnackbarActions } from '../snackbar-state/actions/snackbar.action'
import { SnackbarSelectors } from '../snackbar-state/selectors'
import { TranslocoModule } from '@ngneat/transloco'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'lorentz-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        AsyncPipe,
        TranslocoModule
    ]
})
export class SnackbarComponent {
  message$: Observable<string>

  constructor (
    private readonly store: Store
  ) {
    this.message$ = this.store.select(SnackbarSelectors.selectMessage)
  }

  close (): void {
    this.store.dispatch(SnackbarActions.close_snackbar())
  }
}

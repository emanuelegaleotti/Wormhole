import { Component } from '@angular/core'
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
  imports: [
    AsyncPipe,
    TranslocoModule
  ],
  standalone: true
})
export class SnackbarComponent {
  message$: Observable<string> = this.store.select(SnackbarSelectors.selectMessage)

  constructor (
    private readonly store: Store
  ) {}

  close (): void {
    this.store.dispatch(SnackbarActions.close_snackbar())
  }
}

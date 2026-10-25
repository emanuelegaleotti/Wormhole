import { Actions, createEffect, ofType } from '@ngrx/effects'
import { delay, distinctUntilChanged, map } from 'rxjs'
import { Store } from '@ngrx/store'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import { SnackbarActions } from '../actions/snackbar.action'
import { SnackbarSelectors } from '../selectors'
import { SnackbarComponent } from '../../snackbar/snackbar.component'
import { Injectable } from '@angular/core'

@Injectable()
export class SnackbarEffects {
  snackbarRef!: MatSnackBarRef<any>

  constructor (
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly snackbar: MatSnackBar
  ) {}

  openModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SnackbarActions.open_snackbar),
      map(a => this.store.select(SnackbarSelectors.selectIsOpen)),
      distinctUntilChanged(),
      map((a) => { this.snackbarRef = this.snackbar.openFromComponent(SnackbarComponent) }),
      delay(7000),
      map(() => SnackbarActions.close_snackbar())
    )
  },)

  closeModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SnackbarActions.close_snackbar),
      map(a => this.store.select(SnackbarSelectors.selectIsOpen)),
      distinctUntilChanged(),
      map((a) => { this.snackbarRef.dismiss() })
    )
  }, { dispatch: false })
}

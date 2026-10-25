import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ErrorActions } from '../actions/error.action'
import { distinctUntilChanged, map } from 'rxjs'
import { Store } from '@ngrx/store'
import { ErrorSelectors } from '../selectors'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ErrorComponent } from '../../error/error.component'
import { Injectable } from '@angular/core'

@Injectable()
export class ErrorEffects {
  modalRef!: MatDialogRef<ErrorComponent>

  constructor (
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {}

  openModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ErrorActions.open_dialog),
      map(a => this.store.select(ErrorSelectors.selectIsOpen)),
      distinctUntilChanged(),
      map((a) => { this.modalRef = this.dialog.open(ErrorComponent) })
    )
  }, { dispatch: false })

  closeModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ErrorActions.close_dialog),
      map(a => this.store.select(ErrorSelectors.selectIsOpen)),
      distinctUntilChanged(),
      map((a) => { this.modalRef.close() })
    )
  }, { dispatch: false })
}

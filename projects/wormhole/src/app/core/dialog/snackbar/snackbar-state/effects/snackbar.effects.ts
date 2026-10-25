import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap, timer } from 'rxjs'
import { SnackbarActions } from '../actions/snackbar.action'

const SNACKBAR_DURATION_MS = 7000

@Injectable()
export class SnackbarEffects {
  private readonly actions$ = inject(Actions)

  autoClose$ = createEffect(() => this.actions$.pipe(
    ofType(SnackbarActions.open_snackbar),
    switchMap(() => timer(SNACKBAR_DURATION_MS)),
    map(() => SnackbarActions.close_snackbar())
  ))
}

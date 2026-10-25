import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'
import { provideEffects } from '@ngrx/effects'
import { provideState } from '@ngrx/store'
import { DialogReducers } from './lorentz-dialog.reducer'
import { LORENTZ_DIALOG_KEY } from './lorentz-dialog.selector'
import { SnackbarEffects } from './snackbar/snackbar-state/effects'

export function provideDialog (): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(LORENTZ_DIALOG_KEY, DialogReducers),
    provideEffects(SnackbarEffects.SnackbarEffects)
  ])
}

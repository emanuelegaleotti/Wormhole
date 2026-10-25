import { LoaderReducers } from './loader/loader-state/reducers'
import { ActionReducerMap } from '@ngrx/store'
import { LORENTZ_DIALOG_KEY } from './lorentz-dialog.selector'
import { SnackbarReducers } from './snackbar/snackbar-state/reducers'

export interface DialogState {
  loaderState: LoaderReducers.LoaderState
  snackBarState: SnackbarReducers.SnackbarState
}

export interface DialogModuleState {
  [LORENTZ_DIALOG_KEY]: DialogState
}

export const DialogReducers: ActionReducerMap<DialogState> = {
  loaderState: LoaderReducers.loaderReducer,
  snackBarState: SnackbarReducers.snackbarReducer
}

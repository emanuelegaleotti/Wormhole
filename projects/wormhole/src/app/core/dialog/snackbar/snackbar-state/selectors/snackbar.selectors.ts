import { createSelector } from '@ngrx/store'
import { selectDialogModuleState } from '../../../lorentz-dialog.selector'
import { DialogState } from '../../../lorentz-dialog.reducer'
import { SnackbarState } from '../reducers/snackbar.reducers'

export const selectSnackbarState = createSelector(
  selectDialogModuleState,
  (a: DialogState): SnackbarState => a.snackBarState
)
export const selectMessage = createSelector(
  selectSnackbarState,
  (a: SnackbarState): any => a.message
)
export const selectIsOpen = createSelector(
  selectSnackbarState,
  (a: SnackbarState): boolean => a.isOpen
)

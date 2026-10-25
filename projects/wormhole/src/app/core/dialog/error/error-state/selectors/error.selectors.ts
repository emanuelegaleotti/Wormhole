import { createSelector } from '@ngrx/store'
import { ErrorState } from '../reducers/error.reducers'
import { selectDialogModuleState } from '../../../lorentz-dialog.selector'
import { DialogState } from '../../../lorentz-dialog.reducer'

export const selectErrorState = createSelector(
  selectDialogModuleState,
  (a: DialogState): ErrorState => a.errorState
)
export const selectError = createSelector(
  selectErrorState,
  (a: ErrorState): any => a.error
)
export const selectIsOpen = createSelector(
  selectErrorState,
  (a: ErrorState): boolean => a.isOpen
)

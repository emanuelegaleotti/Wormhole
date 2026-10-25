import { createSelector } from '@ngrx/store'

import { LoaderState } from '../reducers/loader.reducer'
import { selectDialogModuleState } from '../../../lorentz-dialog.selector'
import { DialogState } from '../../../lorentz-dialog.reducer'

export const selectLoaderState = createSelector(
  selectDialogModuleState,
  (a: DialogState): LoaderState => a.loaderState
)
export const selectLoaders = createSelector(
  selectLoaderState,
  (a: LoaderState): number => a.loaders
)

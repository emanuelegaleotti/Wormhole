import { Action, createReducer, on } from '@ngrx/store'
import { SnackbarActions } from '../actions/snackbar.action'


export interface SnackbarState {
  message: string,
  isOpen: boolean
}

const initialState: SnackbarState = {
  message: '',
  isOpen: false
}
const reducer = createReducer(
  initialState,
  on(SnackbarActions.open_snackbar, (state): SnackbarState => ({ ...state, isOpen: true })),
  on(SnackbarActions.close_snackbar, (state): SnackbarState => ({ ...state, isOpen: false })),
  on(SnackbarActions.store_message, (state, action): SnackbarState => ({ ...state, message: action.m })),
  on(SnackbarActions.clear_message, (state): SnackbarState => ({ ...state, message: '' })),
)
export function snackbarReducer (state: SnackbarState | undefined, action: Action): SnackbarState {
  return reducer(state, action)
}

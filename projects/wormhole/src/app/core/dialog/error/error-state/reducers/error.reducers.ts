import { Action, createReducer, on } from '@ngrx/store'
import { ErrorActions } from '../actions/error.action'

export interface ErrorState {
  error: any,
  isOpen: boolean
}

const initialState: ErrorState = {
  error: null,
  isOpen: false
}
const reducer = createReducer(
  initialState,
  on(ErrorActions.open_dialog, (state): ErrorState => ({ ...state, isOpen: true })),
  on(ErrorActions.close_dialog, (state): ErrorState => ({ ...state, isOpen: false })),
  on(ErrorActions.store_error, (state, action): ErrorState => ({ ...state, error: action.e })),
  on(ErrorActions.clear_error, (state): ErrorState => ({ ...state, error: null })),
)
export function errorReducer (state: ErrorState | undefined, action: Action): ErrorState {
  return reducer(state, action)
}

import { Action, createReducer, on } from '@ngrx/store'
import { LoaderActions } from '../actions/loader.action'


export interface LoaderState {
  loaders: number
}

const initialState: LoaderState = {
  loaders: 0
}

const reducer = createReducer(
  initialState,
  on(LoaderActions.open, (state): LoaderState => ({ ...state, loaders: state.loaders + 1 })),
  on(LoaderActions.close, (state): LoaderState => ({ ...state, loaders: state.loaders - 1 }))
)

export function loaderReducer (state: LoaderState | undefined, action: Action): LoaderState {
  return reducer(state, action)
}

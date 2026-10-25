import { createAction, createActionGroup, emptyProps } from '@ngrx/store'

export const LoaderActions = createActionGroup({
  source: 'LOADER',
  events: {
    'open': emptyProps(),
    'close': emptyProps()
  }
})


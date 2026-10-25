import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const ErrorActions = createActionGroup({
  source: 'ERROR',
  events: {
    store_error: props<{ e: any }>(),
    clear_error: emptyProps(),
    open_dialog: emptyProps(),
    close_dialog: emptyProps()
  }
})

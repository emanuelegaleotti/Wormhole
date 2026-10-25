import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const SnackbarActions = createActionGroup({
  source: 'SNACKBAR',
  events: {
    store_message: props<{ m: string }>(),
    clear_message: emptyProps(),
    open_snackbar: emptyProps(),
    close_snackbar: emptyProps()
  }
})

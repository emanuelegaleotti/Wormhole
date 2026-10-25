import { createFeatureSelector } from '@ngrx/store'
import { DialogState } from './lorentz-dialog.reducer'


export const LORENTZ_DIALOG_KEY = 'lorentz-dialog-module'

export const selectDialogModuleState = createFeatureSelector<DialogState>(LORENTZ_DIALOG_KEY)

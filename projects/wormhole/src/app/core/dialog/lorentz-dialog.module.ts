import { NgModule } from '@angular/core'
import { LoaderDirective } from './loader/loader-directive/loader.directive'
import { StoreModule } from '@ngrx/store'
import { LORENTZ_DIALOG_KEY } from './lorentz-dialog.selector'
import { DialogReducers } from './lorentz-dialog.reducer'
import { TranslocoModule } from '@ngneat/transloco'
import { EffectsModule } from '@ngrx/effects'
import { ErrorEffects } from './error/error-state/effects'
import { SnackbarEffects } from './snackbar/snackbar-state/effects'
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    LoaderDirective,
  ],
  imports: [
    StoreModule.forFeature(LORENTZ_DIALOG_KEY, DialogReducers),
    EffectsModule.forFeature([ErrorEffects.ErrorEffects, SnackbarEffects.SnackbarEffects]),
    TranslocoModule,
    MatSnackBarModule
  ],
  exports: [LoaderDirective]
})
export class LorentzDialogModule {}

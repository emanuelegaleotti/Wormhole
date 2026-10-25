import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, input } from '@angular/core'
import { TranslocoDirective } from '@jsverse/transloco'
import { DialogService } from '../../dialog/dialog.service'

@Component({
  standalone: true,
  selector: 'wormhole-error-dialog',
  templateUrl: './error-dialog.component.html',
  imports: [TranslocoDirective]
})
export class ErrorDialogComponent {
  private readonly dialogService = inject(DialogService)

  readonly dialogData = input<HttpErrorResponse | undefined>(undefined)

  close (): void {
    this.dialogService.hide()
  }
}

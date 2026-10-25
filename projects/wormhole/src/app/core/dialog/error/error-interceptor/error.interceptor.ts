import { inject } from '@angular/core'
import { HttpRequest, HttpErrorResponse, HttpHandlerFn, HttpEvent } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { DialogService } from '../../dialog/dialog.service'
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'

const ERROR_DIALOG_ID = 'wormhole-error-dialog'

export function ErrorInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const dialogService = inject(DialogService)

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (!dialogService.isOpen(ERROR_DIALOG_ID)) {
        dialogService.createDialog(ErrorDialogComponent, {
          id: ERROR_DIALOG_ID,
          className: 'wormhole-dialog-error',
          dialogData: e
        })
        dialogService.show()
      }
      return throwError(() => e)
    }),
  )
}

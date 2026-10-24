import { inject } from '@angular/core'
import { HttpRequest, HttpErrorResponse, HttpHandlerFn, HttpEvent } from '@angular/common/http'
import { catchError, finalize, Observable, throwError } from 'rxjs'
import { Store } from '@ngrx/store'
import { ErrorActions } from '../error-state/actions/error.action'

export function ErrorInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const store = inject(Store)

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      store.dispatch(ErrorActions.open_dialog())
      store.dispatch(ErrorActions.store_error({ e }))
      return throwError(e)
    }),
  )
}

import { inject } from '@angular/core'
import { HttpRequest, HttpErrorResponse, HttpHandlerFn, HttpEvent } from '@angular/common/http'
import { catchError, finalize, Observable, throwError } from 'rxjs'
import { Store } from '@ngrx/store'
import { LoaderActions } from '../loader-state/actions/loader.action'

export function LoaderInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn):Observable<HttpEvent<any>> {
  const store = inject(Store)
  store.dispatch(LoaderActions.open())
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      store.dispatch(LoaderActions.close())
      return throwError(error)
    }),
    finalize(() => {
      store.dispatch(LoaderActions.close())
    })
  )
}

import { inject } from '@angular/core'
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http'
import { finalize, Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { LoaderActions } from '../loader-state/actions/loader.action'

export function LoaderInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const store = inject(Store)
  store.dispatch(LoaderActions.open())
  return next(req).pipe(
    finalize(() => store.dispatch(LoaderActions.close()))
  )
}

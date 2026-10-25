import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { EnvironmentProviders, Provider } from '@angular/core'
import { provideRouter } from '@angular/router'
import { Translation, TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { provideStore } from '@ngrx/store'
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage'
import { of } from 'rxjs'
import { AppReducer } from '../app/app-state/app-reducers/app.reducers'
import { provideDialog } from '../app/core/dialog'

class EmptyTranslocoLoader implements TranslocoLoader {
  getTranslation () {
    return of<Translation>({})
  }
}

export function provideTestApp (): Array<Provider | EnvironmentProviders> {
  return [
    provideRouter([]),
    provideHttpClient(),
    provideHttpClientTesting(),
    provideStore(AppReducer),
    provideDialog(),
    provideNgxWebstorage(withLocalStorage(), withSessionStorage()),
    provideTransloco({
      config: { availableLangs: ['en'], defaultLang: 'en', prodMode: true },
      loader: EmptyTranslocoLoader
    })
  ]
}

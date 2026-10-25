import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http'
import { registerLocaleData } from '@angular/common'
import localeIt from '@angular/common/locales/it'
import { ApplicationConfig, LOCALE_ID, inject, provideAppInitializer } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { TranslocoService, provideTransloco } from '@jsverse/transloco'
import { LocalStorageService, provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage'
import { environment } from '../environments/environment'
import { AppReducer } from './app-state/app-reducers/app.reducers'
import { appRoutes } from './app.routes'
import { ErrorInterceptor, LoaderInterceptor, provideDialog } from './core/dialog'
import { LOCALE_STORAGE_KEY, DEFAULT_LOCALE } from './core/locale'
import { TranslocoHttpLoader } from './transloco-http.loader'

registerLocaleData(localeIt)

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withXhr(), withInterceptors([LoaderInterceptor, ErrorInterceptor])),
    provideStore(AppReducer),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    provideDialog(),
    provideNgxWebstorage(withLocalStorage(), withSessionStorage()),
    provideTransloco({
      config: {
        availableLangs: ['en', 'it'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production
      },
      loader: TranslocoHttpLoader
    }),
    provideAppInitializer(() => {
      const locale = inject(LocalStorageService).retrieve(LOCALE_STORAGE_KEY) ?? DEFAULT_LOCALE
      inject(TranslocoService).setActiveLang(locale.slice(0, 2))
    }),
    {
      provide: LOCALE_ID,
      useFactory: () => inject(LocalStorageService).retrieve(LOCALE_STORAGE_KEY) ?? DEFAULT_LOCALE
    }
  ]
}

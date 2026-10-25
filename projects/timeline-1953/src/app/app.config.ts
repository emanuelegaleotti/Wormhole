import { ApplicationConfig } from '@angular/core'
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage'

export const appConfig: ApplicationConfig = {
  providers: [provideNgxWebstorage(withLocalStorage(), withSessionStorage())]
}

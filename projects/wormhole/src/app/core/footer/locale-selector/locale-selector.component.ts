import { Component, inject, signal } from '@angular/core'
import { TranslocoDirective } from '@jsverse/transloco'
import { LocalStorageService } from 'ngx-webstorage'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from '../../locale'

@Component({
  selector: 'wormhole-locale-selector',
  templateUrl: './locale-selector.component.html',
  styleUrls: ['./locale-selector.component.scss'],
  imports: [TranslocoDirective]
})
export class LocaleSelectorComponent {
  private readonly localStorage = inject(LocalStorageService)

  readonly locales = [
    { label: 'language.it', value: 'it-IT' },
    { label: 'language.en', value: 'en-US' }
  ]
  readonly locale = signal<string>(this.localStorage.retrieve(LOCALE_STORAGE_KEY) ?? DEFAULT_LOCALE)

  setLocale (locale: string): void {
    const currentLocale = this.locale()
    this.locale.set(locale)
    this.localStorage.store(LOCALE_STORAGE_KEY, locale)
    if (currentLocale !== locale) {
      location.reload()
    }
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { TranslocoService } from '@ngneat/transloco'
import { LocalStorageService } from 'ngx-webstorage'

@Component({
    selector: 'wormhole-locale-selector',
    templateUrl: './locale-selector.component.html',
    styleUrls: ['./locale-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LocaleSelectorComponent implements OnInit {
  locale: { label: string, value: string }[] = [
    { label: 'language.it', value: 'it-IT' },
    { label: 'language.en', value: 'en-US' }
  ]
  localeForm: FormGroup = new FormGroup({
    locale: new FormControl('')
  })

  constructor (
    private readonly translocoService: TranslocoService,
    private readonly localStorage: LocalStorageService
  ) {}

  ngOnInit (): void {
    this.initLocale()
    this.observeLocale()
  }

  initLocale (): void {
    const locale = this.localStorage.retrieve('WORMHOLE_LOCALE') ?? 'en-US'
    this.translocoService.setActiveLang(locale.slice(0,2))
    this.localeForm.controls['locale'].setValue(locale)
  }

  observeLocale (): void {
    this.localeForm.controls['locale'].valueChanges.subscribe(v => {
      this.setLocale(v)
    })
  }

  setLocale (locale: string): void {
    const currentLocale = this.localStorage.retrieve('WORMHOLE_LOCALE') ?? 'en-US'
    this.localStorage.store('WORMHOLE_LOCALE', locale)
    if (currentLocale.slice(0,2) !== locale) {
      location.reload()
    }
  }

}

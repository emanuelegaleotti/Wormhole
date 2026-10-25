import { TestBed } from '@angular/core/testing'
import { LocalStorageService } from 'ngx-webstorage'
import { provideTestApp } from '../../../../testing/test-providers'
import { LOCALE_STORAGE_KEY } from '../../locale'
import { LocaleSelectorComponent } from './locale-selector.component'

describe('LocaleSelectorComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: provideTestApp() })
    TestBed.inject(LocalStorageService).clear(LOCALE_STORAGE_KEY)
  })

  it('should default to en-US', () => {
    const component = TestBed.createComponent(LocaleSelectorComponent).componentInstance
    expect(component.locale()).toBe('en-US')
  })

  it('should keep the stored locale', () => {
    TestBed.inject(LocalStorageService).store(LOCALE_STORAGE_KEY, 'it-IT')
    const component = TestBed.createComponent(LocaleSelectorComponent).componentInstance
    expect(component.locale()).toBe('it-IT')
    TestBed.inject(LocalStorageService).clear(LOCALE_STORAGE_KEY)
  })
})

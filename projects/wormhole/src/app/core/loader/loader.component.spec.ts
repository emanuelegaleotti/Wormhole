import { TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { provideTestApp } from '../../../testing/test-providers'
import { LoaderActions } from '../dialog/loader/loader-state/actions/loader.action'
import { LoaderComponent } from './loader.component'

describe('LoaderComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: provideTestApp() }))

  it('should not be visible without pending requests', () => {
    const component = TestBed.createComponent(LoaderComponent).componentInstance
    expect(component.loading()).toBe(0)
  })

  it('should count open and closed loaders', () => {
    const store = TestBed.inject(Store)
    const component = TestBed.createComponent(LoaderComponent).componentInstance
    store.dispatch(LoaderActions.open())
    expect(component.loading()).toBe(1)
    store.dispatch(LoaderActions.close())
    expect(component.loading()).toBe(0)
  })
})

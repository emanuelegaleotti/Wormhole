import { TestBed } from '@angular/core/testing'
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ providers: [provideNgxWebstorage(withLocalStorage(), withSessionStorage())] })
    expect(TestBed.createComponent(AppComponent).componentInstance).toBeTruthy()
  })
})

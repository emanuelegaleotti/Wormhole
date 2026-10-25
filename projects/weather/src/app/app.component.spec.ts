import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] })
    expect(TestBed.createComponent(AppComponent).componentInstance).toBeTruthy()
  })
})

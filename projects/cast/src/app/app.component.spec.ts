import { TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] })
    expect(TestBed.createComponent(AppComponent).componentInstance).toBeTruthy()
  })
})

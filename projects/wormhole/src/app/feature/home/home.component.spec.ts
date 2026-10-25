import { TestBed } from '@angular/core/testing'
import { provideTestApp } from '../../../testing/test-providers'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: provideTestApp() }))

  it('should create', () => {
    expect(TestBed.createComponent(HomeComponent).componentInstance).toBeTruthy()
  })
})

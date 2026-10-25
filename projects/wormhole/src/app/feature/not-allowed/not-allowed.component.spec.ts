import { TestBed } from '@angular/core/testing'
import { provideTestApp } from '../../../testing/test-providers'
import { NotAllowedComponent } from './not-allowed.component'

describe('NotAllowedComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: provideTestApp() }))

  it('should create', () => {
    expect(TestBed.createComponent(NotAllowedComponent).componentInstance).toBeTruthy()
  })
})

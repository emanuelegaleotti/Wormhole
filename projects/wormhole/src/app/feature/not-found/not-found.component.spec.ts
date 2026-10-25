import { TestBed } from '@angular/core/testing'
import { provideTestApp } from '../../../testing/test-providers'
import { NotFoundComponent } from './not-found.component'

describe('NotFoundComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: provideTestApp() }))

  it('should create', () => {
    expect(TestBed.createComponent(NotFoundComponent).componentInstance).toBeTruthy()
  })
})

import { TestBed } from '@angular/core/testing'
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage'
import { LorentzEventBusService } from './lorentz-event-bus.service'

describe('LorentzEventBusService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({
      providers: [provideNgxWebstorage(withLocalStorage(), withSessionStorage())]
    })
    expect(TestBed.inject(LorentzEventBusService)).toBeTruthy()
  })
})

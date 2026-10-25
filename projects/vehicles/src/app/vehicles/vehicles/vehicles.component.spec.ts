import { TestBed } from '@angular/core/testing'
import { Translation, TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { provideRouter } from '@angular/router'
import { of } from 'rxjs'
import { VehiclesService } from '../vehicles.service'
import { VehiclesComponent } from './vehicles.component'

class EmptyLoader implements TranslocoLoader {
  getTranslation () {
    return of<Translation>({})
  }
}

describe('VehiclesComponent', () => {
  const getVehicles = jasmine.createSpy('getVehicles').and.returnValue(of({
    count: 25,
    previous: '',
    next: '',
    results: [{ id: '4', name: 'Sand Crawler' }]
  }))

  beforeEach(() => {
    getVehicles.calls.reset()
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: VehiclesService, useValue: { getVehicles } },
        provideTransloco({ config: { availableLangs: ['en'], defaultLang: 'en', prodMode: true }, loader: EmptyLoader })
      ]
    })
  })

  it('should load the first page', async () => {
    const fixture = TestBed.createComponent(VehiclesComponent)
    await fixture.whenStable()
    expect(getVehicles).toHaveBeenCalledWith(1)
    expect(fixture.componentInstance.vehicles().length).toBe(1)
    expect(fixture.componentInstance.allVehicles()).toBe(25)
  })

  it('should load the selected page', async () => {
    const fixture = TestBed.createComponent(VehiclesComponent)
    await fixture.whenStable()
    fixture.componentInstance.setPage(2)
    await fixture.whenStable()
    expect(getVehicles).toHaveBeenCalledWith(2)
  })
})

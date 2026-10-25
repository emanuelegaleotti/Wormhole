import { TestBed } from '@angular/core/testing'
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router'
import { of } from 'rxjs'
import { VehiclesService } from '../vehicles.service'
import { VehicleComponent } from './vehicle.component'

describe('VehicleComponent', () => {
  it('should load the vehicle of the route', async () => {
    const getVehicleById = jasmine.createSpy('getVehicleById').and.returnValue(of({ id: '4', name: 'Sand Crawler' }))
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: VehiclesService, useValue: { getVehicleById } },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '4' })) } }
      ]
    })
    const fixture = TestBed.createComponent(VehicleComponent)
    await fixture.whenStable()
    expect(getVehicleById).toHaveBeenCalledWith('4')
    expect(fixture.componentInstance.vehicle()?.name).toBe('Sand Crawler')
  })
})

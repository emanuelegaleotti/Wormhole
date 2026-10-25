import { Routes } from '@angular/router'
import { provideTranslocoScope } from '@jsverse/transloco'
import { VehiclesComponent } from './vehicles/vehicles.component'
import { VehicleComponent } from './vehicle/vehicle.component'

export const VEHICLES_ROUTES: Routes = [
  {
    path: '',
    providers: [provideTranslocoScope('vehicles')],
    children: [
      { path: '', component: VehiclesComponent },
      { path: ':id', component: VehicleComponent }
    ]
  }
]

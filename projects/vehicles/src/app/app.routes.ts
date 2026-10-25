import { Routes } from '@angular/router'

export const appRoutes: Routes = [
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles.routes').then(m => m.VEHICLES_ROUTES)
  }
]

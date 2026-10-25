import { Routes } from '@angular/router'

export const appRoutes: Routes = [
  {
    path: 'cast',
    loadChildren: () => import('./cast/cast.routes').then(m => m.CAST_ROUTES)
  }
]

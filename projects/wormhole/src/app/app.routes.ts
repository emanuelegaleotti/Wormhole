import { loadRemoteModule } from '@angular-architects/module-federation'
import { Routes } from '@angular/router'

export const appRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./feature/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./feature/not-found/not-found.component').then(c => c.NotFoundComponent)
  },
  {
    path: '403',
    loadComponent: () => import('./feature/not-allowed/not-allowed.component').then(c => c.NotAllowedComponent)
  },
  {
    path: 'carbon',
    loadComponent: () => import('./feature/carbon/carbon.component').then(c => c.CarbonComponent)
  },
  {
    path: 'cast',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:3000/castEntry.js',
      remoteName: 'cast',
      exposedModule: './Routes'
    }).then(m => m.CAST_ROUTES)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404' }
]

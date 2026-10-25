import { Routes } from '@angular/router'
import { provideTranslocoScope } from '@jsverse/transloco'
import { CastListComponent } from './cast-list/cast-list.component'

export const CAST_ROUTES: Routes = [
  {
    path: '',
    providers: [provideTranslocoScope('cast')],
    component: CastListComponent
  }
]

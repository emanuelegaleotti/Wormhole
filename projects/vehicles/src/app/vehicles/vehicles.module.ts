import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { SharedModule } from '../shared/shared.module'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'




@NgModule({
    declarations: [
        VehiclesComponent,
        VehicleComponent
    ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    SharedModule,
    TranslocoModule
  ],
  providers:[{ provide: TRANSLOCO_SCOPE, useValue: 'vehicles' }]
})
export class VehiclesModule { }

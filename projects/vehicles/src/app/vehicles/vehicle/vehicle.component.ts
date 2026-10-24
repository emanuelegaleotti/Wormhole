import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../vehicle.model';
import { VehiclesService } from '../vehicles.service';

@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle.component.html',
    styleUrls: ['./vehicle.component.scss'],
    standalone: false
})
export class VehicleComponent implements OnInit {
  vehicleId: string = ''
  vehicle: Vehicle | null = null
  constructor (
    private readonly route: ActivatedRoute,
    private readonly vehiclesService: VehiclesService
  ) { }

  ngOnInit (): void {
    this.getPlanetId()
  }

  getPlanetId (): void {
    this.route.params.subscribe(v => {
      if (v['id']) {
        this.vehicleId = v['id']
        this.getPlanet()
      }
    })
  }

  getPlanet (): void {
    this.vehiclesService.getVehicleById(this.vehicleId).subscribe(v => {
      this.vehicle = v
    })
  }

}

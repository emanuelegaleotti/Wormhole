import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehiclesService } from '../vehicles.service';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.scss'],
    standalone: false
})
export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[] = []
  currentPage: number = 1
  allVehicles: number = 0

  constructor(private readonly vehiclesService: VehiclesService) { }
  ngOnInit(): void {
    this.geVehicles()
  }

  geVehicles(): void {
    this.vehiclesService.getVehicles(this.currentPage).subscribe(v => {
      this.vehicles = v.results
      this.allVehicles = v.count
    })
  }

  setPage(id: number): void {
    this.currentPage = id
    this.geVehicles()
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Swapi } from '../shared/models/swapi-model';
import { Vehicle } from './vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private readonly http = inject(HttpClient)


  getVehicles (idPage: number): Observable<Swapi> {
    return this.http.get<Swapi>(`${environment.swapiUrl}/vehicles/?page=${idPage}`).pipe(
      map(r => ({ ...r, results: r.results.map((p: { [key: string]: string | number }) => this.mapVehicle(p)) }))
    )
  }

  getVehicleById (id: string): Observable<Vehicle> {
    return this.http.get<{ [key: string]: any }>(`${environment.swapiUrl}/vehicles/${id}`).pipe(
      map(p => this.mapVehicle(p)))
  }

  mapVehicle (p: { [key: string]: any }): Vehicle {
    return new Vehicle(
      p['url'].replace('https://swapi.dev/api/vehicles/', '').replace('/', ''),
      p['name'],
      p['model'],
      p['manufacturer'],
      p['length'],
      p['passengers'],
      p['cargo_capacity'],
      p['vehicle_class'],
    )
  }
}

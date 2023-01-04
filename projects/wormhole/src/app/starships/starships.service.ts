import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Swapi } from '../shared/models/swapi-model'
import { Starship } from './starship.model'

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {
  constructor(private readonly http: HttpClient) { }

  getStarships(pageId: number): Observable<Swapi> {
    return this.http.get<Swapi>(`${environment.swapiUrl}/starships/?page=${pageId}`).pipe(
      map(r => ({ ...r, results: r.results.map((p: { [key: string]: string | number }) => this.mapStarship(p)) }))
    )
  }

  getStarshipById(id: string): Observable<Starship> {
    return this.http.get<{ [key: string]: any }>(`${environment.swapiUrl}/starships/${id}`).pipe(
      map(p => this.mapStarship(p)))
  }

  mapStarship(p: { [key: string]: any }): Starship {
    return new Starship(
      p['url'].replace('https://swapi.dev/api/starships/', '').replace('/', ''),
      p['hyperdrive_rating'],
      p['length'],
      p['manufacturer'],
      p['model'],
      p['name'],
      p['passengers'],
      p['starship_class']
    )
  }
}

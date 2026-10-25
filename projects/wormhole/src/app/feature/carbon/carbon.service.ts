import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { environment } from '../../../environments/environment'

export interface CarbonIntensity {
  from: string
  to: string
  intensity: { forecast: number, actual: number | null, index: string }
}

export interface GenerationMixItem {
  fuel: string
  perc: number
}

@Injectable({ providedIn: 'root' })
export class CarbonService {
  private readonly baseUrl = environment.carbonIntensityUrl

  constructor (private readonly http: HttpClient) {}

  getIntensity (): Observable<CarbonIntensity> {
    return this.http.get<{ data: CarbonIntensity[] }>(`${this.baseUrl}/intensity`)
      .pipe(map(r => r.data[0]))
  }

  getGenerationMix (): Observable<GenerationMixItem[]> {
    return this.http.get<{ data: { generationmix: GenerationMixItem[] } }>(`${this.baseUrl}/generation`)
      .pipe(map(r => r.data.generationmix.filter(g => g.perc > 0).sort((a, b) => b.perc - a.perc)))
  }
}

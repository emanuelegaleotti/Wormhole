import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { CastMember, TvMazeCastEntry } from './cast.model'

@Injectable({
  providedIn: 'root'
})
export class CastService {
  private readonly http = inject(HttpClient)

  getCast (): Observable<CastMember[]> {
    return this.http.get<TvMazeCastEntry[]>(environment.castUrl).pipe(
      map(entries => entries.map(({ person, character }) => ({
        id: person.id,
        actor: person.name,
        actorUrl: person.url,
        photo: person.image?.medium ?? null,
        character: character.name,
        characterUrl: character.url,
        country: person.country?.name ?? null,
        birthday: person.birthday
      })))
    )
  }
}

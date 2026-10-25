import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { CastService } from './cast.service'

describe('CastService', () => {
  let service: CastService
  let http: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] })
    service = TestBed.inject(CastService)
    http = TestBed.inject(HttpTestingController)
  })

  afterEach(() => http.verify())

  it('should map the cast of the show', () => {
    let result: unknown
    service.getCast().subscribe(r => (result = r))
    http.expectOne(req => req.url.endsWith('/shows/17861/cast')).flush([
      {
        person: {
          id: 1,
          name: 'Louis Hofmann',
          url: 'https://www.tvmaze.com/people/1',
          country: { name: 'Germany' },
          birthday: '1997-06-03',
          image: { medium: 'https://static.tvmaze.com/1.jpg' }
        },
        character: { id: 2, name: 'Jonas Kahnwald', url: 'https://www.tvmaze.com/characters/2' }
      },
      {
        person: { id: 3, name: 'Unknown', url: 'https://www.tvmaze.com/people/3', country: null, birthday: null, image: null },
        character: { id: 4, name: 'Extra', url: 'https://www.tvmaze.com/characters/4' }
      }
    ])
    expect(result).toEqual([
      {
        id: 1,
        actor: 'Louis Hofmann',
        actorUrl: 'https://www.tvmaze.com/people/1',
        photo: 'https://static.tvmaze.com/1.jpg',
        character: 'Jonas Kahnwald',
        characterUrl: 'https://www.tvmaze.com/characters/2',
        country: 'Germany',
        birthday: '1997-06-03'
      },
      {
        id: 3,
        actor: 'Unknown',
        actorUrl: 'https://www.tvmaze.com/people/3',
        photo: null,
        character: 'Extra',
        characterUrl: 'https://www.tvmaze.com/characters/4',
        country: null,
        birthday: null
      }
    ])
  })
})

import { TestBed } from '@angular/core/testing'
import { Translation, TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { of } from 'rxjs'
import { CastMember } from '../cast.model'
import { CastService } from '../cast.service'
import { CastListComponent } from './cast-list.component'

class EmptyLoader implements TranslocoLoader {
  getTranslation () {
    return of<Translation>({})
  }
}

const members: CastMember[] = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  actor: `Actor ${i}`,
  actorUrl: `https://www.tvmaze.com/people/${i}`,
  photo: null,
  character: `Character ${i}`,
  characterUrl: `https://www.tvmaze.com/characters/${i}`,
  country: 'Germany',
  birthday: '1990-01-01'
}))

describe('CastListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CastService, useValue: { getCast: () => of(members) } },
        provideTransloco({ config: { availableLangs: ['en'], defaultLang: 'en', prodMode: true }, loader: EmptyLoader })
      ]
    })
  })

  it('should show the first page of the cast', async () => {
    const fixture = TestBed.createComponent(CastListComponent)
    await fixture.whenStable()
    expect(fixture.componentInstance.total()).toBe(25)
    expect(fixture.componentInstance.members().length).toBe(10)
    expect(fixture.componentInstance.members()[0].actor).toBe('Actor 0')
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(10)
  })

  it('should show the selected page', async () => {
    const fixture = TestBed.createComponent(CastListComponent)
    await fixture.whenStable()
    fixture.componentInstance.setPage(3)
    expect(fixture.componentInstance.members().map(m => m.id)).toEqual([20, 21, 22, 23, 24])
  })
})

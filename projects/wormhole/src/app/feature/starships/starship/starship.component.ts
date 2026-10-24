import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Starship } from '../starship.model'
import { StarshipActions } from '../starships-state/actions'
import { StarshipSelectors } from '../starships-state/selectors'
import { StarshipsModuleState } from '../starships-state/starships.reducer'

@Component({
    selector: 'wormhole-starship',
    templateUrl: './starship.component.html',
    styleUrls: ['./starship.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class StarshipComponent implements OnInit{
  starship$: Observable<Starship | null> = this.store.select(StarshipSelectors.selectStarship)
  constructor (
    private readonly route: ActivatedRoute,
    private readonly store: Store<StarshipsModuleState>
  ) { }

  ngOnInit (): void {
    this.getpersonId()
  }

  getpersonId (): void {
    this.route.params.subscribe(p => {
      if (p['id']) {
        this.store.dispatch(StarshipActions.storeStarshipId({id: p['id']})) 
      }
    })
  }
}

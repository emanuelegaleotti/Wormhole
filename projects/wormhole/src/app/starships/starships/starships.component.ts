import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Starship } from '../starship.model';
import { StarshipActions } from '../starships-state/actions';
import { StarshipsSelector } from '../starships-state/selectors';
import { StarshipsModuleState } from '../starships-state/starships.reducer';


@Component({
  selector: 'wormhole-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipsComponent implements OnInit {
  starships$: Observable<Starship[]> = this.store.select(StarshipsSelector.selectStarships)
  allStarships$: Observable<number> = this.store.select(StarshipsSelector.selectAllStarships)
  actions = StarshipActions
  constructor(
    public readonly store: Store<StarshipsModuleState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(StarshipActions.initStarships())
  }
}

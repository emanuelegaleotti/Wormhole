import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PersonActions } from '../people-state/actions';
import { PeopleModuleState } from '../people-state/people.reducer';
import { PersonSelector } from '../people-state/selectors';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';

@Component({
    selector: 'wormhole-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
    standalone: false
})
export class PeopleComponent implements OnInit {
  currentPage$: Observable<number> = this.store.select(PersonSelector.selectCurrentPage)
  people: Person[] = []
  allPeople: number = 0
  actions = PersonActions
  currentPage: number = 0
  constructor(
    public readonly store: Store<PeopleModuleState>,
    private readonly peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.observeCurrentPage()
  }
  observeCurrentPage(): void {
    this.currentPage$.subscribe(p => {
      this.getPeople(p)
    })
  }
  getPeople(p: number): void {
    this.peopleService.getPeople(p).subscribe(r => {
      this.people = r.results
      this.allPeople = r.count
    })
  }
  indexPerson(p: Person): string {
    return p.id
  }

}

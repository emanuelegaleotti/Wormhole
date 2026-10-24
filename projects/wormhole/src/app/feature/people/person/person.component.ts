import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';

@Component({
    selector: 'wormhole-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss'],
    standalone: false
})
export class PersonComponent implements OnInit {
  personId: string = ''
  person: Person | null = null
  constructor (
    private readonly route: ActivatedRoute,
    private readonly peopleService: PeopleService
  ) { }

  ngOnInit (): void {
    this.getpersonId()
  }

  getpersonId (): void {
    this.route.params.subscribe(p => {
      if (p['id']) {
        this.personId = p['id']
        this.getperson()
      }
    })
  }

  getperson (): void {
    this.peopleService.getPersonById(this.personId).subscribe(p => {
      this.person = p
    })
  }
}

import { Component, OnInit } from '@angular/core'
import { FilmService } from '../film.service'
import { Film } from '../film.model'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { take } from 'rxjs'

@Component({
    selector: 'wormhole-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.scss'],
    standalone: false
})
export class FilmsComponent implements OnInit {
  films: Film[] = []
  ratingForm: FormGroup = new FormGroup({
    ratings: new FormArray([])
  })

  constructor (
    private readonly filmService: FilmService
  ) { }

  get ratings (): FormArray {
    return this.ratingForm.controls['ratings'] as FormArray
  }

  ngOnInit (): void {
    this.getFilms()
  }

  getFilms (): void {
    this.filmService.getFilms().subscribe(r => {
      this.films = r
      r.forEach(f => {
        this.ratings.push(new FormControl(0))
      })
      this.observeChanges()
    })
  }

  observeChanges (): void {
    this.ratings.controls.forEach((c, i) => {
      c.valueChanges.pipe(
        take(1)
      ).subscribe(v => {
        this.filmService.setRating(this.films[i].id, v)
        c.disable()
      })
    })
  }
}

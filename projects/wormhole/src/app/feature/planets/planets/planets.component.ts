import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Planet } from '../planet-model'
import { PlanetsService } from '../planets.service'

@Component({
    selector: 'wormhole-planets',
    templateUrl: './planets.component.html',
    styleUrls: ['./planets.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PlanetsComponent implements OnInit {
  planets: Planet[] = []
  currentPage: number = 1
  allPlanets: number = 0

  constructor(
    private readonly planetsService: PlanetsService
  ) { }
  ngOnInit(): void {
    this.gePlanets()
  }

  gePlanets(): void {
    this.planetsService.getPlanets(this.currentPage).subscribe(p => {
      this.planets = p.results
      this.allPlanets = p.count
    })
  }

  setPage(id: number): void {
    this.currentPage = id
    this.gePlanets()
  }
}

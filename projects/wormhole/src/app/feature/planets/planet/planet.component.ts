import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Planet } from '../planet-model'
import { PlanetsService } from '../planets.service'

@Component({
    selector: 'wormhole-planet',
    templateUrl: './planet.component.html',
    styleUrls: ['./planet.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PlanetComponent implements OnInit {
  planetId: string = ''
  planet: Planet | null = null
  constructor (
    private readonly route: ActivatedRoute,
    private readonly planetsService: PlanetsService
  ) { }

  ngOnInit (): void {
    this.getPlanetId()
  }

  getPlanetId (): void {
    this.route.params.subscribe(p => {
      if (p['id']) {
        this.planetId = p['id']
        this.getPlanet()
      }
    })
  }

  getPlanet (): void {
    this.planetsService.getPlanetById(this.planetId).subscribe(p => {
      this.planet = p
    })
  }
}

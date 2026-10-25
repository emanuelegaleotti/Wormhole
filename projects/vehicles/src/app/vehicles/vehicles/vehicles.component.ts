import { Component, computed, inject, signal } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { RouterLink } from '@angular/router'
import { TranslocoDirective } from '@jsverse/transloco'
import { PagerComponent } from '../../shared/pager/pager.component'
import { VehiclesService } from '../vehicles.service'

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  imports: [RouterLink, TranslocoDirective, PagerComponent]
})
export class VehiclesComponent {
  private readonly vehiclesService = inject(VehiclesService)

  readonly currentPage = signal(1)
  private readonly page = rxResource({
    params: () => this.currentPage(),
    stream: ({ params }) => this.vehiclesService.getVehicles(params)
  })

  readonly vehicles = computed(() => this.page.value()?.results ?? [])
  readonly allVehicles = computed(() => this.page.value()?.count ?? 0)

  setPage (id: number): void {
    this.currentPage.set(id)
  }
}

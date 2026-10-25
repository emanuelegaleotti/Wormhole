import { Component, inject } from '@angular/core'
import { rxResource, toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { map } from 'rxjs'
import { VehiclesService } from '../vehicles.service'

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  imports: [RouterLink]
})
export class VehicleComponent {
  private readonly vehiclesService = inject(VehiclesService)

  private readonly vehicleId = toSignal(inject(ActivatedRoute).paramMap.pipe(map(p => p.get('id'))))
  readonly vehicleResource = rxResource({
    params: () => this.vehicleId() ?? undefined,
    stream: ({ params }) => this.vehiclesService.getVehicleById(params)
  })
  readonly vehicle = this.vehicleResource.value
}

import { Component, computed, inject, signal } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { DecimalPipe } from '@angular/common'
import { TranslocoDirective } from '@jsverse/transloco'
import { forkJoin } from 'rxjs'
import { CardComponent } from '../../shared/card/card.component'
import { CarbonService } from './carbon.service'

@Component({
  standalone: true,
  selector: 'wormhole-carbon',
  templateUrl: './carbon.component.html',
  styleUrls: ['./carbon.component.scss'],
  imports: [DecimalPipe, TranslocoDirective, CardComponent]
})
export class CarbonComponent {
  private readonly carbonService = inject(CarbonService)

  private readonly data = rxResource({
    stream: () => forkJoin({
      intensity: this.carbonService.getIntensity(),
      mix: this.carbonService.getGenerationMix()
    })
  })

  readonly intensity = computed(() => this.data.value()?.intensity ?? null)
  readonly mix = computed(() => this.data.value()?.mix ?? [])
  readonly error = computed(() => this.data.error() !== undefined)
  readonly kwh = signal(1)

  readonly currentValue = computed(() => {
    const i = this.intensity()?.intensity
    return i?.actual ?? i?.forecast ?? 0
  })
  readonly emissions = computed(() => this.currentValue() * (this.kwh() || 0))
  readonly indexKey = computed(() => (this.intensity()?.intensity.index ?? '').toLowerCase())
}

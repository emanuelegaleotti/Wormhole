import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core'
import { DecimalPipe, NgClass } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { forkJoin } from 'rxjs'
import { SharedModule } from '../../shared/shared.module'
import { CarbonIntensity, CarbonService, GenerationMixItem } from './carbon.service'

@Component({
  selector: 'wormhole-carbon',
  templateUrl: './carbon.component.html',
  styleUrls: ['./carbon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, NgClass, FormsModule, TranslocoModule, SharedModule]
})
export class CarbonComponent implements OnInit {
  intensity = signal<CarbonIntensity | null>(null)
  mix = signal<GenerationMixItem[]>([])
  error = signal(false)
  kwh = signal(1)

  constructor (private readonly carbonService: CarbonService) {}

  ngOnInit (): void {
    forkJoin([this.carbonService.getIntensity(), this.carbonService.getGenerationMix()]).subscribe({
      next: ([intensity, mix]) => {
        this.intensity.set(intensity)
        this.mix.set(mix)
      },
      error: () => this.error.set(true)
    })
  }

  get currentValue (): number {
    const i = this.intensity()?.intensity
    return i?.actual ?? i?.forecast ?? 0
  }

  get emissions (): number {
    return this.currentValue * (Number(this.kwh()) || 0)
  }

  indexKey (): string {
    return (this.intensity()?.intensity.index ?? '').toLowerCase()
  }
}

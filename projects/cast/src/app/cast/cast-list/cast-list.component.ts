import { DatePipe } from '@angular/common'
import { Component, computed, inject, signal } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { TranslocoDirective } from '@jsverse/transloco'
import { PAGE_SIZE, PagerComponent } from '../../shared/pager/pager.component'
import { CastService } from '../cast.service'

@Component({
  standalone: true,
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.scss'],
  imports: [DatePipe, TranslocoDirective, PagerComponent]
})
export class CastListComponent {
  private readonly castService = inject(CastService)

  readonly currentPage = signal(1)
  private readonly cast = rxResource({
    stream: () => this.castService.getCast()
  })

  readonly allMembers = computed(() => this.cast.value() ?? [])
  readonly total = computed(() => this.allMembers().length)
  readonly members = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE
    return this.allMembers().slice(start, start + PAGE_SIZE)
  })

  setPage (id: number): void {
    this.currentPage.set(id)
  }
}

import { Component, computed, input, linkedSignal, output } from '@angular/core'

export const PAGE_SIZE = 10

@Component({
  standalone: true,
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  readonly totalItems = input(0)
  readonly pageIndex = input(1)
  readonly whenPageSelected = output<number>()

  readonly currentPage = linkedSignal(() => this.pageIndex())
  readonly pagesLength = computed(() => Math.ceil(this.totalItems() / PAGE_SIZE))
  readonly pages = computed(() => {
    const current = this.currentPage()
    const length = this.pagesLength()
    const pages: number[] = []
    let ignoredIndex = 0
    for (let i = current - 2; i <= current + 2; i++) {
      if (i > 0 && i <= length) {
        pages.push(i)
      } else {
        ignoredIndex++
      }
    }
    for (let i = 1; i <= ignoredIndex; i++) {
      if (current > 2) {
        pages.unshift(current - 2 - i)
      } else {
        pages.push(current + 2 + i)
      }
    }
    return pages
  })

  setPage (pn: number): void {
    this.currentPage.set(pn)
    this.whenPageSelected.emit(pn)
  }
}

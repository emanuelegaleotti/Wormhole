import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core'

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PagerComponent implements OnChanges {
  @Input() totalItems: number = 0
  @Input() pageIndex: number = 1
  @Output() whenPageSelected: EventEmitter<number> = new EventEmitter()
  pages: number[] = []
  pagesLength: number = 0
  currentPage: number = 1

  ngOnChanges (changes: SimpleChanges): void {
    if (changes['totalItems']?.currentValue) {
      this.pagesLength = this.totalItems % 10 ? (Math.floor(this.totalItems / 10)) + 1 : this.totalItems / 10
      // this.pages = Array(this.totalItems % 10 ? (Math.floor(this.totalItems / 10)) + 1 : this.totalItems / 10).fill('').map((p, i) => i + 1)
      this.filterPager()
    }
    if (changes['pageIndex']?.currentValue) {
      this.currentPage = this.pageIndex
      this.filterPager()
    }
  }

  filterPager (): void {
    this.pages = []
    let ignoredIndex = 0
    for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
      if (i > 0 && i <= this.pagesLength) {
        this.pages.push(i)
      } else {
        ignoredIndex++
      }
    }
    for (let i = 1; i <= ignoredIndex; i++) {
      if (this.currentPage > 2) {
        this.pages.unshift(this.currentPage - 2 - i)
      } else {
        this.pages.push(this.currentPage + 2 + i)
      }
    }
  }

  setPage (pn: number): void {
    this.currentPage = pn
    this.filterPager()
    this.whenPageSelected.emit(pn)
  }

}

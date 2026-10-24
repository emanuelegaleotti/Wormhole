import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss'],
    standalone: false
})
export class PagerComponent implements OnChanges {
  @Input() totalItems: number = 0
  @Output() whenPageSelected: EventEmitter<number> = new EventEmitter()
  pages: number[] = []

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'].currentValue) {
      this.pages = Array(this.totalItems % 10 ? (Math.floor(this.totalItems / 10)) + 1 : this.totalItems / 10).fill('').map((p, i) => i + 1)
    }
  }

  setPage(pn: number): void {
    this.whenPageSelected.emit(pn)
  }


}

import { TestBed } from '@angular/core/testing'
import { PagerComponent } from './pager.component'

describe('PagerComponent', () => {
  function setup (totalItems: number, pageIndex = 1) {
    const fixture = TestBed.createComponent(PagerComponent)
    fixture.componentRef.setInput('totalItems', totalItems)
    fixture.componentRef.setInput('pageIndex', pageIndex)
    return fixture.componentInstance
  }

  it('should compute the number of pages', () => {
    expect(setup(95).pagesLength()).toBe(10)
  })

  it('should show five pages around the current one', () => {
    expect(setup(200, 1).pages()).toEqual([1, 2, 3, 4, 5])
    expect(setup(200, 10).pages()).toEqual([8, 9, 10, 11, 12])
  })

  it('should emit the selected page', () => {
    const component = setup(100)
    let selected = 0
    component.whenPageSelected.subscribe(p => (selected = p))
    component.setPage(3)
    expect(selected).toBe(3)
    expect(component.currentPage()).toBe(3)
  })
})

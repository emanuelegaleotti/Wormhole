import {Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Store } from '@ngrx/store'
import { LoaderSelectors } from '../loader-state/selectors'


@Directive({
    selector: '[lorentzLoader]',
    standalone: false
})
export class LoaderDirective implements OnInit {

  constructor (
    private readonly templateRef: TemplateRef<LoaderDirective>,
    public readonly view: ViewContainerRef,
    public readonly store: Store,
  ) { }

  ngOnInit (): void {
    this.store.select(LoaderSelectors.selectLoaders).subscribe(n => {
      if(n){
        this.view.createEmbeddedView(this.templateRef)
      }else {
        this.view.clear()
      }
    })
  }

}

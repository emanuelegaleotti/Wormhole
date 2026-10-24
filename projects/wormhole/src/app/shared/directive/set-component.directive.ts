import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core'
import { loadRemoteModule } from '@angular-architects/module-federation'
import { error } from 'ng-packagr/lib/utils/log'

@Directive({
    selector: '[lorentzSetComponent]',
    standalone: false
})
export class SetComponentDirective implements OnInit {
  @Input() lorentzSetComponent: string = ''
  @Input() remoteUrl: string = ''
  @Input() remoteName: string = ''

  constructor (
    private readonly view: ViewContainerRef
  ) { }

  ngOnInit (): void {
    this.loadComponent()
  }

  loadComponent (): void {
    loadRemoteModule({
      exposedModule: './Component',
      remoteEntry: this.remoteUrl,
     remoteName: this.remoteName
    }).then(c => {
        this.view.clear();
        this.view.createComponent(c[this.lorentzSetComponent])
      },
      e => {
        console.error(e)
      })
  }
}

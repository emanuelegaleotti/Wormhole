import { Directive, OnInit, Type, ViewContainerRef, inject, input } from '@angular/core'
import { loadRemoteModule } from '@angular-architects/module-federation'

@Directive({
  standalone: true,
  selector: '[lorentzSetComponent]'
})
export class SetComponentDirective implements OnInit {
  private readonly view = inject(ViewContainerRef)

  readonly lorentzSetComponent = input.required<string>()
  readonly remoteUrl = input.required<string>()
  readonly remoteName = input.required<string>()

  ngOnInit (): void {
    this.loadComponent()
  }

  private loadComponent (): void {
    loadRemoteModule<Record<string, Type<unknown>>>({
      exposedModule: './Component',
      remoteEntry: this.remoteUrl(),
      remoteName: this.remoteName()
    }).then(
      m => {
        this.view.clear()
        const ref = this.view.createComponent(m[this.lorentzSetComponent()])
        ref.changeDetectorRef.markForCheck()
      },
      e => console.error(e)
    )
  }
}

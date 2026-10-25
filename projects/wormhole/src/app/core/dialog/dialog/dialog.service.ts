import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, Type, createComponent, inject } from '@angular/core'
import { DialogContainerComponent } from './dialog-container.component'
import { DialogModel } from './dialog.model'

interface OpenDialog {
  ref: ComponentRef<DialogContainerComponent>
  host: HTMLElement
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly injector = inject(EnvironmentInjector)
  private readonly appRef = inject(ApplicationRef)
  private readonly stack: OpenDialog[] = []
  private pending: OpenDialog | null = null

  // Builds the dialog without showing it, so callers can subscribe to the lifecycle events first.
  createDialog (component: Type<unknown>, config?: DialogModel): DialogContainerComponent {
    const host = document.createElement('wormhole-dialogs-host')
    const ref = createComponent(DialogContainerComponent, { environmentInjector: this.injector, hostElement: host })
    ref.setInput('dialogConfig', config)
    this.appRef.attachView(ref.hostView)
    document.body.appendChild(host)
    ref.changeDetectorRef.detectChanges()
    ref.instance.injectCustomComponent(component)
    const entry = { ref, host }
    this.pending = entry
    ref.instance.whenClosed.subscribe(() => this.dispose(entry))
    return ref.instance
  }

  show (): void {
    const dialog = this.pending
    if (dialog) {
      this.pending = null
      this.stack.push(dialog)
      dialog.ref.instance.show()
    }
  }

  hide (closeData?: unknown): void {
    this.stack[this.stack.length - 1]?.ref.instance.hide(closeData)
  }

  isOpen (id: string): boolean {
    return this.stack.some(d => d.host.querySelector(`dialog#${CSS.escape(id)}`))
  }

  private dispose (dialog: OpenDialog): void {
    const index = this.stack.indexOf(dialog)
    if (index >= 0) {
      this.stack.splice(index, 1)
    }
    dialog.ref.destroy()
    dialog.host.remove()
  }
}

import { Component, ElementRef, Type, ViewContainerRef, computed, inputBinding, input, viewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { DialogModel } from './dialog.model'

@Component({
  selector: 'wormhole-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.scss'
})
export class DialogContainerComponent {
  readonly dialogConfig = input<DialogModel | undefined>(undefined)

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog')
  private readonly outlet = viewChild.required('outlet', { read: ViewContainerRef })

  readonly whenOpen = new Subject<void>()
  readonly whenOpened = new Subject<void>()
  readonly whenClose = new Subject<unknown>()
  readonly whenClosed = new Subject<void>()

  private closeData: unknown
  private closeNotified = false

  show (): void {
    this.whenOpen.next()
    this.dialog().nativeElement.showModal()
    this.whenOpened.next()
  }

  hide (closeData?: unknown): void {
    this.closeData = closeData
    const dialog = this.dialog().nativeElement
    if (dialog.open) {
      dialog.close()
    } else {
      this.onNativeClose()
    }
  }

  injectCustomComponent (component: Type<unknown>): void {
    const data = computed(() => this.dialogConfig()?.dialogData)
    this.outlet().createComponent(component, { bindings: [inputBinding('dialogData', data)] })
  }

  // Fired for hide(), the Escape key and every other way the native dialog closes.
  onNativeClose (): void {
    if (this.closeNotified) {
      return
    }
    this.closeNotified = true
    this.whenClose.next(this.closeData)
    this.whenClosed.next()
  }

  onClick (event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) {
      this.hide()
    }
  }
}

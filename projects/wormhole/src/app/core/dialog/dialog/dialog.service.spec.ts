import { HttpErrorResponse } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { ErrorDialogComponent } from '../error/error-dialog/error-dialog.component'
import { provideTestApp } from '../../../../testing/test-providers'
import { DialogService } from './dialog.service'

describe('DialogService', () => {
  let service: DialogService

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: provideTestApp() })
    service = TestBed.inject(DialogService)
  })

  it('opens a native dialog with the content and removes it on close', async () => {
    const dialog = service.createDialog(ErrorDialogComponent, {
      id: 'wormhole-error-dialog',
      dialogData: new HttpErrorResponse({ status: 500, statusText: 'Boom' })
    })
    service.show()

    const native = document.querySelector('dialog#wormhole-error-dialog') as HTMLDialogElement
    expect(native).toBeTruthy()
    expect(native.open).toBeTrue()
    expect(service.isOpen('wormhole-error-dialog')).toBeTrue()

    const closed = new Promise<void>(resolve => dialog.whenClosed.subscribe(() => resolve()))
    service.hide()
    await closed

    expect(service.isOpen('wormhole-error-dialog')).toBeFalse()
    expect(document.querySelector('dialog#wormhole-error-dialog')).toBeNull()
  })
})

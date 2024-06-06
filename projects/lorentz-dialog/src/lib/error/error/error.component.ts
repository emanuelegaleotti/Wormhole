import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { ErrorSelectors } from '../error-state/selectors'
import { ErrorActions } from '../error-state/actions/error.action'
import { AsyncPipe, NgIf } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { Observable } from 'rxjs'

@Component({
  selector: 'lorentz-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  imports: [
    NgIf,
    AsyncPipe,
    TranslocoModule
  ],
  standalone: true
})
export class ErrorComponent{
  error$: Observable<{ error: any }> = this.store.select(ErrorSelectors.selectError)
  constructor (
    public readonly store: Store
  ) { }

  closeModal():void{
    this.store.dispatch(ErrorActions.close_dialog())
  }
}

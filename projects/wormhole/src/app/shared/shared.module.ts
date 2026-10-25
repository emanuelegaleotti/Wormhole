import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { SetComponentDirective } from './directive/set-component.directive';
import { CardComponent } from './card/card.component';
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [
    SetComponentDirective,
    CardComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [
    SetComponentDirective,
    CardComponent
  ]
})
export class SharedModule { }

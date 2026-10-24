import { Component, ElementRef, forwardRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    selector: 'wormhole-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RatingComponent),
            multi: true
        }
    ],
    standalone: false
})
export class RatingComponent implements ControlValueAccessor {
  @ViewChildren('star') stars: QueryList<ElementRef<HTMLButtonElement>> = new QueryList<ElementRef<HTMLButtonElement>>()
  _value: number = 0

  constructor (
    private readonly renderer: Renderer2
  ) { }

  public onTouched: () => void | null = (): void => {
    console.log('input text component')
  }
  public onChanged: (v: unknown) => void = (): void => {
    console.log('input text component')
  }

  registerOnChange (fn: () => void): void {
    this.onChanged = fn
  }

  registerOnTouched (fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState (isDisabled: boolean): void {
    this.stars.forEach(s => {
      this.renderer.setProperty(s.nativeElement, 'disabled', isDisabled)
    })
  }

  writeValue (n: number): void {
    this._value = n
  }

  setRating (v: number): void {
    this._value = v
    this.onTouched()
    this.onChanged(v)
  }
}

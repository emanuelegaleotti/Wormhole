import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  standalone: true,
    name: 'toCelsius'
})
export class ToCelsiusPipe implements PipeTransform {

  transform (value: number | undefined): string {
    return `${Math.round(((value ?? 0) - 273.15 + Number.EPSILON) * 100) / 100} °C`
  }

}

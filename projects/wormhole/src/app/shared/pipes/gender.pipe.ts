import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'gender',
    standalone: false
})
export class GenderPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'n/a') {
      return 'droid'
    }
    return value
  }

}

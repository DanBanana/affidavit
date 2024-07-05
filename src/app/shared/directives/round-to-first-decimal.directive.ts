import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundToFirstDecimal',
  standalone: true,
})
export class RoundToFirstDecimalPipe implements PipeTransform {
  transform(value: number): number {
    if (typeof value !== 'number') {
      return value;
    }
    return Math.round(value * 10) / 10;
  }
}

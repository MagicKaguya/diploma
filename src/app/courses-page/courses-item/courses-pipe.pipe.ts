import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationAppointPipe'
})
export class CoursesPipe implements PipeTransform {

  transform(value: number = 0): string {
    if (isNaN(+value)) {
      return 'Invalid duration';
    }

    const min = 60;
    let minutes = value % min;
    let hours = value / min;

    if ((minutes) == 0) {
      return `${hours} h`
    } else if (value < min) {
      return `${value} min`
    } else {
      return `${Math.trunc(hours)} h ${minutes} min`
    }
  }
}
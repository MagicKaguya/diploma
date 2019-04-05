import {AbstractControl} from '@angular/forms';

export function durationValidator(control: AbstractControl): {[key: string]: string} | null {
  const duration = control.value;

  if (duration === undefined || duration === null) {
    return null;
  }

  return isNaN(duration) ? {'durationError': 'Duration must be numeric!'} : null;
};
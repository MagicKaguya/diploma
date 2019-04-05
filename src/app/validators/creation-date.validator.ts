import {AbstractControl} from '@angular/forms';

export function creationDateValidator(control: AbstractControl): {[key: string]: string} | null {
  const date = control.value;

  let dateError: string;
  if (date === null) {
    dateError = 'Incorrect date value!';
  }

  if (date > new Date()) {
    dateError = 'Date cannot be later than current time!'
  }

  return dateError ? {'creationDateError': dateError} : null;
};
import {AbstractControl} from '@angular/forms';

export function authorsValidator(control: AbstractControl): {[key: string]: string} | null {
  return control.value && control.value.length ?  null : {'authorsError': 'Select at least one author!'};
};

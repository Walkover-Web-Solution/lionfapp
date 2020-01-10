import { AbstractControl, ValidatorFn } from '@angular/forms';

export const digitsOnly: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  let v: string = control.value;
  if (control.dirty) {
    return /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(v) ? null : { digits: true };
  }
};

export const decimalDigits: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  let v = control.value;
  if (control.dirty && v) {
    return /^[+-]?[0-9]{1,9}(?:\.[0-9]{1,3})?$/.test(v) ? null : { digits: true };
  } else {
    return null;
  }
};

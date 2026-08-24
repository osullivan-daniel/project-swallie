import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function uniqueNameValidator(getExistingProducers: () => Set<string>): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value?.trim().toLowerCase();

  console.log(name)
  console.log(getExistingProducers())

  if (!name) {
    return null;
  }

  return getExistingProducers().has(name)
    ? { duplicateName: true }
    : null;
  };
}
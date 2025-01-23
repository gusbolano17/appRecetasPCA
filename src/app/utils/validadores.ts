import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validadorCoincidenciaPass: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');

  if (!password || !confirm) {
    return null; // Si los controles no existen, no se valida
  }

  return password.value === confirm.value ? null : { passwordsDoNotMatch: true };
};

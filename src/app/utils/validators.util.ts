import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

/* -----------------------------------------
   REGEX PATTERNS
----------------------------------------- */
export const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}$/;

export const NAME_REGEX =
  /^[A-Za-z ]{2,40}$/;

export const PHONE_REGEX =
  /^[0-9]{10}$/;

/* -----------------------------------------
   BASIC VALIDATORS (Arrays)
----------------------------------------- */
export const emailValidator = [
  Validators.required,
  Validators.pattern(EMAIL_REGEX)
];

export const passwordValidator = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(20),
];

export const nameValidator = [
  Validators.required,
  Validators.pattern(NAME_REGEX)
];

export const phoneValidator = [
  Validators.required,
  Validators.pattern(PHONE_REGEX)
];

/* -----------------------------------------
   CROSS-FIELD VALIDATOR (Confirm Password)
----------------------------------------- */
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  return password.value === confirmPassword.value
    ? null
    : { passwordsMismatch: true };
};

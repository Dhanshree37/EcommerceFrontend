import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MATERIAL_IMPORTS } from 'src/app/shared/material/material.imports';
import {
  emailValidator,
  passwordValidator,
} from 'src/app/utils/validators.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [MATERIAL_IMPORTS, ReactiveFormsModule, FormsModule, CommonModule],
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

  loading = false;

  loginForm = this.fb.group({
    email: this.fb.control('', {
      validators: emailValidator,
    }),

    password: this.fb.control('', {
      validators: passwordValidator,
    }),

    remember: this.fb.control(false),
  });

  // Getters
  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  get showEmailError() {
    return this.email.invalid && (this.email.touched || this.email.dirty);
  }

  get showPasswordError() {
    return (
      this.password.invalid && (this.password.touched || this.password.dirty)
    );
  }

  get emailError() {
    if (this.email.hasError('required')) return 'Email is required';
    if (this.email.hasError('pattern')) return 'Enter a valid email';
    return '';
  }

  get passwordError() {
    if (this.password.hasError('required')) return 'Password is required';
    if (this.password.hasError('minlength')) return 'Min 6 characters required';
    if (this.password.hasError('maxlength')) return 'Max 20 characters allowed';
    return '';
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.loading = false;
      },
    });

    setTimeout(() => {
      console.log('Form:', this.loginForm.value);
      this.loading = false;
    }, 1500);
  }
}

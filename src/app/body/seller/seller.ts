import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

function confirmPassword(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.value !== confirmPassword?.value) {
    return { notSame: true };
  }
  return null;
}
@Component({
  selector: 'app-seller',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './seller.html',
  styleUrl: './seller.css',
})
export class Seller {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required],
        }),
      },
      { validators: [confirmPassword] }
    ),
    name: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.log('❌ Invalid form:');
      for (const key in this.form.controls) {
        const control = this.form.get(key);
        if (control instanceof FormGroup) {
          for (const subKey in control.controls) {
            const subControl = control.get(subKey);
            if (subControl?.errors)
              console.log(`${subKey}:`, subControl.errors);
          }
          if (control.errors) console.log(`${key} group:`, control.errors);
        } else if (control?.errors) {
          console.log(`${key}:`, control.errors);
        }
      }
      return;
    }

    console.log('✅ Form is valid:', this.form.value);
  }
}

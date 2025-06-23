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
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './seller.html',
  styleUrl: './seller.css',
})
export class Seller {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
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
    console.log(this.form.controls.name.value);
  }
}

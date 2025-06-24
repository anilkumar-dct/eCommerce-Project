import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignUpUserData } from '../../data';
import { HttpClientServices } from '../../http-client-services';

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
  sellerData: SignUpUserData = {
    name: '',
    email: '',
    password: '',
  };
  constructor(private router: Router) {}

  private httpService = inject(HttpClientServices);
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
    console.log('✅ Valid form:', this.form.value);
    this.sellerData.name = this.form.value.name!;
    this.sellerData.email = this.form.value.email!;
    this.sellerData.password = this.form.controls['passwords'].value.password!;
    this.httpService.createUser(this.sellerData).subscribe();
    this.router.navigate(['seller/home']);
  }
}

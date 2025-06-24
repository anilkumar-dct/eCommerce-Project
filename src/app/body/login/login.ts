import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginUserData } from '../../data';
import { HttpClientServices } from '../../http-client-services';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  userData: LoginUserData = {
    email: '',
    password: '',
  };
  constructor(private router: Router, private authService: AuthService) {}
  private httpServices = inject(HttpClientServices);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  onLogin() {
    this.userData.email = this.form.get('email')?.value!;
    this.userData.password = this.form.get('password')?.value!;
    this.httpServices.loginUser(this.userData).subscribe({
      next: (response) => {
        if (response.length) {
          localStorage.setItem('seller', JSON.stringify(response[0]));
          this.authService.login();
          this.router.navigate(['seller/home']);
          console.log(response[0]);
        } else {
          // ❌ Login failed
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
      },
    });
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['seller/home']);
    }
  }
}

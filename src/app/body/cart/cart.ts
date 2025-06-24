import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['cart']);
    } else {
      this.router.navigate(['login']);
    }
    console.log(this.authService.isLoggedIn());
  }
}

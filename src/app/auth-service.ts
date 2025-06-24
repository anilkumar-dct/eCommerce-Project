import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  // Optional: setter and getter
  login() {
    this.isSellerLoggedIn.next(true);
  }

  logout() {
    this.isSellerLoggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this.isSellerLoggedIn.value;
  }
}

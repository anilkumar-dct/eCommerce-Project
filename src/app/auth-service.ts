import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}
  private logoutTimer: any;
  // Optional: setter and getter
  login() {
    this.isSellerLoggedIn.next(true);
    this.startAutoLogoutTimer();
  }

  logout() {
    this.isSellerLoggedIn.next(false);
    this.clearLogoutTimer();
    localStorage.removeItem('seller'); // ✅ remove saved login
    console.warn('👋 Session expired. Logging out...');
    this.router.navigate(['/sellers']); // or your sign-up route
  }

  isLoggedIn(): boolean {
    return this.isSellerLoggedIn.value;
  }
  private startAutoLogoutTimer(durationMs: number = 60 * 1000) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
      console.warn('⏳ Session expired. User logged out automatically.');
    }, durationMs); // Default: 5 minutes
  }

  private clearLogoutTimer() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }
}

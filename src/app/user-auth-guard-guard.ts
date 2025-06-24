import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth-service';

export const userAuthGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (localStorage.getItem('seller')) return true;
  return authService.isLoggedIn();
};
